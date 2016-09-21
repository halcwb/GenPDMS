/**
 * views/forms/patient
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = "patientForm",
        newBtn  = id + ".new",
        editBtn = id + ".edit",
        saveBtn = id + ".save";

    var labelWidth = 100;

    var formReadOnly = function (readOnly) {
        var form = $$(id);

        _.forEach(form.elements, function (el) {
            el.config.readonly = readOnly;
            // ToDo solve events memory leak problem
            el.refresh();
        });
    };

    var formEnable = function (enable) {
        var form = $$(id);

        _.forEach(form.elements, function (el) {
            if (enable) el.enable();
            else el.disable();
        });
    };

    var setButtons = function (app, state) {
        var msg = app.msg,
            scen = {};

        // No patient selected
        scen[msg.ui.ready] = {};
        scen[msg.ui.ready][newBtn]  = true;
        scen[msg.ui.ready][editBtn] = false;
        scen[msg.ui.ready][saveBtn] = false;

        // New patient
        scen[msg.patient.new] = {};
        scen[msg.patient.new][newBtn]  = true;
        scen[msg.patient.new][editBtn] = false;
        scen[msg.patient.new][saveBtn] = true;

        // Edit patient
        scen[msg.patient.edit] = {};
        scen[msg.patient.edit][newBtn]  = true;
        scen[msg.patient.edit][editBtn] = false;
        scen[msg.patient.edit][saveBtn] = true;

        // Patient selected
        scen[msg.patient.select] = {};
        scen[msg.patient.select][newBtn]  = true;
        scen[msg.patient.select][editBtn] = true;
        scen[msg.patient.select][saveBtn] = false;

        _.forEach([newBtn, editBtn, saveBtn], function (id) {
            var btn = $$(id);
            if (!scen[state]) return;
            
            if (scen[state][id]) btn.enable();
            else btn.disable();
        });
    };

    var subscribe = _.once(function (app, debug) {
        var bus = app.bus,
            msg = app.msg;

        bus.controller.subscribe(msg.ui.ready, function (data, envelope) {
            debug(envelope.topic, data);
            formEnable(false);
            setButtons(app, envelope.topic);
        });

        // load the patient form with the patient in the message
        bus.controller.subscribe(msg.patient.select, function (data, envelope) {
            var form = $$(id);

            debug(envelope.topic, data);

            // load form with patient data
            form.noChange = true;
            form.setValues(data.select);
            form.noChange = false;

            // set form to read only
            formEnable(true);
            formReadOnly(true);
            setButtons(app, envelope.topic);
        });

        // load the patient form with the patient in the message
        bus.model.subscribe(msg.patient.select, function (data, envelope) {
            var form = $$(id);

            debug(envelope.topic, data);

            // load form with patient data
            form.noChange = true;
            form.setValues(data.select);
            form.noChange = false;


            // set form to read only
            formEnable(true);
            formReadOnly(true);
            setButtons(app, envelope.topic);
        });

        bus.controller.subscribe(msg.patient.edit, function (data, envelope) {
            debug(envelope.topic, data);

            formReadOnly(false);
            setButtons(app, envelope.topic);
        });

        bus.controller.subscribe(msg.patient.new, function (data, envelope) {
            var form = $$(id);

            debug(envelope.topic, data);

            form.clear();
            formEnable(true);
            formReadOnly(false);
            setButtons(app, envelope.topic);
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
                    label: "First Name",
                    placeholder: "First Name",
                    name: "fname",
                    readonly: true,
                    labelAlign: "right",
                    labelWidth: labelWidth
                },
                {
                    view: "text",
                    label: "Last Name",
                    placeholder: "Last Name",
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
                        },
                        {
                            view: "button",
                            id: id + ".cancel",
                            value: "Cancel",
                            tooltip: "Cancel actions",
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
        var bus = app.bus,
            msg = app.msg,
            debug = app.debug("client:" + id);

        debug("init");

        $$(id + ".new").attachEvent("onItemClick", function () {
            bus.view.publish(msg.patient.new, {});
        });

        $$(id + ".edit").attachEvent("onItemClick", function () {
            bus.view.publish(msg.patient.edit, {});
        });

        $$(id + ".save").attachEvent("onItemClick", function () {
            bus.view.publish(msg.patient.save, {
                patient: $$(id).getValues()
            });
        });

        _.forEach($$(id).elements, function (el) {
            el.attachEvent("onChange", function () {
                var form = $$(id);

                if (!form.noChange) {
                    debug("publish", msg.patient.select);

                    bus.view.publish(msg.patient.select, {
                        patient: form.getValues()
                    });
                }
            });
        });

        subscribe(app, debug);
    };

})();