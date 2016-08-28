/**
 * views/forms/patient
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = "patientForm";

    var labelWidth = 100;

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
                    view: "datepicker",
                    label: "Birth date",
                    placeholder: "Patient Birth Date",
                    name: "dob",
                    readonly: true,
                    format: "%d-%M-%Y",
                    labelAlign: "right",
                    labelWidth: labelWidth
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
                            template: ""
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
                            labelWidth: 75,
                            readonly: true
                        },
                        {
                            view: "label",
                            label: "m2",
                            width: 40,
                            align: "right",
                            name: "bsa"
                        }
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

        app.util.publishButton({
            id: id,
            app: app,
            debug: debug
        });

        app.bus.view.publish(id + ".new", {
            btn: $$(id + ".new")
        });

        debug("init");
    };

})();