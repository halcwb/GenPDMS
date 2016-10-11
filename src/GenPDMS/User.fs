namespace GenPDMS

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module User =

    type User = { UserName: string; Password: string; Roles: string list }

    let create un pw rs = { UserName = un; Password = pw; Roles = rs }

    let admin = create "admin" "admin" ["admin"; "user"]

    let user = create "user" "user" ["user"]

    let anonym = create "anonymous" "" [""]

    let users = 
        [
            admin
            user
            anonym
        ]

    // Get role from user
    let getRoles u =
        match users |> List.tryFind (fun u' -> u'.UserName = u) with
        | Some u' -> u'.Roles
        | None -> []

