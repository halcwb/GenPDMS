/**
 * # Application Controller
 * @module controllers/app
 */

/*global _, webix, console */

(function () {

    "use strict";

    //region --- VARIABLES ---
    var name = "controllers:app";

    //endregion

    //region --- HELPER FUNCTIONS ---

    //endregion

    //region --- SUBSCRIBE ---

    var subscribeToView = function (app, debug, publish) {
        var sub = _.partial(app.bus.view.subscribe, debug),
            msg = app.msg;

        // Inform that the ui is ready
        sub(msg.ui.ready, function (data) {
            publish(msg.ui.ready, data);
        });

        // Show the status text in an alert
        sub(msg.status.text, function (data) {

            publish(msg.alert.show, {
                title: "Messages",
                type: "alert-info",
                text: data.text
            });
        });

        // Invoke the handler for the side menu item
        sub(msg.sideMenu.item, function (data, envelope) {
            var status,
                handle = {
                    'server': function () {
                        app.settings.demo = !app.settings.demo;
                        status = app.settings.demo ? 'demo' : 'online';

                        publish(msg.status.text, { status: status });
                    },
                    'debug': function (data) {
                        var enabled = data.trg.innerText.split(': ')[1];

                        if (enabled === 'enabled') {
                            app.util.localStorage.setItem("debug", "*");
                        } else {
                            app.util.localStorage.setItem("debug", "");
                        }

                        window.location.reload();
                    }
                };

            handle[data.item](data, envelope);
        });

        // Show the side menu
        sub(msg.sideMenu.show, function () {
            publish(msg.sideMenu.show, {} );
        });
    };

    var subscribeOnce = _.once(subscribeToView);

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
        var publish = _.partial(app.bus.controller.publish, debug);

        subscribeOnce(app, debug, publish);
    };

    //endregion

    //region --- EXPORT ---

    /**
     * #### Initializes the controller
     * Create subscriptions for the controller
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