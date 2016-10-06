namespace GenPDMS

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module Capability =
    
    type Request  = Request.Request

    type Capability = 
        {
            Roles : string[]
            Request : Request
        }
