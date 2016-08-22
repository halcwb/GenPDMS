/**
 * controllers/ruleEditor
 */

/*global window, webix, Blockly, $$, console */

(function () {
    "use strict";

    var patientBody = require('./../views/components/patientBody.js'),
        ruleEditorBody = require('./../views/components/ruleEditorBody.js'),
        ruleEditorNode = 'rule_editor';

    exports.init = function (app) {
        var debug = app.debug('client:controllers:rule');

        app.bus.view.subscribe('protocolDetails.ruleEditorButton.click', function (data, envelope) {
            debug(envelope);

            webix.ui(ruleEditorBody.getView(app), $$(patientBody.getId()));
            ruleEditorBody.init(app);
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

        });

        app.bus.view.subscribe('ruleEditorBody.backButton.click', function (data, envelope) {
            debug(envelope);

            webix.ui(patientBody.getView(app), $$(ruleEditorBody.getId()));
            var el = document.getElementsByClassName('blocklyToolboxDiv')[0];
            el.parentNode.removeChild(el);
            patientBody.init(app);
        });
    };

})();