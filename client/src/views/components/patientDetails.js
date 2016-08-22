/**
 * views/components/details
 */

(function () {
    "use strict";

    var form = require('./../forms/patient.js'),
        id = 'patientDetails';

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        var labelWidth = 100,
            view = { id: id, rows: [
            form.getView(app),
            { view: 'resizer' },
            {
                view: 'tabview',
                cells: [
                    {
                        header: 'Indications',
                        body: {
                            rows: [
                                {
                                    view: 'datatable',
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
                                    height: 40,
                                    cols: [
                                        { template: '' },
                                        { view: 'button', value: 'Add', width: 75 }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        header: 'Treatment',
                        body: {
                            rows: [
                                {
                                    view: 'datatable',
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
                                        { view: 'button', value: 'Review', width: 75 }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            }
        ]};

        return view;
    };

    exports.init = function (app) {

        form.init(app);
    };

})();