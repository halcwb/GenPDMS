namespace GenPDMS

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module Request = 

    [<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
    module Login =
        
        type Login = { user: string; password: string; role: string }

        let create u p r = { user = u; password = p; role = r }

        let empty = create "" "" ""

    open System
    open System.IO
    open System.Text
    open Newtonsoft.Json

    type Token = GenPDMS.Token.Token

    /// Represents a `Request` with
    [<CLIMutable>]
    type Request =
        {
            /// Action that uses the query
            [<JsonProperty("act")>]
            Action: string
            /// Token to authorize the action
            [<JsonProperty("token")>]
            Token: Token
            /// Query string that is the json
            /// representation of a query object
            [<JsonProperty("qry")>]
            Query: string
        }

    let create act token qry =
        {   
            Action = act
            Token = token
            Query = qry |> Json.serialize
        }
