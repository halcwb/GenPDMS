/**
 * ## Navigation Controller
 * @module controllers/navigation
 */

/*global webix, $$, _ */

(function () {

    "use strict";

    //region --- VARIABLES ---

    var name = "controllers:navigation";

    //endregion

    //region --- HELPER FUNCTIONS ---

    //endregion

    //region --- SUBSCRIBE ---

    var subscribeToView = function (app, debug, publish) {
        var subscribe = _.partial(app.bus.view.subscribe, debug),
            msg = app.msg;

        subscribe(msg.ui.detailsBody, function (data) {
            if (data.item === 'protocols') {
                publish(msg.ui.detailsBody, { item: "protocol" });

            } else if (data.item === 'patients') {
                publish(msg.ui.detailsBody, { item: "patient" });
            }
        });
    };

    var subscribeOnce = _.once(subscribeToView);

    //endregion

    //region --- INITIALIZE ---

    var init  = function (app, debug) {
        var pub = _.partial(app.bus.controller.publish, debug);

        subscribeOnce(app, debug, pub);
    };

    //endregion

    //region --- EXPORT ---

    /**
     * #### Initializes the controller
     * Create subscriptions for the controller
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