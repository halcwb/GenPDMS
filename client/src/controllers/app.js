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

        app.bus.view.subscribe('bottomBar.click', function (data, envelope) {
            debug(envelope);
            app.bus.controller.publish('app.alert', {
                title: 'Error',
                type: 'alert-error',
                text: data.text
            });
        });

        app.bus.view.subscribe('side_menu_item', function (data, envelope) {
            var status,
                handle = {
                    'server': function () {
                        app.settings.demo = !app.settings.demo;
                        status = app.settings.demo ? 'demo' : 'online';
                        app.bus.controller.publish('set.status', { status: status });
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

            debug(envelope);
            handle[data.id](data, envelope);
        });

        app.bus.view.subscribe('show.sideMenu', function (data, envelope) {
            debug(envelope);

            app.bus.controller.publish('show.sideMenu', {});
        });

    };

})();