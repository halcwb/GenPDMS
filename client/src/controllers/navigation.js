/**
 * controllers/navigation
 */

/*global webix, $$ */

(function () {
    "use strict";

    exports.init  = function (app) {
        var patientDetails = require('./../views/components/patientDetails.js'),
            protocolDetails = require('./../views/components/protocolDetails.js'),

            debug = app.debug('client:controllers:navigation');

        app.bus.view.subscribe('navigation.tabclick', function (data, envelope) {
            debug(envelope);

            if (data.id === 'tabview_protocols' && $$(patientDetails.id())) {
                webix.ui(protocolDetails.view(app), $$(patientDetails.id()));
                protocolDetails.init(app);
            } else if (data.id === 'tabview_patients' && $$(protocolDetails.id())) {
                debug('patient details', patientDetails);
                webix.ui(patientDetails.view(app), $$(protocolDetails.id()));
            }

        });

    };

})();