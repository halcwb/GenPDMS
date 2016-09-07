/**
 * @module controllers/app
 */

/*global _ */

(function () {
    "use strict";

    /**
     * Initializes the controller
     * @param app {app} Object with app functionality
     * uses: </br>
     * app.debug</br>
     * app.bus.view.subscribe</br>
     * app.bus.controller.publish</br>
     */
    exports.init = function (app, debug) {
        var msg = app.msg,
            bus = app.bus;

        // Show the status text in an alert
        bus.view.subscribe(msg.status.text, function (data, envelope) {
            debug(envelope.topic, data);

            bus.controller.publish(msg.alert.show, {
                title: "Messages",
                type: "alert-info",
                text: data.text
            });
        });

        // Invoke the handler for the menu item
        bus.view.subscribe(msg.sideMenu.item, function (data, envelope) {
            var status,
                handle = {
                    'server': function () {
                        app.settings.demo = !app.settings.demo;
                        status = app.settings.demo ? 'demo' : 'online';
                        bus.controller.publish(msg.status.text, { status: status });
                    },
                    'debug': function (data) {
                        var enabled = data.trg.innerText.split(': ')[1];

                        if (enabled === 'enabled') {
                            localStorage.debug = '';
                        } else {
                            localStorage.debug = 'client:*';
                        }

                        window.location.reload();
                    }
                };

            debug(envelope.topic, data);
            handle[data.item](data, envelope);
        });

        // Show the side menu
        bus.view.subscribe(msg.sideMenu.show, function (data, envelope) {
            debug(envelope);

            bus.controller.publish(msg.sideMenu.show, {});
        });

    };

})();