/**
 * module controllers/tooltip
 */

/* global webix, $$, _ */

(function () {

    "use strict";

    var tooltips = {
        'patientForm.new.mouseenter': 'Add a new patient'
    };

    exports.init = function (app) {
        var tooltipId = 'tooltip',
            debug = app.debug('client:controllers:tooltip');

        app.bus.view.subscribe('*.*.mouseenter', function (data, envelope) {
            var showTooltip = function () {
                var text = tooltips[envelope.topic] ? tooltips[envelope.topic] : envelope.topic,
                    uiWidth  = $$('ui').getNode().clientWidth,
                    tipWidth = 0,
                    totWidth = 0,
                    x = 0;


                if (app.tooltip) {
                    $$('tooltip').show({ text: text }, { x: data.e.clientX, y: data.e.clientY });
                    tipWidth = $$('tooltip').getNode().clientX;
                    totWidth = data.e.clientX + $$('tooltip').config.width;
                    x = totWidth > uiWidth ? (data.e.clientX - tipWidth) : data.e.clientX;

                    debug(uiWidth, tipWidth, data.e.clientX, totWidth, x);

                    $$('tooltip').getNode().clientX = x;
                }
            };

            debug(envelope);

            app.tooltip = true;
            _.delay(showTooltip, 1000);
        });


        app.bus.view.subscribe('*.*.mouseleave', function (data, envelope) {
            debug(envelope);

            app.tooltip = false;
            $$(tooltipId).hide();

        });

    };

})();