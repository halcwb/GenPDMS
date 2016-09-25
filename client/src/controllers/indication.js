/**
 * @module controllers/indication
 */

/*global webix, _ */

(function () {
    "use strict";

    /*
     Subscribe to View
     */
    var subscribeView = function (app, debug, publish) {
        var subscribe = _.partial(app.bus.view.subscribe, debug),
            msg = app.msg;

        // Add an indication to the list of medications
        subscribe(msg.indication.add, function (data, envelope) {
            var msg = 'Not implemented yet:</br>' +
                envelope.topic + '</br>' +
                'will add or indications';

            webix.message(msg);
        });

        // For the selected patient publish the indications
        subscribe(msg.patient.select, function (data) {
            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    publish(msg.patient.indications, {
                        indications: resp.result.indications
                    });
                },

                fail = function (err) {
                    debug(err);
                };

            app.loading(true);
            post(succ, fail, "indications", { id: data.patient.id });
            app.loading(false);

        });
    };

    var subscribe = _.once(function (app, debug) {
        var publish = _.partial(app.bus.controller.publish, debug);

        subscribeView(app, debug, publish);
    });

    /**
     * Initialize the controller
     * @param {object} app The application namespace
     * @param {Function} debug The controller specific debug function
     */
    exports.init = function (app, debug) { subscribe(app, debug); };

})();