/**
 * viewws/components/ruleEditor
 */


/*global webix, $$ */

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
        var backBtnEvt = id + '.' + backButtonId,
            addBtnEvt  = id + '.' + addButtonId,
            debug = app.debug('client:views:components:ruleEditor');

        $$(backButtonId).attachEvent('onItemClick', function () {
            var evt = backBtnEvt + '.click';
            debug(evt);
            app.bus.view.publish(evt, {});
        });

        $$(addButtonId).attachEvent('onItemClick', function () {
            var evt = addBtnEvt + '.click';
            debug(evt);
            app.bus.view.publish(evt, {});
        });

        webix.event($$(addButtonId).getInputNode(), 'mouseenter', function (e) {
            var evt = backBtnEvt + '.mouseenter';
            debug(evt);
            app.bus.view.publish(evt, { e: e });
        });

        webix.event($$(addButtonId).getInputNode(), 'mouseleave', function (e) {
            var evt = backBtnEvt + '.mouseleave';
            debug(evt);
            app.bus.view.publish(evt, { e: e });
        });
    };

})();