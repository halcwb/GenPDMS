/**
 * @module msg
 */

(function () {
    "use strict";

    module.exports = {
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
        patient: {
            patients: "patient.patients",
            patient: "patient.patient",
            // start editing current patient, data: {}
            edit: "patient.edit",
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