/**
 * @module viewws/components/ruleEditor
 */


/*global webix, $$, _, Blockly */

(function () {
    "use strict";

    var id = 'ruleEditorBody',
        name = "views:components:ruleEditorBody",
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

    /**
     * ### Get the View Id
     * @returns {string} The view Id
     */
    exports.getId = function () { return id; };


    /**
     * ### Get the view config
     * @param {object} app The application namespace
     * @returns {object} The view config
      */
    exports.getView = function (app) {
        app.debug(name)(view);
        return view;
    };

    /**
     * ### Initalize the View
     * Note that this function must be able to run
     * multiple times as the rule editor body is destroyed
     * @param {object} app The application namespace
     */
    exports.init = function (app) {
        var debug = app.debug(name),
            publish = _.partial(app.bus.view.publish, debug),
            msg = app.msg;

        debug("init");

        $$('ruleEditor').getNode().id = ruleEditorNode;

        var workspace = Blockly.inject(ruleEditorNode, {
            toolbox: document.getElementById('rule_editor_toolbox')
        });

        workspace.addChangeListener(function () {
            var xml = Blockly.Xml.workspaceToDom(workspace);
            publish('ruleEditor.rule', {
                rule: (Blockly.Xml.domToText(xml))
            });
        });

        $$("ruleEditor.back").attachEvent("onItemClick", function () {
            publish(msg.ui.ruleEditor, {
                editor: false
            });
        });
    };

})();