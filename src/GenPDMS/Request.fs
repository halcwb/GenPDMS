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
            /// Query string that is the json
            /// representation of a query object
            [<JsonProperty("qry")>]
            Query: string
        }

    let create act qry =
        {   
            Action = act
            Query = qry |> Json.serialize
        }
