/**
 * @module views/treatmentBody
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'treatmentBody',
        toolbarId = id + '.toolbar',

        treatmentDetails = require('./../lists/treatmentDetail.js'),
        totals           = require("./../lists/totals.js"),

        subscribe = _.once(function (app, debug) {

            app.bus.controller.subscribe("treatment.edit", function (data, envelope) {
                var patient = data.patient;

                debug(envelope.topic, data);

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

    exports.getId = function () { return id; };

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

        app.debug('client:views:components:' + id + ':getView')(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:views:components:' + id + ':init');

        app.util.publishButton({
            id: toolbarId,
            app: app,
            debug: debug
        });

        subscribe(app, debug);

        treatmentDetails.init(app);
        totals.init(app);

        debug('init');
    };


})();