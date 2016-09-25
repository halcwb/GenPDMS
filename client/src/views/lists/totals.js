/**
 * @module views/lists/totals
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'totalsList',
        name = "views:lists:totals";

    var view = {
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
    };

    /*
     Subscribe to Controllers
     */
    var subscribe = _.once(function (app, debug) {
        var subscribe = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        subscribe(msg.patient.totals, function (data) {
            $$(id).data.importData(data.totals);
        });
    });

    /*
     Initialize view
     */
    var init = function (app) {
        var debug = app.debug(name);

        debug('init');

        subscribe(app, debug);
    };

    /**
     * #### Get the view id
     * @returns {string}
     */
    exports.getId = function () { return id; };

    /**
     * Get the view
     * @param app
     * @returns {object}
     */
    exports.getView = function (app) {
        app.debug(name)(view);
        return view;
    };

    /**
     * Initialize the view
     * @param {object} app The application namespace
     */
    exports.init = function (app) { init(app); };


})();