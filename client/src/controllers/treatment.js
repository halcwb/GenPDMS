/**
 * @module controllers/treatment
 */

/*global webix, $$ */

(function () {
    "use strict";


    exports.init = function (app) {
        var debug = app.debug('client:controllers:treatment:init');

        app.bus.view.subscribe('treatmentList.review', function (data, envelope) {
            var msg = 'Not implemented yet:</br>' +
                envelope.topic + '</br>' +
                'will add or remove orders according to protocols';

            debug(envelope.topic, data);

            webix.message(msg);
        });

        debug('init');
    };


})();