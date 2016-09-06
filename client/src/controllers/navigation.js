/**
 * controllers/navigation
 */

/*global webix, $$ */

(function () {
    "use strict";

    exports.init  = function (app, debug) {
        var patientDetails  = "patientDetails",
            protocolDetails = "protocolDetails";

        app.bus.view.subscribe('navigation.tabclick', function (data, envelope) {
            debug(envelope);

            if (data.tab === 'protocols') {
                $$(protocolDetails).show();

            } else if (data.tab === 'patients') {
                $$(patientDetails).show();
            }
        });

    };

})();