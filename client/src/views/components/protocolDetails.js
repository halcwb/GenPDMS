/**
 * components/protocolDetails
 */

/*global webix, $$ */

(function () {
    "use strict";

    var id = 'protocol_details';

    exports.getId = function () { return id; };

    exports.getView = function (app) {
       var labelWidth = 100,
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
                   id: 'list_protocol_orders',
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
                       { view: 'button', id: 'protocol.details.ruleEditor', value: 'Rule Editor', width: 100 },
                       { view: 'button', value: 'Add', width: 75 }
                   ]
               }
           ]
       };

       return view;
    };

    exports.init = function (app) {

        if (!$$('rule_editor_menu')) {
            webix.ui({
                view: 'contextmenu',
                id: 'rule_editor_menu',
                data: [
                    'Create Indication'
                ]
            }).attachTo($$('protocol_details'));
        }

        $$('protocol.details.ruleEditor').attachEvent('onItemClick', function () {
            app.bus.view.publish('protocol.ruleEditor', {

            });
        });

    };


})();