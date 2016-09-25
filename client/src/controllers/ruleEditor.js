/**
 * @module controllers/ruleEditor
 */

/*global window, webix, Blockly, $$, _ */

(function () {
    "use strict";

    /*
     Subscribe to View
     */
    var subscribeView = function (app, debug, publish) {
        var subscribe = _.partial(app.bus.view.subscribe, debug),
            msg = app.msg;

        subscribe(msg.ui.ruleEditor, function (data) {
            data.debug = debug;
            publish(msg.ui.ruleEditor, data);
        });
    };

    var subscribe = _.once(function (app, debug) {
        var publish = _.partial(app.bus.controller.publish, debug);
        subscribeView(app, debug, publish);
    });

    exports.init = function (app, debug) {
        subscribe(app, debug);
    };

})();