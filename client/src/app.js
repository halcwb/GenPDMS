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


        // **** Starting reload for development ****

        require("./lib/util/reload.js").init(app);



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
        
        // **** Initialize Views ****
        require('./views/windows/loadingMask.js').init(app);

        require('./views/ui.js').init(app);
        require('./views/windows/alert.js').init(app);
        require('./views/windows/tooltip.js').init(app);

        app.debug('client:app')("Starting the app!");

        webix.hasRun = true;

    });

})();


