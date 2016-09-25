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

    /*
     Subscribe to View
     */
    var subscribeView = function (app, debug, publish) {
        var subscribe = _.partial(app.bus.view.subscribe, debug),
            msg = app.msg;

        subscribe('*.*.mouseenter', function (data, envelope) {
            publish(msg.ui.tooltip, {
                tooltip: true,
                clientX: data.e.clientX,
                clientY: data.e.clientY,
                text: tooltips[envelope.topic.replace(".mouseenter", "")]
            });
        });

        subscribe('*.*.mouseleave', function () {
            publish(msg.ui.tooltip, { tooltip: false });
        });

    };

    /*
     Subscribe
     */
    var subscribe = _.once(function (app, debug) {
        var publish = _.partial(app.bus.controller.publish, debug);

        subscribeView(app, debug, publish);
    });

    exports.init = function (app, debug) {
        subscribe(app, debug);
    };

})();