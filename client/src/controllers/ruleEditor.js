/**
 * controllers/ruleEditor
 */

/*global window, webix, Blockly, $$, console */

(function () {
    "use strict";

    exports.init = function (app) {
        var bus = app.bus,
            msg = app.msg,
            debug = app.debug('client:controllers:rule');

        app.bus.view.subscribe(msg.ui.ruleEditor, function (data, envelope) {
            debug(envelope.topic, data);

            bus.controller.publish(msg.ui.ruleEditor, data);
        });

    };

})();