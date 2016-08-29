/**
 * @module views/lists/treatmentDetail
 */

/*global console, webix, $$, _ */

(function () {

    "use strict";

    var id = 'treatmentDetailList',
        view = {
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
                    width: 100,
                    editor: 'date',
                    format: function (value) { return webix.i18n.dateFormatStr(value); },
                    sort: 'date'
                },
                {
                    id: 'stop',
                    header: 'Stop',
                    width: 100,
                    editor: 'date',
                    format: function (value) { return webix.i18n.dateFormatStr(value); },
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
                    width: 125
                },
                {
                    id: 'freq',
                    header: 'Frequency',
                    width: 100,
                    editor: 'combo',
                    sort: 'string'
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
                    width: 125
                },
                {
                    id: 'rate',
                    header: 'Rate',
                    width: 75,
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
                    width: 125,
                    editor: 'combo'
                }
            ],
            scheme: {
                $group: 'indication'
            },
            data: [],
            on: {
                'onBeforeEditStart': function (item) {
                    var me = this;
                    if (item.row.indexOf('$') !== -1) {
                        me.unselectAll();
                        return false;
                    }
                }
            }
        };

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        app.debug('client:' + id + ':getView')(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init');

        app.bus.controller.subscribe("treatment.edit", function (data, envelope) {
            var treatment = _.each(data.treatment, function (ord) {
                ord.no = ord.id;
            });

            debug(envelope.topic, treatment);

            $$(id).clearAll();
            $$(id).parse(treatment);
        });

        debug('init');
    };


})();