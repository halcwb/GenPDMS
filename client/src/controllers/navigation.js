/**
 * controllers/navigation
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    /*
     Subscribe to View
     */
    var subscribeView = _.once(function (app, debug, publish) {
        var subscribe = _.partial(app.bus.view.subscribe, debug),
            msg = app.msg;

        subscribe(msg.ui.detailsBody, function (data) {
            if (data.item === 'protocols') {
                publish(msg.ui.detailsBody, { item: "protocol" });

            } else if (data.item === 'patients') {
                publish(msg.ui.detailsBody, { item: "patient" });
            }
        });

    });

    exports.init  = function (app, debug) {
        var publish = _.partial(app.bus.controller.publish, debug);

        subscribeView(app, debug, publish);
    };

})();