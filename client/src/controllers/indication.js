/**
 * @module controllers/indication
 */

/*global webix, $$ */

(function () {
    "use strict";


    exports.init = function (app) {
        var debug = app.debug('client:controllers:indication:init');

        app.bus.view.subscribe('indicationList.add', function (data, envelope) {
            var msg = 'Not implemented yet:</br>' +
                envelope.topic + '</br>' +
                'will add or indications';

            debug(envelope.topic, data);

            webix.message(msg);
        });

        debug('init');
    };


})();