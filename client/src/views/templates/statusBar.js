/**
 * @module views/templates/statusBar
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'statusBar',
        name = "views:templates:statusBar",

        view = {
            template: 'status: #status# | message: #message#',
            id: id,
            height: 30,
            data: { status: "status", message: "message", title: "info" }
        };

    /*
     Controller Subscriptions
     */
    var subscribeController = _.once(function (app, debug) {
        var subscribe = _.partial(app.bus.controller.subscribe, debug);

        debug("subscribe");

        subscribe('set.status', function (data) {
            var bar  = $$(id),
                vals = bar.getValues();

            vals.status = data.status;
            bar.setValues(vals);
        });

        subscribe('*.err', function (data /*, envelope */) {
            var bar = $$(id),
                vals = bar.getValues();

            vals.message = data.err;
            bar.setValues(vals);
        });

    });

    /*
     Initialize the view
     */
    var init = function (app) {
        var debug = app.debug(name),
            msg = app.msg;

        debug("init");

        webix.event($$(id).$view, 'click', function () {
            app.bus.view.publish(debug, msg.status.text, {
                text: $$(id).getValues().message
            });
        });

        subscribeController(app, debug);
    };

    /**
     * ### Get the View Id
     * @returns {string} The view Id
     */
    exports.getId = function () { return id; };

    /**
     * ### Create the view
     * @param app {app} provides the app functionality
     * @returns {view} Returns the view
     */
    exports.getView = function (app) {
        app.debug(name)(view);

        //noinspection JSValidateTypes
        return view;
    };

    /**
     * ### Initializes the view
     * Uses the webix $$ to get the view
     * @param app {app} provides the app functionality
     */
    exports.init = function (app) { init(app); };


})();