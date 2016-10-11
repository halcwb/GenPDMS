namespace GenPDMS

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module Response =

    [<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
    module Actions = 

        open Newtonsoft.Json

        type Token = GenPDMS.Token.Token

        type Actions = 
            {
                [<JsonProperty("token")>]
                Token: Token
                [<JsonProperty("Actions")>]
                Actions: string[]            
            }

        let create token acts = { Token = token; Actions = acts |> Array.ofSeq }

        let noActions = create Token.emptyToken []

    open System
    open Newtonsoft.Json

    /// Represents a `Response`
    [<CLIMutable>]
    type Response<'T> =
        {
            [<JsonProperty("succ")>]
            Success : bool
            [<JsonProperty("info")>]
            Info : string[]
            [<JsonProperty("warn")>]
            Warning : string[]
            [<JsonProperty("errs")>]
            Errors : string[]
            [<JsonProperty("acts")>]
            Actions : Actions.Actions
            [<JsonProperty("result")>]
            Result : 'T
        }


    let create succ info warn errs token acts res =
        {
            Success = succ 
            Info =    info |> Array.ofSeq
            Warning = warn |> Array.ofSeq
            Errors =  errs |> Array.ofSeq
            Actions = Actions.create token (acts |> Array.ofSeq)
            Result =  res
        }

    let createSucc info warn errs token acts res = create true  info warn errs token acts res 
    let createFail info warn errs token acts res = create false info warn errs token acts res 

    let createSuccNoInfo token acts res = createSucc [] [] [] token acts res
    let createFailNoInfo token acts res = createFail [] [] [] token acts res

    let createSuccResp res = createSuccNoInfo Token.emptyToken [] res
    let createFailResp res = createFailNoInfo Token.emptyToken [] res


