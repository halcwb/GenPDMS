namespace GenPDMS

module Server =

    open System
    open System.IO
    open System.Net
    open System.Collections.Generic

    open Suave // always open suave
    open Suave.Http
    open Suave.Files
    open Suave.Operators
    open Suave.Filters
    open Suave.Writers
    open Suave.Successful
    open Suave.RequestErrors
    open Suave.Web // for config
    open Suave.Sockets
    open Suave.Sockets.Control
    open Suave.WebSocket
    open Suave.Utils

    open Informedica.GenUtils.Lib.BCL

    type Token = Token.Token

    /// Utility to get the last element
    /// in a list
    let rec listLast (list: 'T list) =
        match list with
        | [x] -> x
        | _::tail -> listLast tail
        | [] -> failwith "Empty list"


    [<Literal>]
    let NOT_FOUND_RESPONSE = "Sorry, there is nothing there"

    /// Utility function to set the headers to allow
    /// cross origin requests
    let setCORSHeaders =
        setHeader "Access-Control-Allow-Origin" "*"
        >=> setHeader "Access-Control-Allow-Headers" "content-type"


    /// Get the server configuration with
    /// home folder `home` and port `port`.
    let getConfig home port =
        { defaultConfig with
            logger = Logging.Loggers.saneDefaultsFor Logging.LogLevel.Verbose
            bindings = [ (if port |> String.IsNullOrEmpty then
                            HttpBinding.mkSimple HTTP "127.0.0.1" 3000
                          else HttpBinding.mkSimple HTTP "0.0.0.0" (int32 port)) ]
            homeFolder = home |> Some }


    /// Create the server app with a function
    /// that processes request posts.
    let app processRequest =
        choose
            [
                GET >=> choose
                    [
                        // Just to avoid an error in chrome
                        path "/favicon.ico" >=> OK ""
                        // Little server alive check
                        path "/hello" >=> OK "GenPDMS"
                        // Start with the index file
                        path "/" >=> Files.browseFileHome "index.html"
                        // Get all other files
                        Files.browseHome
                    ]
                POST >=> choose
                    [
                        path "/request" >=> fun context ->
                            context |> (setCORSHeaders >=> (GenPDMS.Json.mapJson processRequest))
                    ]
                NOT_FOUND NOT_FOUND_RESPONSE
            ]


    /// Start the GenPDMS with home `home` and
    /// port `port`.
    let start home port =

        // ToDo refactor this
        let clientDir =
            @"client\generated\dist"
            |> String.replace "\\" (string Path.DirectorySeparatorChar)

        let home = Path.Combine(home, clientDir)

        let map = 
            RequestMapping.map (new Dictionary<Token, string * string list>())

        printfn "Starting server on: %s with home: %s" port home
        startWebServer (getConfig home port) (app map)

    