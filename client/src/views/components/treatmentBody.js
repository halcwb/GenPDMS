/**
 * @module views/components/treatmentBody
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'treatmentBody',
        name = "views:components:treatmentBody",
        toolbarId = id + '.toolbar',

        treatmentDetails = require('./../lists/treatmentDetail.js'),
        totals           = require("./../lists/totals.js");

    /*
     Subscribe to Controllers
     */
    var subscribe = _.once(function (app, debug) {
        var subscribe = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        debug("subscribe");

        subscribe(msg.treatment.edit, function (data) {
            var patient = data.patient;

            $$(id + ".header").setValues({
                no: patient.no,
                name: patient.name,
                dob: webix.Date.dateToStr("%d-%M-%Y")(patient.dob),
                age: patient.age,
                ageUnit: patient.ageUnit,
                weight: patient.weight,
                weightUnit: patient.weightUnit
            });
        });
    });

    /*
     Initialize
     */
    var init = function (app) {
        var debug = app.debug(name),
            publish = _.partial(app.bus.view.publish, debug),
            msg = app.msg;

        debug('init');

        $$(id + ".back").attachEvent("onItemClick", function () {
            publish(msg.ui.mainBody, {
                item: "details"
            });
        });

        subscribe(app, debug);

        treatmentDetails.init(app);
        totals.init(app);
    };

    /**
     * #### Get the view id
     * @returns {string}
     */
    exports.getId = function () { return id; };

    /***
     * #### Get the view config
     * @param {object} app The application namespace
     * @returns {object}
     */
    exports.getView = function (app) {
        var view = {
            id: id,
            rows: [
                {
                    template: 'Id: #no#, Patient: #name#, Birth date: #dob#, Age: #age# #ageUnit#, Weight: #weight# #weightUnit#',
                    id: id + '.header',
                    height: 40
                },
                {
                    multi: 'mixed',
                    view: 'accordion',
                    rows: [
                        {
                            header: 'Treatment',
                            collapsed: false,
                            body: treatmentDetails.getView(app)
                        },
                        {
                            header: 'Totals',
                            collapsed: true,
                            body: totals.getView(app)
                        }
                    ]
                },
                {
                    view: 'toolbar',
                    id: toolbarId,
                    height: 40,
                    cols: [
                        { template: '' },
                        {
                            view: 'button',
                            id: id + '.back',
                            value: 'Back',
                            tooltip: 'Return to the main stream',
                            width: 75
                        },
                        {
                            view: 'button',
                            id: id + '.sign',
                            value: 'Sign',
                            tooltip: 'Sign treatment to be administered',
                            width: 75
                        }
                    ]
                }
            ]
        };

        app.debug(name)(view);
        return view;
    };

    /**
     * Initialize the application
     * @param {object} app The application namespace
     */
    exports.init = function (app) { init(app); };


})();