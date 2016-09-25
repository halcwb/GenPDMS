/**
 * @module controllers/treatment
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    /*
     Subscribe to View
     */
    var subscribeToView = function (app, debug, publish) {
        var subscribe = _.partial(app.bus.view.subscribe, debug),
            msg = app.msg;

        // Review a treatment and update patient treatment with the result
        subscribe(msg.treatment.review, function (data, envelope) {
            var msg = 'Not implemented yet:</br>' +
                envelope.topic + '</br>' +
                'will add or remove orders according to protocols';

            webix.message(msg);
        });

        // Edit the treatment in the treatment edit ui
        subscribe(msg.treatment.edit, function (data) {
            var treatment = data.treatment,
                patient   = data.patient;

            // Let main body now that treatment ui should be shown
            publish(msg.ui.mainBody, { item: "treatment" });

            // Publish the patient treatment
            publish(msg.treatment.edit, {
                patient: patient,
                treatment: treatment
            });

            // Publish the treatment totals
            publish(msg.treatment.totals, {
                id: patient.id
            });
        });

        //
        subscribe(msg.ui.mainBody, function () {
            publish(msg.ui.mainBody, { item: "details" });
        });

        // If specific patient is selected, get the treatment for that patient and
        // publish the patient treatment.
        subscribe(msg.patient.select, function (data) {
            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    publish(msg.patient.treatment, {
                        treatment: resp.result.orders
                    });
                },

                fail = function (err) {
                    debug(err);
                };

            app.loading(true);
            post(succ, fail, "treatment", { id: data.patient.id });
            app.loading(false);

        });

    };

    /*
     Subscribe All
     */
    var subscribe = _.once(function (app, debug) {
        var publish = _.partial(app.bus.controller.publish, debug);
        subscribeToView(app, debug, publish);
    });

    exports.init = function (app, debug) {
        subscribe(app, debug);
    };

})();