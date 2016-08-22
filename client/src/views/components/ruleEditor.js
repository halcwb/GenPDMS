/**
 * viewws/components/ruleEditor
 */


/*global $$ */

(function () {
    "use strict";

    exports.getView = function (app) {
        var view = {
            id: 'rule_editor_component',
            rows: [{
                id: 'rule_editor',
                template: ''
            },{
                view: 'toolbar',
                height: 40,
                cols: [
                    { template: '' },
                    { view: 'button', id: 'ruleEditor.back.button', value: 'Back', width: 75 },
                    { view: 'button', value: 'Add Rule', width: 75 }
                ]
            }]
        };

        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:views:components:ruleEditor');

        $$('ruleEditor.back.button').attachEvent('onItemClick', function () {
            debug('publish');
            app.bus.view.publish('ruleEditor.back', {});
        });
    };

})();