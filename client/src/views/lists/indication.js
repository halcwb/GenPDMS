/**
 * @module views/lists/indication
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'indicationList',
        addButtonId = id + '.addButton',
        view = {
            rows: [
                {
                    view: 'datatable',
                    id: id,
                    resizeColumn: true,
                    select: 'row',
                    editable: true,
                    columns: [
                        {
                            id: 'sign',
                            header: 'Signs',
                            fillspace: true,
                            sort: 'string'
                        },
                        {
                            id: 'value',
                            header: 'Value'
                        },
                        {
                            id: 'unit',
                            header: 'Unit'
                        }
                    ],
                    data: [
                        { id: '1', sign: 'Pain Score', value: '3', unit: '' },
                        { id: '2', sign: 'Mean Blood Pressure', value:  '80', unit: 'mmHg' }
                    ]
                },
                {
                    view: 'toolbar',
                    id: id + '.toolbar',
                    height: 40,
                    cols: [
                        { template: '' },
                        { view: 'button', id: addButtonId, value: 'Add', width: 75 }
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

        _.forEach($$(id + '.toolbar').getNode().querySelectorAll('[class="webix_view webix_control webix_el_button"]'), function (el) {
            var btnId = el.getAttribute('view_id'),
                btnEvt = btnId;

            $$(btnId).attachEvent('onItemClick', function () {
                var evt = btnEvt + '.click';
                debug('onItemClick', btnId);
                app.bus.view.publish(evt, {btn: $$(btnId)});
            });

            webix.event($$(btnId).getInputNode(), 'mouseenter', function (e) {
                var evt = btnEvt + '.mouseenter';
                debug(evt);
                app.bus.view.publish(evt, {e: e});
            });

            webix.event($$(btnId).getInputNode(), 'mouseleave', function (e) {
                var evt = btnEvt + '.mouseleave';
                debug(evt);
                app.bus.view.publish(evt, {e: e});
            });

        });

        debug('init');
    };


})();