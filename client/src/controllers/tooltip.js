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
        var bus = app.bus,
            msg = app.msg;

        bus.view.subscribe('*.*.mouseenter', function (data, envelope) {
            debug(envelope.topic, data);

            bus.controller.publish(msg.ui.tooltip, {
                tooltip: true,
                clientX: data.e.clientX,
                clientY: data.e.clientY,
                text: tooltips[envelope.topic.replace(".mouseenter", "")]
            });

        });


        bus.view.subscribe('*.*.mouseleave', function (data, envelope) {
            debug(envelope.topic, data);
            bus.controller.publish(msg.ui.tooltip, { tooltip: false });
        });

    };

})();