/**
 * @module controllers/patient
 */

/*global window, webix, $$, _ */

(function () {
    "use strict";

    exports.init = function (app, debug) {
        var bus = app.bus,
            msg = app.msg,
            mod = app.models;

        bus.view.subscribe(msg.patient.edit, function (data, envelope) {
            debug(envelope.topic, envelope.data);

            bus.controller.publish(msg.patient.edit, data);
        });

        bus.view.subscribe(msg.patient.select, function (data, envelope) {
            debug(envelope.topic, data);
            bus.controller.publish(msg.patient.select, {
                patient: data.item
            });
        });

        bus.view.subscribe(msg.patient.new, function (data, envelope) {
            debug(envelope.topic, data);

            bus.controller.publish(msg.patient.new, data);
        });

        bus.view.subscribe(msg.patient.save, function (data, envelope) {
            var txt = 'Not implemented yet:</br>' +
                       envelope.topic + '</br>' +
                      'will save the patient in the database';

            debug(envelope.topic, data);

            webix.message(txt);

            bus.controller.publish(msg.patient.save, {
                patient: data.select
            });
        });

        bus.view.subscribe(msg.patient.get, function (data, envelope) {
            debug(envelope, data);

            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    debug(resp);
                    bus.controller.publish(msg.patient.get, {
                        pats: resp.result.patients
                    });
                },

                fail = function (err) {
                    debug(err);
                };

            app.loading(true);
            post(succ, fail, "patients", {});
            app.loading(false);

        });

    };

})();