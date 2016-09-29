/**
 * @file The entry point the application, creates the app
 * @requires util
 * @requires debug
 * @requires lib/util/reload
 * @requires lib/util/msgBus
 * @requires lib/ajax/request
 */

/**
* Starts the application: </br>
* 1. Check if in development mode </br>
* 2. If in development mode automate reload </br>
* 3. Create the GUI </br>
*
* @namespace app
*/

/*global webix, _, $$, console, app, debug */

(function () {

    "use strict";

    // Make underscore globally available
    window._ = require('underscore');

    // Create app namespace
    window.app = {};
    window.app.models = {};

    /**
     * settings container
     * @memberof app
     * @type {{demo: boolean}}
     */
    app.settings = {
        demo: true
    };

    /**
     * data container for demo data
     * @memberof app
     */
    app.data = require('./data/data.js');

    /**
     * Util functions
     * @memberof app
     * @property util {util} - Utility library
     */
    app.util  = require("./lib/util/util.js");


    /**
     * Debug factory
     * @memberof app
     * @method debug
     * @returns {function} debug function
     */
    app.debug = require('debug');


    /**
     * Message bus</br>
     * {@link module:lib/util/msgBus}
     * @memberof app
     * @property bus {lib/util/msgBus} - Provides message bus functionality
     */
    app.bus = require('./lib/util/msgBus.js');


    app.msg = require("./msg.js");


    /**
     * Request object</br>
     * {@link module:lib/ajax/request}
     * @memberof app
     * @property request {lib/ajax/request} - provides request function
     */
    app.request = require('./lib/ajax/request.js');


    webix.i18n.parseFormat = '%d-%M-%y';
    webix.i18n.dateFormat  = '%d-%M-%y';
    webix.i18n.setLocale();

    var initRequest = function (app, req) {
        var deb = app.debug("server"),
            pub = _.partial(app.bus.server.publish, deb),
            sub = _.partial(app.bus.controller.subscribe, deb),
            msg = app.msg,
            succ = function (act, resp) {
                app.loading(false);
                pub(msg.server.success + "." + act, resp);
            },
            fail = function (act, err) {
                app.loading(false);
                pub(msg.server.fail + "." + act, err);
            };

        deb("init");

        sub(msg.server.request, function (data) {
            var _succ = _.partial(succ, data.act),
                _fail = _.partial(fail, data.act);

            app.loading(true);
            req.post(app.settings.demo, _succ, _fail, data.act, data.qry);
        });
    };

    webix.ready(function () {
        var path = require("path");

        // **** Starting reload for development ****

        require("./lib/util/reload.js").init(app);

        // **** Initialize Request ****

        initRequest(app, app.request);

        // **** Initialize Controllers ****

        _.each([
            require('./controllers/app.js'),
            require('./controllers/navigation.js'),
            require('./controllers/ruleEditor.js'),
            require('./controllers/tooltip.js'),
            require('./controllers/patient.js'),
            require('./controllers/treatment.js'),
            require('./controllers/indication.js'),
            require('./controllers/totals.js')
        ], function (c) {
            c.init(app);
        });

        // **** Initialize Models ****

        _.each([
            require("./models/patient.js")
        ], function (model) {
            app.models[model.getName()] = model.init(app);
        });

        // **** Initialize Views ****

        _.each([
            require('./views/windows/loadingMask.js'),
            require('./views/windows/alert.js'),
            require('./views/windows/tooltip.js'),
            require('./views/ui.js')
        ], function (v) {
            v.init(app);
        });

        // **** App is ready ****

        app.debug("app")("*** starting the app! ***");

        webix.hasRun = true;

    });

})();


