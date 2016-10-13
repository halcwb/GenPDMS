namespace GenPDMS

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module Request = 

    open Newtonsoft.Json

    [<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
    module Login =
        
        type Login = 
            { 
                /// The user name (must be unique)
                [<JsonProperty("user")>]
                User: string
                /// User password 
                [<JsonProperty("password")>]
                Password: string
                /// The role wich the user logs in
                [<JsonProperty("role")>]
                Role: string 
            }

        let create u p r = { User = u; Password = p; Role = r }

        let empty = create "" "" ""

    open System
    open System.IO
    open System.Text

    open Newtonsoft.Json

    open Suave.Http

    type Token = GenPDMS.Token.Token

    /// Represents a `Request` with
    [<CLIMutable>]
    type Request<'T> =
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
            Query: 'T
        }

    let create act token qry =
        {   
            Action = act
            Token = token
            Query = qry
        }

    let getRequest (req: HttpRequest) =
        (Encoding.UTF8.GetString(req.rawForm) |> Json.deSerialize<Request<obj>>)


    let inline getQuery<'T> (req: HttpRequest) = 
        (Encoding.UTF8.GetString(req.rawForm) |> Json.deSerialize<Request<'T>>).Query
