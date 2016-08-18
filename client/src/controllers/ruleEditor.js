/**
 * controllers/ruleEditor
 */

/*global window, webix, $$, console */

(function () {
    "use strict";

    exports.init = function (app) {
        var ruleEditor = require('./../views/components/ruleEditor.js'),
            debug = app.debug('client:controllers:rule');

        app.bus.view.subscribe('rule.editor', function (data, envelope) {
            debug(envelope);

            webix.ui(ruleEditor.view(app), $$('body'));


            window.Blockly = app.blockly({

                // This is where the iframed resizable Blockly will be embedded.
                container: $$("rule_editor").getNode(),

                // Make the default set of blocks available, with English translations.
                // (you can choose other translations like "create-blockly/Msg/zh_tw")
                extensions: [
                    app.blockly.blocks, // Blockly.Blocks
                    app.blockly.translations
                ],

                // This is the toolbox that defines which blocks are visible.
                // http://code.google.com/p/blockly/wiki/Toolbox
                toolbox: document.getElementById("rule_editor_toolbox")

            });

            // Whenever this Blockly editor changes, log the generated Javscript code.
            // More Blockly documentation at http://code.google.com/p/blockly/w/list
            window.Blockly.addChangeListener(function() {
                var xml = window.Blockly.Xml.workspaceToText();
                console.log(xml);
            });

        });
    };

})();