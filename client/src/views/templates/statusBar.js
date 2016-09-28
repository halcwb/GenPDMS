/**
 * ## The status bar of the application
 * @module views/templates/statusBar
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'statusBar',
        name = "views:templates:statusBar";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    //endregion

    //region --- CHILD VIEWS ---

    //endregion

    //region --- VIEW ---

    var getView = function () {
        return {
            template: 'status: #status# | message: #message#',
            id: id,
            height: 30,
            data: { status: "status", message: "message", title: "info" }
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
        var sub = _.partial(app.bus.controller.subscribe, debug);

        debug("subscribe to controller");

        sub('set.status', function (data) {
            var bar  = $$(id),
                vals = bar.getValues();

            vals.status = data.status;
            bar.setValues(vals);
        });

        sub('*.err', function (data /*, envelope */) {
            var bar = $$(id),
                vals = bar.getValues();

            vals.message = data.err;
            bar.setValues(vals);
        });
    };

    /*
     Subscribe All
     */
    var subscribeOnce = _.once(subscribeController);

    //endregion

    //region --- PUBLISH ---

    var publish = function (app, debug) {
        var pub = _.partial(app.bus.view.publish, debug),
            msg = app.msg;

        debug("publish");

        webix.event($$(id).$view, 'click', function () {
            pub(msg.status.text, {
                text: $$(id).getValues().message
            });
        });
    };

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
        publish(app, debug);
        subscribeOnce(app, debug);
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
        var view = getView();
        app.debug(name)(view);
        return view;
    };

    /**
     * #### Initializes the view
     *
     * - Create subscriptions for the view
     * - Add publish handlers to view events
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