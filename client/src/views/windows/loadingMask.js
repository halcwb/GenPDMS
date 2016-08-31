/**
 * @module views/windows/loadingMask
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'loadingMask',
        doWait = function (loading) {
            if (loading) {
                webix.ui({
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
                }).show();
            }
            else {
                $$(id).hide();
                $$(id).destructor();
            }
        },

        subscribe = _.once(function (app, debug) {
            app.bus.view.subscribe('show_loading_mask', function (data, envelope) {
                app.debug(id, envelope);
                doWait(data.loading);
            });
        });


    /**
     * loadingMask: </br>
     * creates a loading mask
     * @param app {app} uses app functionality
     * @returns {view} a loading mask view
     */
    exports.init = function (app) {
        subscribe(app, app.debug("client:" + id + ":init"));

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

