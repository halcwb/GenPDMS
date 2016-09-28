/**
 * ## Indicatino Controller
 * @module controllers/indication
 */

/*global webix, _ */

(function () {

    "use strict";

    //region --- VARIABLES ---

    var name = "controllers:indication";

    //endregion

    //region --- HELPER FUNCTIONS ---

    //endregion

    //region --- SUBSCRIBE ---

    var subscribeView = function (app, debug, publish) {
        var sub = _.partial(app.bus.view.subscribe, debug),
            msg = app.msg;

        // Add an indication to the list of medications
        sub(msg.indication.add, function (data, envelope) {
            var msg = 'Not implemented yet:</br>' +
                envelope.topic + '</br>' +
                'will add or indications';

            webix.message(msg);
        });

        // For the selected patient publish the indications
        sub(msg.patient.select, function (data) {
            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    publish(msg.patient.indications, {
                        indications: resp.result.indications
                    });
                },

                fail = function (err) {
                    debug(err);
                };

            app.loading(true);
            post(succ, fail, "indications", { id: data.patient.id });
            app.loading(false);

        });
    };

    var subscribeOnce = _.once(subscribeView);

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
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