/**
 * controllers/ruleEditor
 */

/*global window, webix, Blockly, $$, console */

(function () {
    "use strict";

    exports.init = function (app) {
        var patientBody = require('./../views/components/patientBody.js'),
            ruleEditor = require('./../views/components/ruleEditor.js'),
            debug = app.debug('client:controllers:rule');

        app.bus.view.subscribe('protocol.ruleEditor', function (data, envelope) {
            debug(envelope);

            webix.ui(ruleEditor.view(app), $$('patient_body'));
            ruleEditor.init(app);
            $$('rule_editor').getNode().id = 'rule_editor';

            var workspace = Blockly.inject('rule_editor', {
                toolbox: document.getElementById('rule_editor_toolbox')
            });

            workspace.addChangeListener(function () {
                var xml = Blockly.Xml.workspaceToDom(workspace);
                app.bus.controller.publish('ruleEditor.rule', {
                    rule: (Blockly.Xml.domToText(xml))
                });
            });

        });

        app.bus.view.subscribe('ruleEditor.back', function (data, envelope) {
            debug(envelope);

            webix.ui(patientBody.view(app), $$('rule_editor_component'));
            var el = document.getElementsByClassName('blocklyToolboxDiv')[0];
            el.parentNode.removeChild(el);
            patientBody.init(app);
        });
    };

})();