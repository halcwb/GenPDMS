namespace GenPDMS

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module Request = 

    open System
    open System.IO
    open System.Text
    open Newtonsoft.Json

    /// Represents a `Request` with
    [<CLIMutable>]
    type Request =
        {
            /// Action that uses the query
            [<JsonProperty("act")>]
            Action: string
            /// Token to authorize the action
            [<JsonProperty("token")>]
            Token: string
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
