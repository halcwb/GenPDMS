/**
 * ## Handles patient logic
 *
 * Handles:
 * - Retrieval of patients
 * - Selection of a single patient
 * - Updating a patient
 * - Creating a new patient
 * - Saving a patient
 * - Deleting a patient
 *
 * @module controllers/patient
 */

/*global window, webix, $$, _ */

(function () {

    "use strict";

    //region --- VARIABLES ---

    var name = "controllers:patient";

    //endregion

    //region --- HELPER FUNCTIONS ---

    //endregion

    //region --- SUBSCRIBE ---

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

    var subscribeOnce = _.once(subscribeView);

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
        var pub = _.partial(app.bus.controller.publish, debug);
        subscribeOnce(app, debug, pub);
    };

    //endregion

    //region --- EXPORT ---

    /**
     * #### Initializes the controller
     * Create subscriptions for the controller
     *
     * @param {object} app The application namespace
     */
    exports.init = function (app) {
        var deb = app.debug(name);
        deb("init");
        init(app, deb);
    };

    //endregion

})();