/**
 * views/components/details
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var form        = require('./../forms/patient.js'),
        indications = require('./../lists/indication.js'),
        treatment   = require('./../lists/treatment.js'),

        id = 'patientDetails',
        tabViewId = id + 'tabs',

        reviewTip = 'Add or remove treatment according to patient signs and available protocols';


    exports.getId = function () { return id; };

    exports.getView = function (app) {
        var debug = app.debug("client:" + id),
            bus = app.bus.view,
            msg = app.msg,

            view = { id: id, rows: [
            _.extend(form.getView(app), { type: 'space' }),
            {
                view: 'tabview',
                id: tabViewId,
                cells: [
                    {
                        header: 'Indications',
                        body: {
                            id: 'tab.' + indications.getId(),
                            rows: [
                                indications.getView(app)
                            ]
                        }
                    },
                    {
                        header: 'Treatment',
                        body: {
                            id: 'tab.' + treatment.getId(),
                            rows: [
                                treatment.getView(app),
                                {
                                    view: 'toolbar',
                                    id: treatment.getId() + ".toolbar",
                                    height: 40,
                                    cols: [
                                        { template: '' },
                                        {
                                            view: 'button',
                                            id: id + "." + msg.treatment.edit,
                                            value: 'Edit',
                                            tooltip: 'Edit orders',
                                            width: 75,
                                            click: function () {
                                                var treatment = $$('treatmentList').data.getRange(),
                                                    patient   = $$("patientForm").getValues();

                                                bus.publish(msg.treatment.edit, {
                                                    patient: patient,
                                                    treatment: treatment
                                                });
                                            }
                                        },
                                        {
                                            view: 'button',
                                            id: id + "." + msg.treatment.review,
                                            value: 'Review',
                                            tooltip: reviewTip,
                                            width: 75,
                                            click: function () {
                                                bus.publish(msg.treatment.review, {

                                                });
                                            }
                                        }
                                    ]
                                }                            ]
                        }
                    }
                ]
            }
        ]};

        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init'),
            tabs = {};

        tabs['tab.' + indications.getId()] = 'indications';
        tabs['tab.' + treatment.getId()] = 'treatment';

        form.init(app);
        indications.init(app);
        treatment.init(app);

        $$(tabViewId).getTabbar().attachEvent('onBeforeTabClick', function (tabId) {
            app.bus.view.publish(id + '.tabclick', {
                tab: tabs[tabId]
            });
        });

        app.util.publishTabEnter({
            tabs: _.keys(tabs),
            app: app,
            debug: debug
        });

        debug('init');
    };


})();