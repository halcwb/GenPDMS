/**
 * @module controllers/treatment
 */

/*global webix, $$, _ */

(function () {
    "use strict";


    exports.init = function (app, debug) {
        var bus = app.bus,
            msg = app.msg;

        // Review a treatment and update patient treatment with the result
        bus.view.subscribe(msg.treatment.review, function (data, envelope) {
            var msg = 'Not implemented yet:</br>' +
                envelope.topic + '</br>' +
                'will add or remove orders according to protocols';

            debug(envelope.topic, data);

            webix.message(msg);
        });

        // Edit the treatment in the treatment edit ui
        bus.view.subscribe(msg.treatment.edit, function (data, envelope) {
            var treatment = data.treatment,
                patient   = data.select;

            debug(envelope.topic, data);

            // Let main body now that treatment ui should be shown
            bus.controller.publish(msg.ui.mainBody, { item: "treatment" });

            // Publish the patient treatment
            bus.controller.publish(msg.treatment.edit, {
                patient: patient,
                treatment: treatment
            });

            // Publish the treatment totals
            bus.controller.publish(msg.treatment.totals, {
                id: patient.id
            });
        });

        //
        bus.view.subscribe(msg.ui.mainBody, function (data, envelope) {
            debug(envelope.topic, data);

            bus.controller.publish(msg.ui.mainBody, { item: "details" });
        });

        // If specific patient is selected, get the treatment for that patient and
        // publish the patient treatment.
        bus.view.subscribe(msg.patient.select, function (data, envelope) {
            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    debug(resp);
                    bus.controller.publish(msg.patient.treatment, {
                        treatment: resp.result.orders
                    });
                },

                fail = function (err) {
                    debug(err);
                };

            debug(envelope.topic, data);

            app.loading(true);
            post(succ, fail, "treatment", { id: data.item.id });
            app.loading(false);

        });

    };



})();