/**
 * viewws/components/ruleEditor
 */


/*global webix, $$, _, Blockly */

(function () {
    "use strict";

    var id = 'ruleEditorBody',
        toolbarId = id + '.toolbar',

        view = {
            id: id,
            rows: [{
                id: 'ruleEditor',
                template: ''
            },{
                view: 'toolbar',
                id: toolbarId,
                height: 40,
                cols: [
                    { template: '' },
                    {
                        view: 'button',
                        id: 'ruleEditor.back',
                        value: 'Back',
                        tooltip: 'back to the main window',
                        width: 75
                    },
                    {
                        view: 'button',
                        id: 'ruleEditor.addRule',
                        value: 'Add Rule',
                        tooltip: 'Add the rule to the ruleList',
                        width: 75
                    }
                ]
            }]
        },

        ruleEditorNode = 'rule_editor';


    exports.getId = function () { return id; };


    exports.getView = function (app) {
        app.debug('client:' + id + '.getView')(view);
        return view;
    };


    exports.init = function (app) {
        var bus = app.bus,
            msg = app.msg,
            debug = app.debug('client:views:components:ruleEditor');

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

        $$("ruleEditor.back").attachEvent("onItemClick", function () {
            bus.view.publish(msg.ui.ruleEditor, {
                editor: false
            });
        });

        debug('init');
    };

})();