namespace GenPDMS


/// Define actions that can be mapped to
/// the creation of a response
module Actions =

    [<Literal>]
    let ECHO = "echo"

    [<Literal>]
    let NOACTION = "noaction"



module Query =

    open Newtonsoft.Json


module Result =

    open Newtonsoft.Json



/// Mapping a request to a response
module RequestMapping =

    open RequestResponse

    let map (r : Request) : Response =
        printfn "mapping request: %A" r

        let toResponse succ = createResponse succ [||] [||] [||] [||]

        match r.Action with
        | Actions.ECHO     ->
            toResponse true r

        | _ ->
            let resp =
                createResponse false [||] [||] [|Actions.NOACTION|] [||] (new obj())
            resp
