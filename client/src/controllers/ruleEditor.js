/**
 * ## Rule Editor Controller
 * @module controllers/ruleEditor
 */

/*global window, webix, Blockly, $$, _ */

(function () {

    "use strict";

    //region --- VARIABLES ---

    var name = "controllers:ruleEditor";

    //endregion

    //region --- HELPER FUNCTIONS ---

    //endregion

    //region --- SUBSCRIBE ---

    var subscribeToView = function (app, debug, publish) {
        var subscribe = _.partial(app.bus.view.subscribe, debug),
            msg = app.msg;

        subscribe(msg.ui.ruleEditor, function (data) {
            publish(msg.ui.ruleEditor, data);
        });
    };

    var subscribeOnce = _.once(subscribeToView);

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