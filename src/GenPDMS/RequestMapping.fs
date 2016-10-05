namespace GenPDMS


/// Define actions that can be mapped to
/// the creation of a response
[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module Actions =

    [<Literal>]
    let ECHO = "echo"

    [<Literal>]
    let NOACTION = "noaction"



[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module Query =

    open Newtonsoft.Json


[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module Result =

    open Newtonsoft.Json



/// Mapping a request to a response
[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module RequestMapping =

    type Request = GenPDMS.Request.Request
    type Response = GenPDMS.Response.Response

    let map (r: Request) : Response  =
        printfn "mapping request: %A" r

        let toResponse succ = Response.create succ [||] [||] [||] [||]

        match r.Action with
        | Actions.ECHO     ->
            toResponse true r

        | _ ->
            let resp =
                Response.create false [||] [||] [|Actions.NOACTION|] [||] (new obj())
            resp
