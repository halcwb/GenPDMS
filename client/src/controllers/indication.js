/**
 * @module controllers/indication
 */

/*global webix, _ */

(function () {
    "use strict";


    exports.init = function (app, debug) {
        var bus = app.bus,
            msg = app.msg;

        // Add an indication to the list of medications
        bus.view.subscribe(msg.indication.add, function (data, envelope) {
            var msg = 'Not implemented yet:</br>' +
                envelope.topic + '</br>' +
                'will add or indications';

            debug(envelope.topic, data);

            webix.message(msg);
        });

        // For the selected patient publish the indications
        bus.view.subscribe(msg.patient.select, function (data, envelope) {
            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    debug(resp);
                    bus.controller.publish(msg.patient.indications, {
                        indications: resp.result.indications
                    });
                },

                fail = function (err) {
                    debug(err);
                };

            debug(envelope.topic, data);

            app.loading(true);
            post(succ, fail, "indications", { id: data.item.id });
            app.loading(false);

        });

    };


})();