namespace GenPDMS

/// Functions to handle the `Capability` type. A capability
/// represents something that can be requested by a `User`
/// A capability describes the roles restriction that apply to 
/// that action and a list of followup actions.
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
    
    type Capability = 
        { 
            /// The action for this capability
            Action: string
            /// The roles required for the action,
            /// if the roles list is empty, there 
            /// is no need for a specific role to
            /// perform the action
            Roles: string list
            /// A list of followup actions when
            /// the action is successfully completed
            Actions: string list
        }

    /// Create a `Capability`
    let create act rs acts = { Action = act; Roles = rs; Actions = acts }

    /// Add a role to a `Capability`
    let addRole role a = { a with Roles = a.Roles |> List.append [role] }

    /// Actions description for the current app
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

    /// Get all allowed actions for a role
    let allowedActions role =
        actions
        |> List.filter (fun { Roles = rs } ->
            (rs |> List.isEmpty || 
             rs |> List.exists ((=) role)))

    /// Check whether an action is allowed for a role
    let actionAllowed role act =
        actions 
        |> List.exists (fun { Action = a; Roles = rs} ->
            a = act && (rs |> List.isEmpty || 
                        rs |> List.exists ((=) role)))
    
    /// Get all followup actions according to a role
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

    /// Get all followup actions according to an action
    /// and a `User` (a user can have multiple roles)
    let nextUserActions act (user: User.User) =
        user.Roles
        |> List.collect (nextActions act)
        |> List.distinct        
