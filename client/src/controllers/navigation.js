/**
 * controllers/navigation
 */

/*global webix, $$ */

(function () {
    "use strict";

    exports.init  = function (app, debug) {
        var bus = app.bus,
            msg = app.msg;

        bus.view.subscribe(msg.ui.detailsBody, function (data, envelope) {
            debug(envelope.topic, data);

            if (data.item === 'protocols') {
                bus.controller.publish(msg.ui.detailsBody, { item: "protocol" });

            } else if (data.item === 'patients') {
                bus.controller.publish(msg.ui.detailsBody, { item: "patient" });
            }
        });

    };

})();