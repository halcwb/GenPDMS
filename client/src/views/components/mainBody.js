/**
 * ## Main body view of the application
 * Contains two child views:
 *
 * - A details body and
 * - A treatment body
 *
 * @module views/components/mainBody
 */

/*global $$, _ */

(function () {

    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'mainBody',
        name = "views:components:mainBody";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    //endregion

    //region --- CHILD VIEWS ---

    var detailBody = require('./detailsBody.js'),
        treatBody  = require("./treatmentBody.js");

    //endregion

    //region --- VIEW ---

    var getView = function (app) {
        return {
            id: id,
            view: "multiview",
            cells: [
                detailBody.getView(app),
                treatBody.getView(app)
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
            msg = app.msg,

            show = {
                details:   $$(detailBody.getId()),
                treatment: $$(treatBody.getId()),
            };

        debug("subscribe to controller");

        sub(msg.ui.mainBody, function (data) {
            show[data.item].show();
        });
    };

    /*
     Subscribe All
     */
    var subscribeOnce = _.once(subscribeToController);

    //endregion

    //region --- PUBLISH ---


    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {

        detailBody.init(app);
        treatBody.init(app);

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