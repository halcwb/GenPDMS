/**
 * ## Patient Details
 * @module views/components/patientDetails
 */

/*global webix, $$, _ */

(function () {
    "use strict";


    //region --- IDENTIFIERS AND NAMES ---

    var id = 'patientDetails',
        editBtn = id + ".edit",
        reviewBtn = id + ".review",
        tabViewId = id + '.tabs',

        name = "views:components:patientDetails";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    var reviewTip = 'Add or remove treatment according to patient signs and available protocols';

    //endregion

    //region --- CHILD VIEWS ---

    var form        = require('./../forms/patient.js'),
        indications = require('./../lists/indication.js'),
        treatment   = require('./../lists/treatment.js');

    //endregion

    //region --- VIEW ---

    var getView = function (app) {

        return { id: id, rows: [
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
                                            id: editBtn,
                                            value: 'Edit',
                                            tooltip: 'Edit orders',
                                            width: 75
                                        },
                                        {
                                            view: 'button',
                                            id: reviewBtn,
                                            value: 'Review',
                                            tooltip: reviewTip,
                                            width: 75
                                        }
                                    ]
                                }                            ]
                        }
                    }
                ]
            }
        ]};
    };

    //endregion

    //region --- HELPER FUNCTIONS ---

    var enableToolbars = function (id, enable) {
            _.forEach($$(id).getChildViews(), function (el) {
                if (el.name !== "button") return;

                if (enable) el.enable();
                else el.disable();
            });
        },
        enableTreatmentBar   = _.partial(enableToolbars, treatment.getId() + ".toolbar"),
        enableIndicationsBar = _.partial(enableToolbars, indications.getId() + ".toolbar");

    //endregion

    //region --- SUBSCRIBE ---

    /*
     // Subscribe to View
     */

    /*
     Subscribe to Model
     */

    /*
     Subscribe to Controller
     */
    var subscribeController = function (app, debug) {
        var sub = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        debug("subscribe to controller");

        sub(msg.ui.ready, function () {
            // no patient is selected so treatment buttons don't work
            enableTreatmentBar(false);
            // no patient is selected so indication buttons don't work
            enableIndicationsBar(false);
        });

        sub(msg.patient.select, function () {
            // patient is selected so treatment buttons work
            enableTreatmentBar(true);
            // patient is selected so indication buttons work
            enableIndicationsBar(true);
        });

        sub(msg.patient.new, function () {
            // patient is selected so treatment buttons work
            enableTreatmentBar(true);
            // patient is selected so indication buttons work
            enableIndicationsBar(true);

        });
    };

    /*
     Subscribe All
     */
    var subscribeOnce = _.once(subscribeController);

    //endregion

    //region --- PUBLISH ---

    var publish = function (app, debug, publish) {
        var msg = app.msg,
            tabs = {};

        debug("publish");

        tabs['tab.' + indications.getId()] = 'indications';
        tabs['tab.' + treatment.getId()] = 'treatment';

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

        $$(editBtn).attachEvent("onItemClick", function () {
            var treatData = $$(treatment.getId()).data.getRange(),
                patData   = $$(form.getId()).getValues();

                publish(msg.treatment.edit, {
                patient: patData,
                treatment: treatData
            });
        });

        $$(reviewBtn).attachEvent("onItemClick", function () {
            publish(msg.treatment.review, {});
        });

    };

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
        var pub  = _.partial(app.bus.view.publish, debug);

        form.init(app);
        indications.init(app);
        treatment.init(app);

        publish(app, debug, pub);
        subscribeOnce(app, debug);
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
        var view = getView(app);
        app.debug(name)(view);
        return view;
    };

    /**
     * #### Initializes the view
     *
     * - Create subscriptions for the view
     * - Add publish handlers to view events
     *
     * @param {object} app The application namespace
     */
    exports.init = function (app) {
        var deb = app.debug(name);
        deb("init");
        init(app, deb);
    };

    //endregion


})();