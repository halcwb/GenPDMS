/**
 * @module views/lists/treatment
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'treatmentList',
        treatmentToolbarId = id + '.toolbar',
        reviewTip = 'Add or remove treatment according to patient signs and available protocols',
        view = {
            rows: [
                {
                    view: 'datatable',
                    id: id,
                    resizeColumn: true,
                    select: 'row',
                    columns: [
                        { id: 'id', header: 'Id', sort: 'string' },
                        {
                            id: 'order',
                            header: 'Order',
                            fillspace: true,
                            sort: 'string'
                        }
                    ],
                    data: [
                        { id: '1', order: 'Dopamin' },
                        { id: '2', order: 'Paracetamol' },
                        { id: '3', order: 'Morfine' }
                    ]
                },
                {
                    view: 'toolbar',
                    id: treatmentToolbarId,
                    height: 40,
                    cols: [
                        { template: '' },
                        { view: 'button', id: id + '.review', value: 'Review', tooltip: reviewTip, width: 75 }
                    ]
                }
            ]
        };

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        app.debug('client:' + id + ':getView');
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init');

        app.util.publishButton({
            id: treatmentToolbarId,
            app: app,
            debug: debug
        });

        debug('init');
    };

})();