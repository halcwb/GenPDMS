/**
 * @module views/ui
 */

/*global $$, webix, _ */

(function () {
    "use strict";

    var id = 'ui';

    exports.getId = function () { return id; };

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
            body   = require('./components/mainBody.js'),
            status = require("./templates/statusBar.js"),

            debug = app.debug('client:' + id + ':init'),

            bus = app.bus,
            msg = app.msg;

        debug('init');


        // **** Create Views ****

        webix.ui.fullScreen();

        webix.ui({
            id: id,
            rows: [
                header.getView(app),
                body.getView(app),
                status.getView(app)
            ]
        });


        // **** Initialize Views ****

        header.init(app);
        body.init(app);
        status.init(app);

        require('./menus/sideMenu.js').init(app);


        // **** Views Initialized ****

        bus.view.publish(msg.ui.ready, {});

    };

})();