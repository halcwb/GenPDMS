/**
 * @module controllers/treatment
 */

/*global webix, $$ */

(function () {
    "use strict";


    exports.init = function (app) {
        var treatmentBody = require('./../views/components/treatmentBody.js'),
            patientBody   = require('./../views/components/patientBody.js'),
            debug = app.debug('client:controllers:treatment:init');

        app.bus.view.subscribe('treatmentList.review', function (data, envelope) {
            var msg = 'Not implemented yet:</br>' +
                envelope.topic + '</br>' +
                'will add or remove orders according to protocols';

            debug(envelope.topic, data);

            webix.message(msg);
        });


        app.bus.view.subscribe('treatmentList.edit', function (data, envelope) {
            debug(envelope);

            webix.ui(treatmentBody.getView(app), $$(patientBody.getId()));
            treatmentBody.init(app);
        });

        app.bus.view.subscribe('treatmentDetailList.back', function (data, envelope) {
            debug(envelope);

            webix.ui(patientBody.getView(app), $$(treatmentBody.getId()));
            patientBody.init(app);
        });


        debug('init');
    };



})();