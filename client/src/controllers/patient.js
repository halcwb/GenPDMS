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

    exports.init = function (app) {
        var debug = app.debug('client:controllers:patient:init');

        app.bus.view.subscribe('patientForm.edit', function (data, envelope) {
            debug(envelope.topic, envelope.data);

            formReadOnly(data.btn.getFormView(), false);
        });

        app.bus.view.subscribe('patientList.onItemClick', function (data, envelope) {
            var pat = data.item;

            debug(envelope.topic, data);
            $$('patientForm').setValues(pat);

            formReadOnly($$('patientForm'), true);
            _.forEach($$('treatmentList.toolbar').getChildViews(), function (el) {
                el.enable();
            });
        });

        app.bus.view.subscribe('patientForm.new', function (data, envelope) {
            debug(envelope.topic, data);

            data.btn.getFormView().clear();
            formReadOnly(data.btn.getFormView(), false);
        });

        app.bus.view.subscribe('patientForm.save', function (data, envelope) {
            var msg = 'Not implemented yet:</br>' +
                       envelope.topic + '</br>' +
                      'will save the patient in the database';

            debug(envelope.topic, data);

            webix.message(msg);

            formReadOnly(data.btn.getFormView(), true);
        });

        app.bus.view.subscribe("patientList.init", function (data, envelope) {
            debug(envelope, data);

            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    debug(resp);
                    app.bus.controller.publish("patient.patients", {
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

        debug('init');
    };

})();