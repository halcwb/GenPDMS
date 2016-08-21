/**
 * module controllers/tooltip
 */

/* global $$ */

(function () {

    "use strict";

    exports.init = function (app) {
        var tooltipId = 'windows.tooltip',
            debug = app.debug('client:controllers:tooltip');


        app.bus.view.subscribe('*.*.mouseleave', function (data, envelope) {
            debug(envelope);

            $$(tooltipId).hide();

        });

    };

})();