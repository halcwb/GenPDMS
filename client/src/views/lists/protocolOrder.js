/**
 * @module lists/protocolOrder
 */

/*global webix, $$ */

(function () {
    "use strict";

    var id = 'protocolOrderList',
        toolbarId = id + '.toolbar';

    exports.getId = function () { return id; };

    exports.getView = function (app) {
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

        app.debug('client:' + id + ':getView')(view);
        return view;
    };

    exports.init = function (app) {
        var bus = app.bus,
            msg = app.msg,
            debug = app.debug('client:' + id + ':init');

        if (!$$(id)) {
            webix.ui({
                view: 'contextmenu',
                data: [
                    'Create Indication'
                ]
            }).attachTo($$(id));
        }

        $$(id + ".ruleEditor").attachEvent("onItemClick", function () {
            bus.view.publish(msg.ui.ruleEditor, {
                editor: true
            });
        });

        debug('init');
    };

})();