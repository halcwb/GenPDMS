namespace GenPDMS

module Json =

    open System
    open System.IO
    open System.Text
    open Newtonsoft.Json

    open Suave
    open Suave.Operators


    ///
    let serialize (o: obj) =
       JsonConvert.SerializeObject(o)


    let deSerialize<'T> (s: string) =
        JsonConvert.DeserializeObject<'T>(s)


    let mapJson f =
        request(fun r ->
            printfn "Processing request:\n%A" (Encoding.UTF8.GetString(r.rawForm))
            r
            |> f
            |> serialize
            |> (fun x -> printfn "Returning response:\n%A" x; x)
            |> Successful.OK
            >=> Writers.setMimeType "application/json")
