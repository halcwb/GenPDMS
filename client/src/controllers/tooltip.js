/**
 * ## Tooltip Controller
 * @module controllers/tooltip
 */

/* global webix, $$, _, clearTimeout */

(function () {

    "use strict";

    //region --- VARIABLES ---

    var name = "controllers:tooltip";

    var tooltips = {
        'header.icon': '<b>GenPDMS side menu</b></br>Show or hide the GenPDMS side menu',
        'tab.patientList': '<b>Available patients</b> </br>Select a patient to edit or treat',
        'tab.protocolList': '<b>Available protocols</b> </br>Select a protocol to edit',
        'tab.indicationList': '<b>List of patient indications</b> </br>When a patient has an indication this triggers a protocol',
        'tab.treatmentList': '<b>Running ordes</b> </br>Orders and indications are evaluated according to protocols'
    };

    //endregion

    //region --- HELPER FUNCTIONS ---

    //endregion

    //region --- SUBSCRIBE ---

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

    var subscribeOnce = _.once(subscribeView);

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
        var pub = _.partial(app.bus.controller.publish, debug);
        subscribeOnce(app, debug, pub);
    };

    //endregion

    //region --- EXPORT ---

    /**
     * #### Initializes the controller
     * Create subscriptions for the controller
     *
     * @param {object} app The application namespace
     */
    exports.init = function (app) {
        var deb = app.debug(name);
        deb("init");
        init(app, deb);
    };

    //endregion

})();