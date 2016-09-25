/**
 * @module views/lists/protocolOrder
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'protocolOrderList',
        name = "views:lists:protocolOrder",
        toolbarId = id + '.toolbar';

    /*
     View
     */
    var view = {
        rows: [
            {
                view: 'datatable',
                id: id,
                resizeColumn: true,
                select: 'row',
                columns: [
                    { id: 'id', header: 'Id', width: 40 },
                    { id: 'indication', header: 'Indication', width: 200 },
                    { id: 'contra', header: 'Contra Indication', width: 200 },
                    { id: 'order', header: 'Order', fillspace: true }
                ],
                data: []
            },
            {
                view: 'toolbar',
                id: toolbarId,
                height: 40,
                cols: [
                    { template: '' },
                    {
                        view: 'button',
                        id: id + '.ruleEditor',
                        value: 'Rule Editor',
                        tooltip: 'Open the rule editor',
                        width: 100
                    },
                    {
                        view: 'button',
                        id: id + '.add',
                        value: 'Add',
                        tooltip: 'Add a new protocol item',
                        width: 75
                    }
                ]
            }
        ]
    };


    /*
     Subscribe
     */

    /*
     Initialize
     */
    var init = function (app) {
        var debug = app.debug(name),
            publish = _.partial(app.bus.view.publish, debug),
            msg = app.msg;

        debug('init');

        if (!$$(id)) {
            webix.ui({
                view: 'contextmenu',
                data: [
                    'Create Indication'
                ]
            }).attachTo($$(id));
        }

        $$(id + ".ruleEditor").attachEvent("onItemClick", function () {
            publish(msg.ui.ruleEditor, {
                editor: true
            });
        });
    };

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        app.debug(name)(view);
        return view;
    };

    exports.init = function (app) { init(app); };

})();