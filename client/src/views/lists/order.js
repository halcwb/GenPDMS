/**
 * @module views/lists/order
 */

/*global webix, $$ */

(function () {
    "use strict";

    var id = 'orderList',
        reviewButtonId = id + '.reviewButton',
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
                    height: 40,
                    cols: [
                        { template: '' },
                        { view: 'button', id: reviewButtonId, value: 'Review', width: 75 }
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

        $$(reviewButtonId).attachEvent('onItemClick', function () {
            app.bus.view.publish(reviewButtonId + '.click', {
                btn: $$(reviewButtonId)
            });
        });

        debug('init');
    };

})();