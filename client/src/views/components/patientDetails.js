/**
 * views/components/details
 */

(function () {
    "use strict";

    var id = 'patient_details';

    exports.id = function () { return id; };

    exports.view = function (app) {
        var labelWidth = 100,
            view = { id: id, rows: [
            {
                view: 'form',
                id: 'form_patient_details',
                elements: [
                    { rows: [
                        { template: 'Patient Details', type: 'section' },
                        {
                            view: "text",
                            label: 'Id',
                            placeholder: 'Hospital Number',
                            name: 'no',
                            labelAlign: 'right',
                            labelWidth: labelWidth
                        },
                        {
                            view: "text",
                            label: 'Last Name',
                            placeholder: 'First Name',
                            name: 'fname',
                            labelAlign: 'right',
                            labelWidth: labelWidth
                        },
                        {
                            view: "text",
                            label: 'First Name',
                            placeholder: 'Last Name',
                            name: 'lname',
                            labelAlign: 'right',
                            labelWidth: labelWidth
                        },
                        {
                            view: "datepicker",
                            label: 'Birth date',
                            placeholder: 'Patient Birth Date',
                            name: 'dob',
                            labelAlign: 'right',
                            labelWidth: labelWidth
                        },
                        { template: '', height: 20 },
                        {
                            cols: [
                                { template: '' },
                                { view: 'button', value: 'New', width: 75},
                                { view: 'button', value: 'Edit', type: 'form', width: 75},
                                { view: 'button', value: 'Save', width: 75 }
                            ]
                        }
                    ]}
                ]
            },
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

})();