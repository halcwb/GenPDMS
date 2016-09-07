/**
 * @module views/windows/alert
 */

/*global webix, _ */

(function () {
    "use strict";


    var id = 'alert',
        subscribe = _.once(function (app, debug) {
            var msg = app.msg;

            app.bus.controller.subscribe(msg.alert.show, function (data, envelope) {
                var text = '';

                debug(envelope.topic, data);

                if (data.text) {
                    text = data.text.substr(0, data.length || 200);
                    if (text.length < data.text.length) {
                        text = text + '...';
                    }

                    webix.alert({
                        title: data.title,
                        text: text,
                        type: data.type,
                        callback: function () {
                            app.bus.view.publish(msg.alert.ok, { text: text });
                        }
                    });

                }
            });

        });

    /**
     * Initializes the view
     * Uses the webix $$ to get the view
     * @param app {app} provides the app functionality
     */
    exports.init = function (app) {
        var debug = app.debug('client:' + id + ":init");

        subscribe(app, debug);

        debug('init');

    };

})();