/**
 * ## Patient Details
 * @module views/components/patientDetails
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var form        = require('./../forms/patient.js'),
        indications = require('./../lists/indication.js'),
        treatment   = require('./../lists/treatment.js');

    var id = 'patientDetails',
        name = "views:components:patientDetails",
        tabViewId = id + 'tabs';

    var reviewTip = 'Add or remove treatment according to patient signs and available protocols';

    /*
     Helper Functions
     */
    var enableToolbars = function (id, enable) {
        _.forEach($$(id).getChildViews(), function (el) {
            if (el.name !== "button") return;

            if (enable) el.enable();
            else el.disable();
        });
    },
        enableTreatmentBar   = _.partial(enableToolbars, treatment.getId() + ".toolbar"),
        enableIndicationsBar = _.partial(enableToolbars, indications.getId() + ".toolbar");

    /*
     Subscribe to Controller
     */
    var subscribe = _.once(function (app, debug) {
        var subscribe = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        subscribe(msg.ui.ready, function () {
            // no patient is selected so treatment buttons don't work
            enableTreatmentBar(false);
            // no patient is selected so indication buttons don't work
            enableIndicationsBar(false);
        });

        subscribe(msg.patient.select, function () {
            // patient is selected so treatment buttons work
            enableTreatmentBar(true);
            // patient is selected so indication buttons work
            enableIndicationsBar(true);
        });

        subscribe(msg.patient.new, function () {
            // patient is selected so treatment buttons work
            enableTreatmentBar(true);
            // patient is selected so indication buttons work
            enableIndicationsBar(true);

        });

    });

    /*
     Initialize
     */
    var init = function (app) {
        var debug = app.debug(name),
            publish = _.partial(app.bus.view.publish, debug),
            tabs = {};

        debug('init');

        tabs['tab.' + indications.getId()] = 'indications';
        tabs['tab.' + treatment.getId()] = 'treatment';

        form.init(app);
        indications.init(app);
        treatment.init(app);

        $$(tabViewId).getTabbar().attachEvent('onBeforeTabClick', function (tabId) {
            publish(id + '.tabclick', {
                tab: tabs[tabId]
            });

            // hack, reattach events to tabs
            app.util.publishTabEnter({
                tabs: _.keys(tabs),
                app: app,
                debug: debug
            });

        });

        app.util.publishTabEnter({
            tabs: _.keys(tabs),
            app: app,
            debug: debug
        });

        subscribe(app, debug);
    };

    /**
     * #### Get the view id
     * @returns {string}
     */
    exports.getId = function () { return id; };

    /**
     * #### Get the view config
     * @param {object} app The application namespace
     * @returns {object}
     */
    exports.getView = function (app) {
        var debug = app.debug(name),
            publish = _.partial(app.bus.view.publish, debug),
            msg = app.msg,

            view = { id: id, rows: [
            _.extend(form.getView(app), { type: 'space' }),
            {
                view: 'tabview',
                id: tabViewId,
                cells: [{
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
                                            var treatData = $$(treatment.getId()).data.getRange(),
                                                patData   = $$(form.getId()).getValues();

                                            publish(msg.treatment.edit, {
                                                patient: patData,
                                                treatment: treatData
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
                                            publish(msg.treatment.review, {});
                                        }
                                    }
                                ]
                            }                            ]
                        }
                    }
                ]
            }
        ]};

        debug(view);
        return view;
    };

    /**
     * #### Initialize the view
     * @param {object} app The application namespace
     */
    exports.init = function (app) { init(app); };


})();