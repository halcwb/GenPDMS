/**
 * components/protocolDetails
 */

/*global webix, $$ */

(function () {
    "use strict";

    var id = 'protocolDetails',
        protocolListId = 'protocolOrderList',
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
                                    { view: 'button', value: 'New', width: 75},
                                    { view: 'button', value: 'Edit', type: 'form', width: 75},
                                    { view: 'button', value: 'Save', width: 75 }
                                ]
                            }
                        ]}
                    ]
                },
                {
                    view: 'datatable',
                    id: protocolListId,
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
                    height: 40,
                    cols: [
                        { template: '' },
                        { view: 'button', id: id +  '.ruleEditorButton', value: 'Rule Editor', width: 100 },
                        { view: 'button', value: 'Add', width: 75 }
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
        var debug = app.debug('client:' + id + ':init'),
            ruleEditorBtn = id + '.ruleEditorButton';

        if (!$$(id)) {
            webix.ui({
                view: 'contextmenu',
                data: [
                    'Create Indication'
                ]
            }).attachTo($$(protocolListId));
        }

        $$(ruleEditorBtn).attachEvent('onItemClick', function () {
            var evt = ruleEditorBtn + '.click';
            debug(evt);
            app.bus.view.publish(evt, {});
        });

        debug('init');
    };


})();