/**
 * module controllers/tooltip
 */

/* global webix, $$, _, clearTimeout */

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
                    // calculate x pos
                    uiWidth  = $$('ui').getNode().clientWidth,
                    tipWidth = 200,
                    totWidth = data.e.clientX + tipWidth,
                    x = totWidth > uiWidth ? (data.e.clientX - tipWidth) : data.e.clientX,
                    // calculate y pos
                    uiHeight  = $$('ui').getNode().clientHeight,
                    tipHeight = 200,
                    totHeight = data.e.clientY + tipHeight,
                    y = totHeight > uiHeight ? (data.e.clientY - tipHeight) : data.e.clientY;
                
                
                    $$('tooltip').show({ text: text }, { x: x, y: y });
            };

            debug(envelope);

            app.tooltip = _.delay(showTooltip, 1000);
        });


        app.bus.view.subscribe('*.*.mouseleave', function (data, envelope) {
            debug(envelope);

            clearTimeout(app.tooltip);
            $$(tooltipId).hide();
        });

    };

})();