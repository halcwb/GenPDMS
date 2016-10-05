// Learn more about F# at http://fsharp.net. See the 'F# Tutorial' project
// for more guidance on F# programming.

#load "load-references-release.fsx"

#time

module ServerTests =

    open System
    open System.Text
    open System.Net.Http

    open NUnit.Framework
    open FsUnit

    open Suave
    open Suave.Http
    open Suave.Testing

    open Newtonsoft.Json

    open GenPDMS
    open GenPDMS.Utils

    type Request  = Request.Request
    type Response = Response.Response

    Environment.CurrentDirectory <- __SOURCE_DIRECTORY__
    printfn "Current Directory: %s" Environment.CurrentDirectory 

    let homeDir = 
        Environment.CurrentDirectory // Project Scripts dir
        |> Path.parentDirectory // Project Tests dir
        |> Path.parentDirectory // Source Tests dir
        |> Path.parentDirectory // Base dir
        |> Path.combineWith "client" // Base Client dir
        |> Path.combineWith "generated" // Base Client Generated dir
        |> Path.combineWith "dist" // Base Client Generated Dist dir
    printfn "Home Directory: %s" homeDir

    let testConfig = 
        { defaultConfig with homeFolder = Some(homeDir) } 

    let getResp n =
            runWith testConfig (Server.app (fun _ -> ()))
            |> req HttpMethod.GET n None

    let toByteArrayContent x = new ByteArrayContent(x)

    let postResp procReq r =
        let r' = 
            Json.serialize r 
            |> Encoding.UTF8.GetBytes 
            |> toByteArrayContent
            |> Some
        runWith testConfig (Server.app procReq)
        |> req HttpMethod.POST "/request" r'

    let emptyObj = new obj()

    type Test = { name: string; number: int }

    [<Test>]
    let ``server should response wiht GenPDMS to GET hello`` () =
        getResp "/hello"
        |> should equal "GenPDMS"

    [<Test>]
    let ``server should respond nothing there to GET foo`` () =
        getResp "/foo"
        |> should equal Server.NOT_FOUND_RESPONSE

    [<Test>]
    let ``server should be able to echo a request`` () =
        let test = new Object() |> Json.serialize
        postResp (fun x -> x |> Json.deSerialize) test
        |> should equal test

    [<Test>]
    let ``server should be able to map echo request`` () =
        let req = Reqeuest.create "echo" ([||])
        let resp =
            req
            |> postResp RequestMapping.map 
            |> Json.deSerialize<Response>
        ()
