/**
 * components/protocolDetails
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'protocolDetails',
        protocolOrderListId = 'protocolOrderList',
        protocolOrderListToolbarId = protocolOrderListId + 'toolbar',
        labelWidth = 100,
        view  = {
            id: id,
            rows: [
                {
                    view: 'form',
                    elements: [
                        { rows: [
                            { template: 'Protocol Details', type: 'section' },
                            {
                                view: "text",
                                label: 'Id',
                                placeholder: 'Id',
                                name: 'id',
                                labelAlign: 'right',
                                labelWidth: labelWidth
                            },
                            {
                                view: "text",
                                label: 'Name',
                                placeholder: 'Protocol Name',
                                name: 'name',
                                labelAlign: 'right',
                                labelWidth: labelWidth
                            },
                            { template: '', height: 20 },
                            {
                                cols: [
                                    { template: '' },
                                    {
                                        view: 'button',
                                        id: id + '.new',
                                        value: 'New',
                                        width: 75
                                    },
                                    {
                                        view: 'button',
                                        id: id + '.edit',
                                        value: 'Edit',
                                        type: 'form',
                                        width: 75
                                    },
                                    {
                                        view: 'button',
                                        id: id + '.save',
                                        value: 'Save',
                                        width: 75
                                    }
                                ]
                            }
                        ]}
                    ]
                },
                {
                    view: 'datatable',
                    id: protocolOrderListId,
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
                    id: protocolOrderListToolbarId,
                    height: 40,
                    cols: [
                        { template: '' },
                        {
                            view: 'button',
                            id: protocolOrderListId + '.ruleEditor',
                            value: 'Rule Editor',
                            width: 100
                        },
                        {
                            view: 'button',
                            id: protocolOrderListId + '.add',
                            value: 'Add',
                            width: 75
                        }
                    ]
                }
            ]
        };


    exports.getId = function () { return id; };

    exports.getView = function (app) {
        app.debug('client:' + id + ':getView')(view);

       return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init');

        if (!$$(id)) {
            webix.ui({
                view: 'contextmenu',
                data: [
                    'Create Indication'
                ]
            }).attachTo($$(protocolOrderListId));
        }

        app.util.publishButton({
            id: id,
            app: app,
            debug: debug
        });


        debug('init');
    };


})();