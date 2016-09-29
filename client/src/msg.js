/**
 * @file
 */

(function () {
    "use strict";

    /**
     * # Contains application messages
     * Each message fulfils a use case.
     * @namespace msg
     */
    module.exports = {
        /**
         * ## Server messages
         *
         * - Accept a request to get something from the server
         * - Return the server result either as a success or a failure
         *
         * @memberof msg
         * @type object
         */
        server: {
            /**
             * ### Request something from the server
             * Typically issued from a controller
             *
             * #### controller.publish
             *
             * @alias server.request
             * @memberof! msg#
             * @member server.request
             * @type string 
             */
            request: "server.request",
            success: "server.success",
            fail: "server.fail"
        },
        alert: {
            // show alert with data: { title, text, type, length }, type can be
            // alert-error, alert-warning or alert-info
            // length is the maximum length of the text and will be abbreviated
            // otherwise
            show: "alert.show",
            // alert ok is clicked, data {}
            ok: "alert.ok"
        },
        sideMenu: {
            // show the side menu, data {}
            show: "sideMenu.show",
            // item in side menu is selected, data: { item, trg }
            item: "sideMenu.item"
        },
        ui: {
            // ui is ready to be used, data: {}
            ready: "ui.ready",
            // let the ui show a particular mainBody, data: { item: 'body' }
            mainBody: "ui.mainBody",
            // let the ui show a detailsBody, data: { item: 'body' }
            detailsBody: "ui.detailsBody",
            // let the ui show the patient details list, data: { item: 'list' }
            patientList: "ui.patientList",
            // let the ui switch between main body and rule editor, data: { editor: true/false }
            ruleEditor: "ui.ruleEditor",
            // show a tooltip data: { tooltip: true/false, clientX, clientY, item, text }
            tooltip: "ui.tooltip"
        },
        status: {
            text: "status.text"
        },
        indication: {
            add: "indication.add"
        },
        /**
         * ## Patient messages
         * Messages that fulfil patient use cases:
         *
         * - Get patients
         * - Select patient
         * - Update patient
         * - Create patient
         * - Save patient
         *
         * @memberof msg
         * @type object
         */
        patient: {
            /**
             * ### Get patient(-s)
             * The message *patient.get* handles the retrieval and display of patients.
             *
             * #### view.publish: { filter: obj }
             * - Ask for patients filtered by filter object.
             * If filter is undefined, all patients are returned.
             *
             * #### controller.subscribeToView
             * - Retrieve request for patients. Send a request
             * to the server to get the patients.
             *
             * #### controller.publish: { patients: array }
             * - Publish the list of retrieved patients.
             *
             * #### view.subscribeToController
             * - Get the list of patients and display the patient list.
             * - Make sure that no patient is selected and
             * - clear the patient details form.
             *
             * @alias patient.get
             * @memberof! msg#
             * @member patient.get
             * @type string
             */
            get: "patient.get",

            /**
             * ### Select a patient
             * The message *patient.select* handles selection and display of a single
             * patient from a list of patients.
             *
             * #### view.bus.view.publish: { patient: obj }
             * - Publish the selected patient
             *
             * #### controller.bus.view.subscribe
             * - Retrieve patient
             *
             * #### controller.bus.controller.publish: { patient: obj }
             * - Publish the selected patient
             *
             * #### model.bus.controller.subscribe
             * - Set the model to the retrieved patient
             *
             * #### model.bus.model.publish: { patient: obj }
             * - Publish the selected patient
             *
             * #### view.bus.model.subscribe:
             * - Load the view with the selected patient
             * - Make sure that the patient is selected in the view
             *
             * @alias patient.select
             * @memberof! msg#
             * @member patient.select
             * @type string
             */
            select: "patient.select",

            // --- Edit a patient ----
            // - view: {}
            // Start editing a patient
            // update view to start editing
            edit: "patient.edit",

            // --- Update a patient ---
            // - view: { patient: obj }
            // the updated patient
            // - controller: { patient: obj }
            // the updated patient
            // - model: { patient: obj }
            // update views with patient with the updated patient
            update: "patient.update",


            // start with a new patient, data: {}
            new: "patient.new",
            save: "patient.save",
            indications: "patient.indications",
            treatment: "patient.treatment",
            totals: "patient.totals"
        },
        treatment: {
            review: "treatment.review",
            edit: "treatment.edit",
            totals: "treatment.totals"
        }
    };

})();