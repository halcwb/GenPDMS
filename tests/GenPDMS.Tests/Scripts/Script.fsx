// Learn more about F# at http://fsharp.net. See the 'F# Tutorial' project
// for more guidance on F# programming.

#load "load-references-release.fsx"

#time

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module Actions =
    
    [<Literal>]
    let LOGIN = "login"

    type Action = { Action: string; Roles: string[] }

    let create a rs = { Action = a; Roles = rs }

    let createLogin = create LOGIN [||]

module ServerTests =

    open System
    open System.Text
    open System.Net.Http
    open System.Collections.Generic

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

    [<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
    module Login =
        
        type Login = { user: string; password: string; role: string }

        let create u p r = { user = u; password = p; role = r }

        let empty = create "" "" ""

    let hasCapabiltiy (dict: Map<string, string>) cap token =
        dict.ContainsKey token && dict.Item(token) = cap

    module Guid =
        
        open System

        let create () = Guid.NewGuid().ToString()

    let map (actions : Dictionary<_, _>) (r: Request) : Response =

        let loginReq () =
            // Create action and token
            let token = Guid.create()

            actions.Remove(Actions.LOGIN) |> ignore
            actions.Add(Actions.LOGIN, token)

            Request.create Actions.LOGIN token Login.empty

        printfn "mapping request: %A" r

        let toResponse succ = Response.create succ [||] [||] [||] [||]

        match r.Action with
        | Actions.ECHO     ->
            toResponse true r

        | Actions.LOGIN when actions.Item(Actions.LOGIN) = r.Token ->
            Response.createSucc [||] [||] [||] [||] emptyObj

        | _ ->
            let resp =
                Response.create false [||] [||] [||] [|loginReq()|] emptyObj
            resp
        

    [<Test>]
    let ``server should response wiht GenPDMS to GET hello`` () =
        getResp "/hello"
        |> should equal "GenPDMS"

    [<Test>]
    let ``server should respond nothing there to GET foo`` () =
        getResp "/foo"
        |> should equal Server.NOT_FOUND_RESPONSE

    [<Test>]
    let ``server should be able to map echo a test request`` () =
        let req = Request.create "echo" "test" ([||])
        let resp = 
            req
            |> Response.createSucc [||] [||] [||] [||] 
            |> Json.serialize
             
        req
        |> postResp RequestMapping.map 
        |> should equal resp

    let actions = new Dictionary<string, string>()

    Request.create "" "" emptyObj
    |> postResp (map actions)

    printfn "token: %s" <| actions.Item(Actions.LOGIN)
    
    Request.create Actions.LOGIN (actions.Item(Actions.LOGIN)) emptyObj
    |> postResp (map actions)

    printfn "token: %s" <| actions.Item(Actions.LOGIN)


