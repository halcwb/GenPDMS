namespace GenPDMS

/// Mapping a request to a response
[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module RequestMapping =
    
    open System
    open System.Collections.Generic

    type Request = GenPDMS.Request.Request
    type Response = GenPDMS.Response.Response

    let map (tokens: Dictionary<_, _>) 
            (r: Request) : Response =

        // Get the user for that token
        let getUser token = 
            if tokens.ContainsKey(token) then
                tokens.Item(token) |> fst
            else User.anonym.UserName

        // Get all actions for that token
        let getActions token = 
            if tokens.ContainsKey(token) then
                tokens.Item(token) |> snd
            else []
            
        // Check if token has matching action
        let checkActionToken token action =
            tokens.ContainsKey(token) &&
            token |> getActions |> List.exists ((=) action)

        let newToken user acts =
            let token = Token.generate()
            tokens.Remove(r.Token) |> ignore
            tokens.Add(token, (user, acts))
            token

        printfn "mapping request: %A" r

        match (r.Action, checkActionToken r.Token r.Action) with

        | Capability.ECHO, _     ->
            Response.createSuccNoInfo Token.emptyToken [||] r

        | Capability.CURRENT_USER, _     ->
            let user = 
                User.users
                |> List.find (fun u -> r.Token |> getUser = u.UserName) 
            let acts = r.Token |> getActions
            let token = r.Token

            Response.createSuccNoInfo token acts user

        | Capability.PDMS_LOGIN, true  ->
            let user = User.admin
            let act = r.Action
            
            let acts = user |> Capability.nextUserActions act

            let token = newToken user.UserName acts
            
            Response.createSuccNoInfo token acts (new obj())

        | _, _ ->
            let user = User.anonym
            let act = Capability.NO_ACTION
            
            let acts = user |> Capability.nextUserActions act

            let token = newToken user.UserName acts
            
            Response.createFailNoInfo token acts (new obj())