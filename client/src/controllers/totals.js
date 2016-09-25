/**
 * @module controllers/totals
 */

/*global _ */

(function () {
    "use strict";

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

    var subscribe = _.once(function (app, debug) {
        var publish = _.partial(app.bus.controller.publish, debug);
        subscribeView(app, debug, publish);
    });

    exports.init = function (app, debug) {
        subscribe(app, debug);
    };

})();