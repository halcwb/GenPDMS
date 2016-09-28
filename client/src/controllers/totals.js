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

    var subscribeView = function (app, debug, publish) {
        var subscribe = _.partial(app.bus.view.subscribe, debug),
            msg = app.msg;

        subscribe(msg.treatment.totals, function (data) {
            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    publish(msg.patient.totals, {
                        totals: resp.result.totals
                    });
                },

                fail = function (err) {
                    debug(err);
                };


            app.loading(true);
            post(succ, fail, "totals", { id: data.id });
            app.loading(false);

        });
    };

    var subscribeOnce = _.once(subscribeView);

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
        var publish = _.partial(app.bus.controller.publish, debug);
        subscribeView(app, debug, publish);
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