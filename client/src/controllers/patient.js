/**
 * @module controllers/patient
 */

/*global window, webix, $$, _ */

(function () {
    "use strict";

    var formReadOnly = function (form, readOnly) {
        _.forEach(form.elements, function (el) {
            el.config.readonly = readOnly;
            el.refresh();
        });
    };

    exports.init = function (app, debug) {
        var bus = app.bus,
            msg = app.msg;

        bus.view.subscribe(msg.patient.edit, function (data, envelope) {
            debug(envelope.topic, envelope.data);

            formReadOnly(data.btn.getFormView(), false);
        });

        bus.view.subscribe(msg.patient.patient, function (data, envelope) {
            debug(envelope.topic, data);

            bus.controller.publish(msg.patient.patient, {
                patient: data.item
            });
        });

        bus.view.subscribe(msg.patient.new, function (data, envelope) {
            debug(envelope.topic, data);

            data.btn.getFormView().clear();
            formReadOnly(data.btn.getFormView(), false);
        });

        bus.view.subscribe(msg.patient.save, function (data, envelope) {
            var msg = 'Not implemented yet:</br>' +
                       envelope.topic + '</br>' +
                      'will save the patient in the database';

            debug(envelope.topic, data);

            webix.message(msg);

            formReadOnly(data.btn.getFormView(), true);
        });

        bus.view.subscribe(msg.patient.patients, function (data, envelope) {
            debug(envelope, data);

            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    debug(resp);
                    app.bus.controller.publish(msg.patient.patients, {
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