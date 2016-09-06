/**
 * @module controllers/treatment
 */

/*global webix, $$, _ */

(function () {
    "use strict";


    exports.init = function (app, debug) {
        var treatmentBody = 'treatmentBody',
            patientBody   = 'patientBody';

        app.bus.view.subscribe('treatmentList.review', function (data, envelope) {
            var msg = 'Not implemented yet:</br>' +
                envelope.topic + '</br>' +
                'will add or remove orders according to protocols';

            debug(envelope.topic, data);

            webix.message(msg);
        });


        app.bus.view.subscribe('treatmentList.edit', function (data, envelope) {
            var treatment = $$('treatmentList').data.getRange(),
                patient   = $$("patientForm").getValues();

            debug(envelope);

            $$(treatmentBody).show();

            app.bus.controller.publish("treatment.edit", {
                patient: patient,
                treatment: treatment
            });

            app.bus.controller.publish("treatment.totals", {
                id: patient.id
            });
        });

        app.bus.view.subscribe('treatmentBody.back', function (data, envelope) {
            var pat = $$("treatmentBody.header").getValues();

            debug(envelope.topic, data, pat);

            $$(patientBody).show();

        });

        app.bus.view.subscribe("patientList.onItemClick", function (data, envelope) {
            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    debug(resp);
                    app.bus.controller.publish("patient.treatment", {
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

        debug('init');
    };



})();