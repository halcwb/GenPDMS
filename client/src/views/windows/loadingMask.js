/**
 * @module views/windows/loadingMask
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'loadingMask',

        /*
        View Config Object
         */
        view = {
            id: id,
            view: "window",
            width: 100,
            height: 100,
            modal: true,
            position: "center",
            head: false,
            borderless: true,
            body: {
                template: "<p align='center'><i class='fa fa-spin fa-spinner fa-4x'></i></p>",
                css: "wait"

            }
        },

        /*
        Helper Functions
         */
        doWait = function (loading) {
            var mask = $$(id);

            if (loading) {
                mask.show();
            }
            else {
                mask.hide();
            }
        },

        /*
        View Subscriptions
         */
        subscribe = function (app, debug) {

            app.bus.view.subscribe(debug, 'show_loading_mask', function (data) {
                doWait(data.loading);
            });

        },

        /*
        Initialize the View
         */
        init = _.once(function (app) {
            var debug = app.debug("views:windows:loadingMask");

            debug("init");

            // subscribe to loading event
            subscribe(app, debug);

            // make sure loading mask is not visible
            if (!$$(id)) {
                webix.ui(view).hide();
            }

            // make app loading shortcut
            app.loading = function (loading) {
                app.bus.view.publish(debug, 'show_loading_mask', {
                    loading: loading
                });
            };

        });

    /**
     * loadingMask: </br>
     * creates a loading mask
     * @param app {app} uses app functionality
     * @returns {undefined}
     */
    exports.init = function (app) { init(app); };

})();

