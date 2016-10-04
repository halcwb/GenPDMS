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

    [<Test>]
    let ``server should response wiht GenPDMS to GET hello`` () =
        let resp =
            runWith testConfig (Server.app (fun _ -> ()))
            |> req HttpMethod.GET "/hello" None
        resp |> should equal "GenPDMS"
