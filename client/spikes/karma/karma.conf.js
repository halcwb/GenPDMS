    module.exports = function (config) {
        config.set({

            // base path that will be used to resolve all patterns (eg. files, exclude)
            basePath: '../../',


            // frameworks to use
            // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
            frameworks: ['mocha', 'expect'],


            // list of files / patterns to load in the browser
            files: [
                'node_modules/webix/**/webix.css',
                'node_modules/webix/**/webix_debug.js',
                'spikes/karma/app.js',
                'spikes/karma/test.js'
            ],


            // list of files to exclude
            exclude: [],


            // preprocess matching files before serving them to the browser
            // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
            preprocessors: {},


            // test results reporter to use
            // possible values: 'dots', 'progress'
            // available reporters: https://npmjs.org/browse/keyword/karma-reporter
            reporters: ['dots'],


            // web server port
            port: 9876,


            // enable / disable colors in the output (reporters and logs)
            colors: true,


            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_DEBUG,


            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: false,


            // start these browsers
            // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
            browsers: ['Firefox'],


            // If browser does not capture in given timeout [ms], kill it
            captureTimeout: 60000,


            // Continuous Integration mode
            // if true, Karma captures browsers, runs the tests and exits
            singleRun: false


        });
    };
