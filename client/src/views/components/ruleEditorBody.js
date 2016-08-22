/**
 * viewws/components/ruleEditor
 */


/*global $$ */

(function () {
    "use strict";

    var id = 'ruleEditorBody',
        backButtonId = id + '.backButton',
        addButtonId  = id + '.addButton',
        view = {
            id: id,
            rows: [{
                id: 'ruleEditor',
                template: ''
            },{
                view: 'toolbar',
                height: 40,
                cols: [
                    { template: '' },
                    { view: 'button', id: backButtonId, value: 'Back',     width: 75 },
                    { view: 'button', id: addButtonId,  value: 'Add Rule', width: 75 }
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

        $$(backButtonId).attachEvent('onItemClick', function () {
            var evt = backButtonId + '.click';
            debug(evt);
            app.bus.view.publish(evt, {});
        });

        $$(addButtonId).attachEvent('onItemClick', function () {
            var evt = addButtonId + '.click';
            debug(evt);
            app.bus.view.publish(evt, {});
        });
    };

})();