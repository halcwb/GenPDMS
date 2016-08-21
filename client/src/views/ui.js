/**
 * @module views/ui
 */

/*global $$, webix */

(function () {
    "use strict";

    var id = 'ui';


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
            navigation = require('./components/navigation.js'),
            patientDetails = require('./components/patientDetails.js'),
            patientBody = require('./components/patientBody.js'),

            debug = app.debug('views:ui');

        debug('init');


        // **** Create Views ****

        webix.ui.fullScreen();

        webix.ui({
            id: id,
            rows: [
                header.view(app),
                patientBody.view(app),
                status.view(app)
            ]
        });

        webix.ui({
            view: 'contextmenu',
            id: 'patient_list_menu',
            data: [
                'Add',
                'Remove'
            ]
        }).attachTo($$('list_patient'));

        // **** Initialize Views ****

        menu.init(app);
        status.init(app);
        navigation.init(app);

        // **** Views Initialized ****

        app.bus.view.publish('ui.init');

    };

})();