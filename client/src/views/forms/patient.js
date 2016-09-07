/**
 * views/forms/patient
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = "patientForm";

    var labelWidth = 100;

    var formReadOnly = function (form, readOnly) {
        _.forEach(form.elements, function (el) {
            el.config.readonly = readOnly;
            el.refresh();
        });
    };

    var subscribe = _.once(function (app, debug) {
        var bus = app.bus,
            msg = app.msg;

        // load the patient form with the patient in the message
        bus.controller.subscribe(msg.patient.patient, function (data, envelope) {
            var formId = id;

            debug(envelope.topic, data);

            // load form with patient data
            $$(formId).setValues(data.patient);

            // set form to read only
            formReadOnly($$(formId), true);

        });
    });


    var view = {
        view: "form",
        id: id,
        elements: [
            { rows: [
                { template: "Patient Details", type: "section" },
                {
                    view: "text",
                    label: "Id",
                    placeholder: "Hospital Number",
                    name: "no",
                    readonly: true,
                    labelAlign: "right",
                    labelWidth: labelWidth
                },
                {
                    view: "text",
                    label: "Last Name",
                    placeholder: "Last Name",
                    name: "fname",
                    readonly: true,
                    labelAlign: "right",
                    labelWidth: labelWidth
                },
                {
                    view: "text",
                    label: "First Name",
                    placeholder: "First Name",
                    name: "lname",
                    readonly: true,
                    labelAlign: "right",
                    labelWidth: labelWidth
                },
                {
                    cols: [
                        {
                            view: "datepicker",
                            label: "Birth date",
                            width: 572,
                            placeholder: "Patient Birth Date",
                            name: "dob",
                            readonly: true,
                            format: "%d-%M-%Y",
                            labelAlign: "right",
                            labelWidth: labelWidth
                        },
                        {
                            template: "",
                            maxWidth: 50
                        },
                        {
                            view: "text",
                            attributes: { type: "number" },
                            validate: function (value) {
                                return !isNaN(value * 1);
                            },
                            width: 115,
                            label: "Age",
                            name: "age",
                            readonly: true,
                            labelAlign: "right",
                            labelWidth: 40
                        },
                        {
                            view: "combo",
                            label: "",
                            name: "ageUnit",
                            width: 100,
                            readonly: true,
                            value: "years",
                            options: ["years", "months", "weeks", "days"]
                        },
                        { template: "" }
                    ]

                },
                {
                    cols: [
                        {
                            view: "text",
                            attributes: { type: "number" },
                            validate: function (value) {
                                return !isNaN(value * 1);
                            },
                            width: 200,
                            label: "Weight",
                            name: "weight",
                            labelAlign: "right",
                            labelWidth: labelWidth,
                            readonly: true
                        },
                        {
                            view: "combo",
                            label: "",
                            name: "weightUnit",
                            width: 100,
                            readonly: true,
                            value: "kg",
                            options: ["kg", "gram"]
                        },
                        {
                            view: "text",
                            attributes: { type: "number" },
                            validate: function (value) {
                                return !isNaN(value * 1);
                            },
                            width: 175,
                            label: "Length",
                            name: "length",
                            labelAlign: "right",
                            labelWidth: 75,
                            readonly: true
                        },
                        {
                            view: "combo",
                            label: "",
                            width: 100,
                            name: "lengthUnit",
                            readonly: true,
                            value: "m",
                            options: ["m", "cm"]
                        },
                        {
                            template: "",
                            maxWidth: 50
                        },
                        {
                            view: "text",
                            attributes: { type: "number" },
                            validate: function (value) {
                                return !isNaN(value * 1);
                            },
                            label: "BSA",
                            width: 175,
                            name: "bsa",
                            labelAlign: "right",
                            labelWidth: 40,
                            readonly: true
                        },
                        {
                            view: "label",
                            label: "m2",
                            width: 40,
                            align: "right"
                        },
                        { template: "" }
                    ]
                },
                { template: "", height: 20 },
                {
                    cols: [
                        { template: "" },
                        {
                            view: "button",
                            id: id + ".new",
                            value: "New",
                            tooltip: "Add a new patient",
                            width: 75
                        },
                        {
                            view: "button",
                            id: id + ".edit",
                            value: "Edit",
                            type: "form",
                            tooltip: "Start editing patient details",
                            width: 75
                        },
                        {
                            view: "button",
                            id: id + ".save",
                            value: "Save",
                            tooltip: "Save patient details",
                            width: 75
                        }
                    ]
                }
            ]}
        ]
    };

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        app.debug("client:" + id + ":view")(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug("client:" + id);

        debug("init");

        subscribe(app, debug);
    };

})();