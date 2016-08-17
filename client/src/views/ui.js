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
                {cols: [
                    {
                        view: 'datatable',
                        resizeColumn: true,
                        select: 'row',
                        columns: [
                            { id: 'no', header: 'HospNo', sort: 'string' },
                            { id: 'name', header: 'Name', fillspace: true, sort: 'string' }
                        ],
                        data: [
                            { id: '1', no: '1', name: 'John Cedar' },
                            { id: '2', no: '2', name: 'Frederick Maple' },
                            { id: '3', no: '3', name: 'Christine Damian' },
                            { id: '4', no: '4', name: 'Eric Underwood' }
                        ]
                    },
                    { view: 'resizer' },
                    { template: 'details'}

                ]},
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