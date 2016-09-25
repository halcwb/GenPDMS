/**
 * @module views/lists/treatmentDetail
 */

/*global console, webix, $$, _ */

(function () {

    "use strict";

    var id = 'treatmentDetailList',
        name = "views:lists:treatmentDetail";

    var view = {
        view: 'treetable',
        id: id,
        resizeColumn: true,
        select: 'row',
        editable: true,
        columns: [
            {
                id: 'no',
                header: 'Id',
                width: 40,
                sort: 'string'
            },
            {
                id: 'start',
                header: 'Start',
                width: 125,
                editor: 'date',
                format: webix.Date.dateToStr("%d-%M-%y %H:%i"),
                sort: 'date'
            },
            {
                id: 'stop',
                header: 'Stop',
                width: 125,
                editor: 'date',
                format: webix.Date.dateToStr("%d-%M-%y %H:%i"),
                sort: 'date'
            },
            {
                id: 'orderable',
                header: 'Orderable',
                fillspace: true,
                sort: 'string',
                template: function (obj, common) {
                    if (obj.$level === 1) return common.treetable(obj, common) + obj.value;
                    return obj.orderable;
                }
            },
            {
                id: 'route',
                header: 'Route',
                editor: 'combo',
                width: 100
            },
            {
                id: 'freq',
                header: 'Freq',
                width: 60,
                editor: 'combo',
                sort: 'string'
            },
            {
                id: 'freqUnit',
                header: 'Unit',
                editor: 'combo',
                width: 75
            },
            {
                id: 'qty',
                header: 'Quantity',
                width: 75,
                editor: 'text'
            },
            {
                id: 'qtyUnit',
                header: 'Unit',
                editor: 'combo',
                width: 75
            },
            {
                id: 'time',
                header: 'Time',
                width: 60,
                editor: 'text'
            },
            {
                id: 'timeUnit',
                header: 'Unit',
                width: 75,
                editor: 'combo'
            },
            {
                id: 'rate',
                header: 'Rate',
                width: 60,
                editor: 'text'
            },
            {
                id: 'rateUnit',
                header: 'Unit',
                width: 125,
                editor: 'combo'
            },
            {
                id: 'dose',
                header: 'Dose',
                width: 75,
                editor: 'text'
            },
            {
                id: 'doseUnit',
                header: 'Unit',
                width: 100,
                editor: 'combo'
            }
        ],
        scheme: {
            $group: 'indication'
        },
        data: [],
        on: {
            'onBeforeEditStart': function (item) {
                var me = this,
                    order = me.data.getItem(item),
                    column = item.column;

                if (item.row.indexOf('$') !== -1) {
                    me.unselectAll();
                    return false;

                } else if (order.type === "cont" && (column === "freq" ||
                                                     column === "freqUnit" ||
                                                     column === "qty" ||
                                                     column === "qtyUnit" ||
                                                     column === "time" ||
                                                     column === "timeUnit")) {
                    me.unselectAll();
                    return false;

                } else if (order.type === "disc" && (column === "time" ||
                                                     column === "timeUnit" ||
                                                     column === "rate" ||
                                                     column === "rateUnit")) {
                    me.unselectAll();
                    return false;
                } else if (order.type === "proc" && (column === "freq" ||
                                                     column === "freqUnit" ||
                                                     column === "time" ||
                                                     column === "timeUnit" ||
                                                     column === "rate" ||
                                                     column === "rateUnit" ||
                                                     column === "dose" ||
                                                     column === "doseUnit")) {
                    me.unselectAll();
                    return false;
                }
            }
        }
    };

    /*
     Subscribe to Controller
     */
    var subscribe = _.once(function (app, debug) {
        var msg = app.msg;

        app.bus.controller.subscribe(debug, msg.treatment.edit, function (data) {
            var treatment = _.each(data.treatment, function (ord) {
                ord.no = ord.id;
            });

            $$(id).clearAll();
            $$(id).parse(treatment);
        });

    });

    /*
     Initialize the view
     */
    var init = function (app) {
        var debug = app.debug(name);

        debug('init');

        webix.editors.$popup = {
            date: {
                view: "popup",
                body: { view: "calendar", timepicker: true, icons: true }
            }
        };

        subscribe(app, debug);
    };

    /**
     * #### Get the view id
     * @returns {string}
     */
    exports.getId = function () { return id; };

    /**
     * #### Get view config
     * @param {object} app The application namespace
     * @returns {object}
     */
    exports.getView = function (app) {
        app.debug(name)(view);
        return view;
    };

    /**
     * #### Initialize the view
     * @param {object} app The application namespace
     */
    exports.init = function (app) { init(app); };


})();