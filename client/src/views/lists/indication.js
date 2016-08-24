/**
 * @module views/lists/indication
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'indicationList',
        toolbarId = id + '.toolbar',
        addTip = 'Add an indication',
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
                    id: toolbarId,
                    height: 40,
                    cols: [
                        { template: '' },
                        { view: 'button', id: id + '.add', value: 'Add', tooltip: addTip, width: 75 }
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

        app.util.publishButton({
            id: toolbarId,
            app: app,
            debug: debug
        });

        debug('init');
    };


})();