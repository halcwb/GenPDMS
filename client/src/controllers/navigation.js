/**
 * controllers/navigation
 */

/*global webix, $$ */

(function () {
    "use strict";

    exports.init  = function (app, debug) {
        var patientDetails = require('./../views/components/patientDetails.js'),
            protocolDetails = require('./../views/components/protocolDetails.js');

        app.bus.view.subscribe('navigation.tabclick', function (data, envelope) {
            debug(envelope);

            if (data.tab === 'protocols' && $$(patientDetails.getId())) {
                webix.ui(protocolDetails.getView(app), $$(patientDetails.getId()));
                protocolDetails.init(app);

            } else if (data.tab === 'patients' && $$(protocolDetails.getId())) {
                debug('patient details', patientDetails);
                webix.ui(patientDetails.getView(app), $$(protocolDetails.getId()));
                patientDetails.init(app);
            }
        });

    };

})();