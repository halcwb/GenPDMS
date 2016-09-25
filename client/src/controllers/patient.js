/**
 * Handles patient logic
 * @module controllers/patient
 */

/*global window, webix, $$, _ */

(function () {
    "use strict";

    /*
     Subscribe View
     */
    var subscribeView = function (app, debug, publish) {
        var subscribe = _.partial(app.bus.view.subscribe, debug),
            msg = app.msg;

        subscribe(msg.patient.edit, function (data) {
            publish(msg.patient.edit, data);
        });

        subscribe(msg.patient.select, function (data) {
            publish(msg.patient.select, {
                patient: data.patient
            });
        });

        subscribe(msg.patient.new, function (data) {
            publish(msg.patient.new, data);
        });

        subscribe(msg.patient.save, function (data, envelope) {
            var txt = 'Not implemented yet:</br>' +
                envelope.topic + '</br>' +
                'will save the patient in the database';

            webix.message(txt);

            publish(msg.patient.save, {
                patient: data.select
            });
        });

        // Get the list of patients
        subscribe(msg.patient.get, function (data, envelope) {
            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    publish(msg.patient.get, {
                        patients: resp.result.patients
                    });
                },

                fail = function (err) {
                    debug("error", err);
                };

            app.loading(true);
            // ToDo start using filter object
            post(succ, fail, "patients", {});
            app.loading(false);

        });

    };

    /*
     Subscribe All
     */
    var subscribe = _.once(function (app, debug) {
        var publish = _.partial(app.bus.controller.publish, debug);
        subscribeView(app, debug, publish);
    });

    /**
     * #### Initializes the controller
     * Will handle:
     * - Retrieval of patients
     * - Selection of a single patient
     * - Updating a patient
     * - Creating a new patient
     * - Saving a patient
     * - Deleting a patient
     *
     * @param {object} app application namespace
     * @param {object} debug provides debugger functions
     */
    exports.init = function (app, debug) {
        subscribe(app, debug);
    };

})();