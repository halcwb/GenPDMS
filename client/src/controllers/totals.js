/**
 * ## Totals Controller
 * @module controllers/totals
 */

/*global _ */

(function () {

    "use strict";

    //region --- VARIABLES ---

    var name = "controllers:totals";

    //endregion

    //region --- HELPER FUNCTIONS ---

    //endregion

    //region --- SUBSCRIBE ---

    var subscribeToServer = function (app, debug, publish) {
        var sub = _.partial(app.bus.server.subscribe, debug),
            msg = app.msg;

        debug("subscribe to server");

        sub(msg.server.success + ".totals", function (resp) {
            publish(msg.patient.totals, {
                totals: resp.result.totals
            });
        });
    };

    var subscribeToController = function (app, debug, publish) {
        var sub = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        debug("subscribe to controller");

        sub(msg.treatment.totals, function (data) {

            publish(msg.server.request, {
                act: "totals",
                qry: {
                    id: data.id
                }
            });

        });
    };

    var subscribeOnce = _.once(function (app, debug, publish) {
        subscribeToServer(app, debug, publish);
        subscribeToController(app, debug, publish);
    });

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
        var publish = _.partial(app.bus.controller.publish, debug);
        subscribeOnce(app, debug, publish);
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