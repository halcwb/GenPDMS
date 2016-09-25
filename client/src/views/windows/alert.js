/**
 * @module views/windows/alert
 */

/*global webix, _ */

(function () {
    "use strict";

    var id = 'alert';

    /*
     Controller Subscriptions
     */
    var subscribeController = _.once(function (app, debug, publish) {
        var subscribe = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        subscribe(msg.alert.show, function (data) {
            var text = '';

            if (data.text) {
                text = data.text.substr(0, data.length || 200);
                if (text.length < data.text.length) {
                    text = text + '...';
                }

                webix.alert({
                    id: id,
                    title: data.title,
                    text: text,
                    type: data.type,
                    callback: function () {
                        publish(msg.alert.ok, { text: text });
                    }
                });

            }
        });
    });

    /*
     Initialize
     */
    var init = _.once(function (app) {
        var debug = app.debug("views:windows:alert"),
            publish = _.partial(app.bus.view.publish, debug);

        debug('init');

        subscribeController(app, debug, publish);

    });

    /**
     * Initializes the view
     * Uses the webix $$ to get the view
     * @param app {app} provides the app functionality
     */
    exports.init = function (app) { init(app); };

})();