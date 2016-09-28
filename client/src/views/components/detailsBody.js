/**
 * ## The general details body of the application
 * @module views/components/detailsBody
 */

/*global $$, _ */

(function () {
    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'detailsBody',
        name = "views:components:detailsBody";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    var goldenRatio = (1 + Math.sqrt(5))/2;

    //endregion

    //region --- CHILD VIEWS ---

    var navigation      = require('./navigation.js'),
        patientDetails  = require('./patientDetails.js'),
        protocolDetails = require("./protocolDetails.js");

        //endregion

    //region --- VIEW ---

    var getView = function (app) {
        return {
            id: id,
            cols: [
                _.extend(navigation.getView(app), { gravity: 1/goldenRatio }),
                { view: 'resizer' },
                {
                    view: "multiview", cells: [
                    patientDetails.getView(app),
                    protocolDetails.getView(app)
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
    var subscribeController = function (app, debug) {
        var sub = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg,
            item = {
                patient: patientDetails.getId(),
                protocol: protocolDetails.getId()
            };

        debug("subscribe to controller");

        sub(msg.ui.detailsBody, function (data) {
            $$(item[data.item]).show();
        });
    };

    /*
     Subscribe All
     */
    var subscribeOnce = _.once(subscribeController);

    //endregion

    //region --- PUBLISH ---


    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {

        navigation.init(app);
        patientDetails.init(app);
        protocolDetails.init(app);

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
     * - Initialize child views
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