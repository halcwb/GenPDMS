namespace GenPDMS

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module Token =
    
    open System
    open Newtonsoft.Json

    type Token = 
        { 
            [<JsonProperty("id")>]
            Id: string
            [<JsonProperty("ts")>]
            TimeStamp: string 
        }

    let create id ts = { Id = id; TimeStamp = ts }

    let emptyToken = create "" ""

    let generate () = 
        create (Guid.NewGuid().ToString()) (DateTime.UtcNow.ToString()) 
