/**
 * @module views/ui
 */

/*global $$, webix */

(function () {
    "use strict";


    /**
     * Initialize ui with app.
     * app provides: </br>
     * </br>
     * - debug function</br>
     * - bus object</br>
     * </br>
     * expects: require function and webix lib
     * @param app {app} - Provides app functionality
     */
    exports.init = function (app) {

        var header = require('./bars/header.js'),
            menu = require('./menus/sideMenu.js'),
            status = require('./templates/bottomBar.js'),
            debug = app.debug('views:ui');


        debug('init');


        // **** Create Views ****

        webix.ui.fullScreen();

        webix.ui({
            id: 'ui',
            rows: [
                header.view(app),
                { template: 'Welcome to the Generic Patient Data Management System' },
                status.view(app)
            ]
        });


        // **** Initialize Views ****

        menu.init(app);
        status.init(app);

        // **** Views Initialized ****

        app.bus.view.publish('ui.init');

    };

})();