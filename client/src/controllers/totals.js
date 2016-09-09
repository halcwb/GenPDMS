/**
 * @module controllers/totals
 */

/*global _ */

(function () {
    "use strict";

    exports.init = function (app, debug) {
        var bus = app.bus,
            msg = app.msg;

        bus.controller.subscribe(msg.treatment.totals, function (data, envelope) {
            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    debug(resp);
                    bus.controller.publish(msg.patient.totals, {
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

    };

})();