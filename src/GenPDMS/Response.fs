namespace GenPDMS

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module Response =

    open System
    open System.IO
    open System.Text
    open Newtonsoft.Json

    type Request = GenPDMS.Request.Request

    /// Represents a `Response`
    [<CLIMutable>]
    type Response =
        {
            [<JsonProperty("succ")>]
            Success : bool
            [<JsonProperty("info")>]
            Info : string[]
            [<JsonProperty("warn")>]
            Warning : string[]
            [<JsonProperty("errs")>]
            Errors : string[]
            [<JsonProperty("reqs")>]
            Requests : Request[]
            [<JsonProperty("result")>]
            Result : obj
        }


    let create succ info warn errs reqs res =
        {
            Success = succ
            Info = info
            Warning = warn
            Errors = errs
            Requests = reqs
            Result = res
        }

    let createSucc info warn errs reqs res = create true  info warn errs reqs res 
    let createFail info warn errs reqs res = create false info warn errs reqs res 

