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
        demo: false
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



    webix.ready(function () {


        // **** Starting reload for development ****

        require("./lib/util/reload.js").init(app);


        // **** Initialize Views ****

        require('./views/ui.js').init(app);
        require('./views/windows/loadingMask.js').init(app);
        require('./views/windows/alert.js').init(app);
        require('./views/windows/tooltip.js').init(app);


        // **** Initialize Controllers ****

        require('./controllers/app.js').init(app);
        require('./controllers/navigation.js').init(app);
        require('./controllers/ruleEditor.js').init(app);
        require('./controllers/tooltip.js').init(app);


        app.debug('client:app')("Starting the app!");

        webix.hasRun = true;

    });

})();


