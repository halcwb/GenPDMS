/**
 * controllers/ruleEditor
 */

/*global window, webix, Blockly, $$, console */

(function () {
    "use strict";

    exports.init = function (app) {
        var ruleEditor = require('./../views/components/ruleEditor.js'),
            debug = app.debug('client:controllers:rule');

        app.bus.view.subscribe('rule.editor', function (data, envelope) {
            debug(envelope);

            webix.ui(ruleEditor.view(app), $$('body'));
            $$('rule_editor').getNode().id = 'rule_editor';

            var workspace = Blockly.inject('rule_editor', {
                toolbox: document.getElementById('rule_editor_toolbox')
            });


        });
    };

})();