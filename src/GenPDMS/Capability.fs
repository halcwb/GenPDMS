namespace GenPDMS

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module Capability =

    [<Literal>]
    let NO_ACTION = ""

    [<Literal>]
    let ECHO = "echo"

    [<Literal>]
    let CURRENT_USER = "current.user"

    [<Literal>]
    let PDMS_LOGIN = "pdms.login"
    
    type Capability = { Action: string; Roles: string list; Actions: string list }

    let create act rs acts = { Action = act; Roles = rs; Actions = acts }

    let addRole role a = { a with Roles = a.Roles |> List.append [role] }

    let actions = 
        [
            (ECHO, [], 
                [
                ])
            (CURRENT_USER, [], 
                [
                ])
            (NO_ACTION, [], 
                [
                    PDMS_LOGIN
                ])
            (PDMS_LOGIN, [], 
                [
                    "pdms.logout"
                    "password.change"
                    "user.get"
                    "user.update"
                    "user.delete"
                    "patient.get"
                    "patient.update"
                    "patient.delete"
                ])
            ("pdms.logout", [], 
                [
                    PDMS_LOGIN
                ]
            )
            ("password.change", [], 
                [
                    PDMS_LOGIN
                ])
            ("user.get", ["admin"],
                [
                    "pdms.logout"
                    "password.change"
                    "user.get"
                    "user.update"
                    "user.delete"
                    "patient.get"
                    "patient.update"
                    "patient.delete"
                ])
            ("user.update", ["admin"; "user"],
                [
                    "pdms.logout"
                    "password.change"
                    "user.get"
                    "user.update"
                    "user.delete"
                    "patient.get"
                    "patient.update"
                    "patient.delete"
                ])
            ("user.delete", ["admin"],
                [
                    "pdms.logout"
                    "password.change"
                    "user.get"
                    "user.update"
                    "user.delete"
                    "patient.get"
                    "patient.update"
                    "patient.delete"
                ])
            ("patient.get", ["admin"; "user"],
                [
                    "pdms.logout"
                    "password.change"
                    "user.get"
                    "user.update"
                    "user.delete"
                    "patient.get"
                    "patient.update"
                    "patient.delete"
                ])
            ("patient.update", ["admin"; "user"],
                [
                    "pdms.logout"
                    "password.change"
                    "user.get"
                    "user.update"
                    "user.delete"
                    "patient.get"
                    "patient.update"
                    "patient.delete"
                ])
            ("patient.delete", ["admin"; "user"], 
                [
                    "pdms.logout"
                    "password.change"
                    "user.get"
                    "user.update"
                    "user.delete"
                    "patient.get"
                    "patient.update"
                    "patient.delete"
                ])
        ]
        |> List.map (fun (a, rs, acts) -> create a rs acts)

    let allowedActions role =
        actions
        |> List.filter (fun { Roles = rs } ->
            (rs |> List.isEmpty || 
             rs |> List.exists ((=) role)))

    let actionAllowed role act =
        actions 
        |> List.exists (fun { Action = a; Roles = rs} ->
            a = act && (rs |> List.isEmpty || 
                        rs |> List.exists ((=) role)))
    
    let nextActions act role =
        match 
            role
            |> allowedActions 
            |> List.tryFind (fun { Action = act'; Roles = rs } ->
                act' = act) with
        | Some act -> 
            act.Actions
            |> List.filter (actionAllowed role)
            |> List.map (fun a -> 
                actions 
                |> List.find (fun act -> act.Action = a))
            |> List.map(fun a -> a.Action)
        | None -> []

    let nextUserActions act (user: User.User) =
        user.Roles
        |> List.collect (nextActions act)
        |> List.distinct        
