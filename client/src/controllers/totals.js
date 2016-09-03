/**
 * @module controllers/totals
 */

/*global _ */

(function () {
    "use strict";

    exports.init = function (app) {
        var debug = app.debug("client:controllers:totals");

        app.bus.controller.subscribe("treatment.totals", function (data, envelope) {
            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    debug(resp);
                    app.bus.controller.publish("patient.totals", {
                        totals: resp.result.totals
                    });
                },

                fail = function (err) {
                    debug(err);
                };

            debug(envelope.topic, data);

            app.loading(true);
            post(succ, fail, "totals", { id: data.id });
            app.loading(false);

        });

        debug("init");
    };

})();