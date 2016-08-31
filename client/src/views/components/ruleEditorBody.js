/**
 * viewws/components/ruleEditor
 */


/*global webix, $$, _ */

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
        };

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        app.debug('client:' + id + '.getView')(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:views:components:ruleEditor');

        app.util.publishButton({
            id: toolbarId,
            app: app,
            debug: debug
        });

        debug('init');
    };

})();