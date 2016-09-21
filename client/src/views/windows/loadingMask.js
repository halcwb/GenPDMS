/**
 * @module views/windows/loadingMask
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'loadingMask',

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

        doWait = function (loading) {
            var mask = $$(id);

            if (loading) {
                mask.show();
            }
            else {
                mask.hide();
            }
        },

        subscribe = _.once(function (app, debug) {

            app.bus.view.subscribe('show_loading_mask', function (data, envelope) {
                app.debug(id, envelope);
                doWait(data.loading);
            });

        });

    exports.getView = function (app) {
        var debug = app.debug("client:windows:loadingMask");

        debug(view);

        return view;
    };

    /**
     * loadingMask: </br>
     * creates a loading mask
     * @param app {app} uses app functionality
     * @returns {view} a loading mask view
     */
    exports.init = function (app) {
        subscribe(app, app.debug("client:" + id + ":init"));

        if (!$$(id)) {
            webix.ui(view).hide();
        }

        // Subscribe to loading event
        // Make app loading shortcut
        app.loading = function (loading) {
            app.bus.view.publish('show_loading_mask', {
                loading: loading
            });
        };

        app.debug('client:' + id)('init');

    };

})();

