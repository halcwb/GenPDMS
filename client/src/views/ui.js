/**
 * ## Then main view of the application
 * @module views/ui
 */

/*global $$, webix, _ */

(function () {
    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'ui',
        name = "views:ui";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    //endregion

    //region --- CHILD VIEWS ---

    var header = require('./bars/header.js'),
        main   = require('./components/mainBody.js'),
        editor = require("./components/ruleEditorBody.js"),
        status = require("./templates/statusBar.js");

    //endregion

    //region --- VIEW ---

    var getView = function (app) {
        return {
            id: id,
            rows: [
                header.getView(app),
                main.getView(app),
                status.getView(app)
            ]
        };
    };

    //endregion

    //region --- HELPER FUNCTIONS ---

    //endregion

    //region --- SUBSCRIBE ---

    /*
     // Subscribe to View
     */

    /*
     Subscribe to Model
     */

    /*
     Subscribe to Controller
     */
    var subscribeController = function (app, debug) {
        var sub = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        debug("subscribe to controller");

        // Switch between rule editor and main body
        sub(msg.ui.ruleEditor, function (data) {

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
    };

    /*
     Subscribe All
     */

    var subscribe = _.once(subscribeController);

    //endregion

    //region --- PUBLISH ----

    var publish = function (app, debug) {
        var pub = _.partial(app.bus.view.publish, debug),
            msg = app.msg;

        debug("publish");

        pub(msg.ui.ready, {});
    };

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {

        // **** Create Views ****

        webix.ui.fullScreen();

        webix.ui(getView(app));

        // **** Initialize Views ****

        header.init(app);
        main.init(app);
        status.init(app);

        require('./menus/sideMenu.js').init(app);

        // **** Subscribe to Message Bus ****

        subscribe(app, debug);


        // **** Views Initialized ****

        publish(app, debug);
    };


    //endregion

    //region --- EXPORT ---

    /**
     * #### Get the view id
     * @returns {string} Id of the view
     */
    exports.getId = function () { return id; };

    /**
     * #### Get the view config
     * @param {object} app The application namespace
     * @returns {object} webix view config
     */
    exports.getView = function (app) {
        var view = getView(app);
        app.debug(name)(view);
        return view;
    };

    /**
     * #### Initializes the view
     *
     * - Create subscription handlers for the view
     * - Add publish handlers to view events
     * - Initialize child views
     *
     * @param {object} app The application namespace
     */
    exports.init = function (app) {
        var deb = app.debug(name);
        deb("init");
        init(app, deb);
    };

    //endregion

})();