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

    var subscribeServer = function (app, debug, publish) {
        var sub = _.partial(app.bus.server.subscribe, debug),
            msg = app.msg;

        debug("subscribe to server");

        // Handle the 'get patients' response
        sub(msg.server.success + ".patients", function (resp) {
           publish(msg.patient.get, {
               patients: resp.result.patients
           });
        });
    };

    var subscribeView = function (app, debug, publish) {
        var sub = _.partial(app.bus.view.subscribe, debug),
            msg = app.msg;

        debug("subscribe to view");

        // Patient can be edited
        sub(msg.patient.edit, function (data) {
            publish(msg.patient.edit, data);
        });

        // Patient is selected
        sub(msg.patient.select, function (data) {
            publish(msg.patient.select, {
                patient: data.patient
            });
        });

        // New patient
        sub(msg.patient.new, function (data) {
            publish(msg.patient.new, data);
        });

        // Save patient
        sub(msg.patient.save, function (data, envelope) {
            var txt = 'Not implemented yet:</br>' +
                envelope.topic + '</br>' +
                'will save the patient in the database';

            webix.message(txt);

            publish(msg.patient.save, {
                patient: data.select
            });
        });

        // Get the list of patients
        sub(msg.patient.get, function (data, envelope) {

            publish(msg.server.request, {
                act: "patients",
                qry: {}
            });

        });

    };

    var subscribeOnce = _.once(function (app, debug, publish) {
        subscribeView(app, debug, publish);
        subscribeServer(app, debug, publish);
    });

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