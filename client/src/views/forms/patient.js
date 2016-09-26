/**
 * ## Patient Details Form
 *
 * - Display patient details
 * - Update patient details
 * - Create a new patient with details
 *
 * @module views/forms/patient
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    //region --- IDENTIFIERS AND NAMES ----

    var id = "patientForm",
        name = "views:forms:patient",

        newBtn    = id + ".new",
        editBtn   = id + ".edit",
        saveBtn   = id + ".save",
        cancelBtn = id + ".cancel";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    var labelWidth = 100;

    //endregion

    //region --- VIEW ---

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
                            id: newBtn,
                            value: "New",
                            tooltip: "Add a new patient",
                            width: 75
                        },
                        {
                            view: "button",
                            id: editBtn,
                            value: "Edit",
                            type: "form",
                            tooltip: "Start editing patient details",
                            width: 75
                        },
                        {
                            view: "button",
                            id: saveBtn,
                            value: "Save",
                            tooltip: "Save patient details",
                            width: 75
                        },
                        {
                            view: "button",
                            id: cancelBtn,
                            value: "Cancel",
                            tooltip: "Cancel actions",
                            width: 75
                        }
                    ]
                }
            ]}
        ]
    };

    //endregion

    //region --- HELPER FUNCTIONS ---

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

    //endregion

    //region --- SUBSCRIBE ----

    /*
    // Subscribe to View
     */
    var subscribeView = function (app, debug) {
        var subscribe = _.partial(app.bus.view.subscribe, debug),
            msg = app.msg;

        // Gets a new list of patients so no patient is selected
        subscribe(msg.patient.get, function (data, envelope) {
            var form = $$(id);

            form.noChange = true;
            form.clear();
            form.noChange = false;

            formEnable(false);
            formReadOnly(true);
            setButtons(app, envelope.topic);
        });

    };


    /*
     Subscribe to Model
     */
    var subscribeModel = function (app, debug) {
        var subscribe = _.partial(app.bus.model.subscribe, debug),
            msg = app.msg;

        // load the patient form with the patient in the message
        subscribe(msg.patient.select, function (data, envelope) {
            var form = $$(id);

            // load form with patient data
            form.noChange = true;
            form.setValues(data.patient);
            form.noChange = false;


            // set form to read only
            formEnable(true);
            formReadOnly(true);
            setButtons(app, envelope.topic);
        });

        subscribe(msg.patient.update, function (data) {
            var form = $$(id);

            // load form with patient data
            form.noChange = true;
            form.setValues(data.patient);
            form.noChange = false;
        });
    };

    /*
     Subscribe to Controller
     */
    var subscribeController = function (app, debug) {
        var subscribe = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        subscribe(msg.ui.ready, function (data, envelope) {
            formEnable(false);
            setButtons(app, envelope.topic);
        });

        // load the patient form with the patient in the message
        subscribe(msg.patient.select, function (data, envelope) {
            var form = $$(id);

            // load form with patient data
            form.noChange = true;
            if (data.patient) {
                form.setValues(data.patient);
            }
            form.noChange = false;

            // set form to read only
            formEnable(true);
            formReadOnly(true);
            setButtons(app, envelope.topic);
        });

        subscribe(msg.patient.edit, function (data, envelope) {

            formReadOnly(false);
            setButtons(app, envelope.topic);
        });

        subscribe(msg.patient.new, function (data, envelope) {
            var form = $$(id);

            form.noChange = true;
            form.clear();
            form.noChange = false;

            formEnable(true);
            formReadOnly(false);
            setButtons(app, envelope.topic);
        });
    };

    /*
     Subscribe
     */
    var subscribe = _.once(function (app, debug) {
        subscribeView(app,debug);
        subscribeController(app, debug);
        subscribeModel(app, debug);
    });

    //endregion

    //region --- PUBLISH ----

    var publish = function (app, publish) {
        var msg = app.msg;

        $$(newBtn).attachEvent("onItemClick", function () {
            publish(msg.patient.new, {});
        });

        $$(editBtn).attachEvent("onItemClick", function () {
            publish(msg.patient.edit, {});
        });

        $$(saveBtn).attachEvent("onItemClick", function () {

            publish(msg.patient.save, {
                patient: $$(id).getValues()
            });
        });

        _.forEach($$(id).elements, function (el) {
            el.attachEvent("onChange", function () {
                var form = $$(id);

                if (!form.noChange) {
                    publish(msg.patient.update, {
                        patient: form.getValues()
                    });
                }
            });
        });
    };

    //endregion

    //region --- INITIALIZE ---

    var init = function (app) {
        var deb = app.debug(name),
            pub = _.partial(app.bus.view.publish, deb);

        deb("init");

        // Publish User Events
        publish(app, pub);

        // Subscribe the view to relevant messages
        subscribe(app, deb);
    };

    //endregion

    //region --- EXPORT ---

    /**
     * #### Get the view id
     * @returns {string} Id of the view
     */
    exports.getId = function () { return id; };

    /**
     * #### Get the view config
     * @param {object} app The application namespace
     * @returns {object} webix view config
     */
    exports.getView = function (app) {
        app.debug(name)(view);
        return view;
    };

    /**
     * #### Initializes the view
     * @param {object} app The application namespace
     */
    exports.init = function (app) { init(app); };

    //endregion

})();