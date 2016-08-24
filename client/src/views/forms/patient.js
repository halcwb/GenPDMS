/**
 * views/forms/patient
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'patientForm';

    var labelWidth = 100;

    var view = {
        view: 'form',
        id: id,
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
                        {
                            view: 'button',
                            id: id + '.new',
                            value: 'New',
                            tooltip: 'Add a new patient',
                            width: 75
                        },
                        {
                            view: 'button',
                            id: id + '.edit',
                            value: 'Edit',
                            type: 'form',
                            tooltip: 'Start editing patient details',
                            width: 75
                        },
                        {
                            view: 'button',
                            id: id + '.save',
                            value: 'Save',
                            tooltip: 'Save patient details',
                            width: 75
                        }
                    ]
                }
            ]}
        ]
    };

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        app.debug('client:' + id + ':view')(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id);

        app.util.publishButton({
            id: id,
            app: app,
            debug: debug
        });

        debug('init');
    };

})();