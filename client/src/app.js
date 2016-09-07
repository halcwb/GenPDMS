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


    webix.ready(function () {
        var path = require("path");

        // **** Starting reload for development ****

        require("./lib/util/reload.js").init(app);


        // **** Initialize Controllers ****

        _.chain({
            "app":        require('./controllers/app.js'),
            "navigation": require('./controllers/navigation.js'),
            "ruleEditor": require('./controllers/ruleEditor.js'),
            "tooltip":    require('./controllers/tooltip.js'),
            "patient":    require('./controllers/patient.js'),
            "treatment":  require('./controllers/treatment.js'),
            "indication": require('./controllers/indication.js'),
            "totals":     require('./controllers/totals.js')
        }).mapObject(function (c, id) {
            var debug = app.debug("client:controllers:" + id);

            c.init(app, debug);
            debug(c);
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

        app.debug('client:app')("Starting the app!");

        webix.hasRun = true;

    });

})();


