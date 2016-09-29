/**
 * ## Treatment editor view
 * @module views/components/treatmentBody
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'treatmentBody',
        name = "views:components:treatmentBody",
        toolbarId = id + '.toolbar';

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    //endregion

    //region --- CHILD VIEWS ---

    var treatmentDetails = require('./../lists/treatmentDetail.js'),
        totals           = require("./../lists/totals.js");

    //endregion

    //region --- VIEW ---

    var getView = function (app) {
        return {
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
    };

    //endregion

    //region --- HELPER FUNCTIONS ---

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
    var subscribeToController = function (app, debug) {
        var sub = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        debug("subscribe to controller");

        sub(msg.treatment.edit, function (data) {
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
    };


    /*
     Subscribe All
     */
    var subscribeOnce = _.once(subscribeToController);

    //endregion

    //region --- PUBLISH ---

    var publish = function (app, debug, publish) {
        var msg = app.msg;

        debug("publish");

        $$(id + ".back").attachEvent("onItemClick", function () {
            publish(msg.ui.mainBody, {
                item: "details"
            });
        });
    };

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
        var pub = _.partial(app.bus.view.publish, debug);

        treatmentDetails.init(app);
        totals.init(app);

        subscribeOnce(app, debug);
        publish(app, debug, pub);
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