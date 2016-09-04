/**
 * module controllers/tooltip
 */

/* global webix, $$, _, clearTimeout */

(function () {

    "use strict";

    var tooltips = {
        'header.icon': '<b>GenPDMS side menu</b></br>Show or hide the GenPDMS side menu',
        'tab.patientList': '<b>Available patients</b> </br>Select a patient to edit or treat',
        'tab.protocolList': '<b>Available protocols</b> </br>Select a protocol to edit',
        'tab.indicationList': '<b>List of patient indications</b> </br>When a patient has an indication this triggers a protocol',
        'tab.treatmentList': '<b>Running ordes</b> </br>Orders and indications are evaluated according to protocols'
    };

    exports.init = function (app, debug) {
        var tooltipId = 'tooltip';

        app.bus.view.subscribe('*.*.mouseenter', function (data, envelope) {
            var showTooltip = function () {
                var item = envelope.topic.replace('.mouseenter', ''),
                    text = tooltips[item] ? tooltips[item] : item,
                    // calculate x pos
                    uiWidth  = $$('ui').getNode().clientWidth,
                    tipWidth = 200,
                    totWidth = data.e.clientX + tipWidth,
                    x = totWidth > uiWidth ? (data.e.clientX - tipWidth) : data.e.clientX,
                    // calculate y pos
                    uiHeight  = $$('ui').getNode().clientHeight,
                    tipHeight = 100,
                    totHeight = data.e.clientY + tipHeight,
                    y = totHeight > uiHeight ? (data.e.clientY - tipHeight) : data.e.clientY;


                $$('tooltip').show({ text: text }, { x: x, y: y });
            };

            debug(envelope);

            app.tooltip = _.delay(showTooltip, 1000);
            _.delay(function () {
                clearTimeout(app.tooltip);
                $$(tooltipId).hide();
            }, 5000);

        });


        app.bus.view.subscribe('*.*.mouseleave', function (data, envelope) {
            debug(envelope);

            clearTimeout(app.tooltip);
            $$(tooltipId).hide();
        });

    };

})();