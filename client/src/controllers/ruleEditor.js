/**
 * controllers/ruleEditor
 */

/*global window, webix, Blockly, $$, console */

(function () {
    "use strict";

    var body   = require('./../views/components/body.js'),
        editor = require('./../views/components/ruleEditorBody.js');

    exports.init = function (app) {
        var debug = app.debug('client:controllers:rule');

        app.bus.view.subscribe('protocolOrderList.ruleEditor', function (data, envelope) {
            debug(envelope);

            webix.ui(editor.getView(app), $$(body.getId()));
            editor.init(app);

            /*
            $$('ruleEditor').getNode().id = ruleEditorNode;

            var workspace = Blockly.inject(ruleEditorNode, {
                toolbox: document.getElementById('rule_editor_toolbox')
            });

            workspace.addChangeListener(function () {
                var xml = Blockly.Xml.workspaceToDom(workspace);
                app.bus.controller.publish('ruleEditor.rule', {
                    rule: (Blockly.Xml.domToText(xml))
                });
            });
            */

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