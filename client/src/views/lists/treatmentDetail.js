/**
 * @module views/lists/treatmentDetail
 */

/*global console */

(function () {

    "use strict";

    var id = 'treatmentDetailList',
        toolbarId = id + '.toolbar',
        view = {
            rows: [
                {
                    template: 'Patient: #name# Birth date: #dob# Weight: #weight# ',
                    id: id + '.header',
                    height: 40,
                    data: {
                        name: 'Test Patient',
                        dob: '12-Mar-1956',
                        weight: '70 kg'
                    }
                },
                {
                    view: 'treetable',
                    id: id,
                    resizeColumn: true,
                    select: 'row',
                    editable: true,
                    columns: [
                        {
                            id: 'no',
                            header: 'Id',
                            width: 30,
                            sort: 'string'
                        },
                        {
                            id: 'orderable',
                            header: 'Orderable',
                            fillspace: true,
                            sort: 'string',
                            template: function (obj, common) {
                                console.log(obj, common);
                                if (obj.$level === 1) return common.treetable(obj, common) + obj.value;
                                return obj.orderable;
                            }
                        },
                        {
                            id: 'freq',
                            header: 'Frequency',
                            width: 100,
                            sort: 'string'
                        },
                        {
                            id: 'qty',
                            header: 'Quantity',
                            width: 75,
                            sort: 'string'
                        },
                        {
                            id: 'qtyUnit',
                            header: 'Unit',
                            width: 100,
                            sort: 'string'
                        },
                        {
                            id: 'rate',
                            header: 'Rate',
                            width: 75,
                            sort: 'string'
                        },
                        {
                            id: 'rateUnit',
                            header: 'Unit',
                            width: 100,
                            sort: 'string'
                        },
                        {
                            id: 'dose',
                            header: 'Dose',
                            width: 75,
                            sort: 'string'
                        },
                        {
                            id: 'doseUnit',
                            header: 'Unit',
                            width: 100,
                            sort: 'string'
                        }
                    ],
                    scheme: {
                        $group: 'indication'
                    },
                    data: [
                        { id: '1', no: '1', indication: 'Pain', orderable: 'paracetamol 500 mg tabl', freq: '3 x dd', qty: 500, qtyUnit: 'mg', dose: 60, doseUnit: 'mg/kg/day' },
                        { id: '2', no: '2', indication: 'Pain', orderable: 'morfine 200 mg/50 ml', rate: 2.5, rateUnit: 'ml/hour', dose: 5, doseUnit: 'mcg/kg/hour' },
                        { id: '3', no: '3', indication: 'Low Blood Pressure', orderable: 'dopamine' }
                    ]
                },
                {
                    view: 'toolbar',
                    id: toolbarId,
                    height: 40,
                    cols: [
                        { template: '' },
                        {
                            view: 'button',
                            id: id + '.back',
                            value: 'Back',
                            tooltip: 'Return to the main stream',
                            width: 75
                        },
                        {
                            view: 'button',
                            id: id + '.sign',
                            value: 'Sign',
                            tooltip: 'Sign treatment to be administered',
                            width: 75
                        }
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