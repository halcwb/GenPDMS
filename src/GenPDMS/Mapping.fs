namespace GenPDMS

/// Mapping a request to a response
[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module RequestMapping =
    
    open System
    open System.Collections.Generic
    open System.Text

    type HttpRequest = Suave.Http.HttpRequest
    type Response = GenPDMS.Response.Response<obj>

    /// `map` uses a `tokens` `Dictionary<Token,(string * string list)` to
    /// check whether the `Request.Action` is allowed. It looks whether there
    /// is a `Token` in the dictionary and also whether the `Request.Action` 
    /// is in the `string list`. The first `string` in the tuple `(string * string list)`
    /// is the user that requests the action. This user string is used to look 
    /// whether according the the roles the user has and the current action 
    /// what are the next actions that the user can request.
    /// 
    /// If there is a valid action for the token, the action is processed
    /// and a new token is generated for a list of next actions. The old
    /// token is removed and the new token with list of actions is added to
    /// the `tokens` dictionary.
    ///
    /// This function uses the `Capabilities` module to get the followup 
    /// actions according to the roles the user has and the current action.
    /// 
    /// The concept of checking and returning actions is inspired by
    /// the excellent talk of [Scott Wlaschin](https://fsharpforfunandprofit.com/cap/).
    let map (tokens: Dictionary<_, _>) 
            (http: HttpRequest) : Response =

        let r = http |> Request.getRequest

        // Get the current user for that token
        let getUser token = 
            if tokens.ContainsKey(token) then
                tokens.Item(token) |> fst
            else User.anonym.UserName

        // Get all allowed actions for that token
        let getActions token = 
            if tokens.ContainsKey(token) then
                tokens.Item(token) |> snd
            else []
            
        // Check if token has matching action
        let checkActionToken token action =
            tokens.ContainsKey(token) &&
            token |> getActions |> List.exists ((=) action)

        // Remove old token and create a new token
        let newToken user acts =
            let token = Token.generate()
            tokens.Remove(r.Token) |> ignore
            tokens.Add(token, (user, acts))
            token

        let createSuccNoInfo token acts res = 
            Response.createSuccNoInfo token acts (res :> obj) 

        printfn "mapping request: %A" r.Action

        match (r.Action, checkActionToken r.Token r.Action) with

        | Capability.ECHO, _     ->
            createSuccNoInfo Token.emptyToken [||] r

        | Capability.CURRENT_USER, _     ->
            let user = 
                User.users
                |> List.find (fun u -> r.Token |> getUser = u.UserName) 
            let acts = r.Token |> getActions
            let token = r.Token

            createSuccNoInfo token acts user

        | Capability.PDMS_LOGIN, true  ->
            let qry = http |> Request.getQuery<Request.Login.Login>
            let user = 
                User.users 
                |> List.tryFind(fun u' -> u'.UserName = qry.User && u'.Password = qry.Password)
            let act = r.Action
            
            match user with
            | Some user ->
                let acts = user |> Capability.nextUserActions act

                let token = newToken user.UserName acts
                
                // Return success with new token/actions and user
                Response.createSuccNoInfo token acts user

            | None -> 
                // Return failure response with the last token/actions
                Response.createFailNoInfo r.Token (r.Token |> getActions) (new obj())
        | _, _ ->
            let user = User.anonym
            let act = Capability.NO_ACTION
            
            let acts = user |> Capability.nextUserActions act

            let token = newToken user.UserName acts
            
            Response.createFailNoInfo token acts (new obj())