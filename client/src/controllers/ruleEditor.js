/**
 * controllers/ruleEditor
 */

/*global window, webix, Blockly, $$, console */

(function () {
    "use strict";

    var body   = require('./../views/components/mainBody.js'),
        editor = require('./../views/components/ruleEditorBody.js');

    exports.init = function (app) {
        var debug = app.debug('client:controllers:rule');

        app.bus.view.subscribe('protocolOrderList.ruleEditor', function (data, envelope) {
            debug(envelope);

            webix.ui(editor.getView(app), $$(body.getId()));
            editor.init(app);

        });

        app.bus.view.subscribe('ruleEditor.back', function (data, envelope) {
            debug(envelope);

            webix.ui(body.getView(app), $$(editor.getId()));
            var el = document.getElementsByClassName('blocklyToolboxDiv')[0];
            el.parentNode.removeChild(el);
            body.init(app);
        });
    };

})();