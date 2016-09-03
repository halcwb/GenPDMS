/**
 * @module views/lists/totals
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'totalsList',

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
                            id: 'item',
                            header: 'Item',
                            fillspace: true,
                            sort: 'string'
                        },
                        {
                            id: 'qty',
                            header: 'Quantity',
                            fillspace: true,
                            sort: 'string'
                        },
                        {
                            id: 'qtyUnit',
                            header: 'Unit',
                            fillspace: true,
                            sort: 'combo'
                        },
                        {
                            id: 'minQty',
                            header: 'Norm Min',
                            fillspace: true,
                            sort: 'string'
                        },
                        {
                            id: 'maxQty',
                            header: 'Norm Max',
                            fillspace: true,
                            sort: 'string'
                        },
                        {
                            id: 'normUnit',
                            header: 'Unit',
                            fillspace: true,
                            sort: 'combo'
                        },
                        {
                            id: 'labQty',
                            header: 'Lab',
                            fillspace: true,
                            sort: 'string'
                        },
                        {
                            id: 'labUnit',
                            header: 'Unit',
                            fillspace: true,
                            sort: 'string'
                        }
                    ],
                    data: []
                }
            ]
        },

        subscribe = _.once(function (app, debug) {

            app.bus.controller.subscribe("patient.totals", function (data, envelope) {
                debug(envelope.topic, data);

                $$(id).data.importData(data.totals);
            });
        });

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        app.debug('client:' + id + ':getView')(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init');


        subscribe(app, debug);

        debug('init');
    };


})();