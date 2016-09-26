/**
 * @module views/ui
 */

/*global $$, webix, _ */

(function () {
    "use strict";

    var id = 'ui',
        name = "views:ui";

    var header = require('./bars/header.js'),
        main   = require('./components/mainBody.js'),
        editor = require("./components/ruleEditorBody.js"),
        status = require("./templates/statusBar.js");

    /*
     Subscribe to Controller
     */
    var subscribe = _.once(function (app, debug) {
       var subscribe = _.partial(app.bus.controller.subscribe, debug),
           msg = app.msg;

        // Switch between rule editor and main body
        subscribe(msg.ui.ruleEditor, function (data) {

            if (data.editor) {
                webix.ui(editor.getView(app), $$(main.getId()));
                editor.init(app);
            } else {
                webix.ui(main.getView(app), $$(editor.getId()));
                var el = document.getElementsByClassName('blocklyToolboxDiv')[0];
                el.parentNode.removeChild(el);
                main.init(app);
            }

        });
    });

    /*
     Initialize
     */
    var init = function (app) {
        var debug = app.debug(name),

            bus = app.bus,
            msg = app.msg;

        debug("init");


        // **** Create Views ****

        webix.ui.fullScreen();

        webix.ui({
            id: id,
            rows: [
                header.getView(app),
                main.getView(app),
                status.getView(app)
            ]
        });


        // **** Initialize Views ****

        header.init(app);
        main.init(app);
        status.init(app);

        require('./menus/sideMenu.js').init(app);

        // **** Subscribe to Message Bus ****

        subscribe(app, debug);


        // **** Views Initialized ****

        bus.view.publish(debug, msg.ui.ready, { });
    };

    /**
     * ### Get View Id
     * @returns {string}
     */
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
    exports.init = function (app) { init(app); };

})();