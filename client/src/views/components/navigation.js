/**
 * views/components/navigation
 */

/*global $$ */

(function () {
    "use strict";

    exports.view = function (app) {
        var view = {
            view: 'tabview',
            id: 'navigation',
            cells: [
                {
                    header: 'Patients',
                    body:
                    { id: 'tabview_patients', rows: [
                        {
                            view: 'datatable',
                            id: 'list_patient',
                            resizeColumn: true,
                            select: 'row',
                            columns: [
                                { id: 'no', header: 'HospNo', sort: 'string' },
                                { id: 'name', header: 'Name', fillspace: true, sort: 'string' }
                            ],
                            data: [
                                { id: '1', no: '1', name: 'John Cedar' },
                                { id: '2', no: '2', name: 'Frederick Maple' },
                                { id: '3', no: '3', name: 'Christine Damian' },
                                { id: '4', no: '4', name: 'Eric Underwood' }
                            ]
                        }
                    ]}
                },
                {
                    header: 'Protocols',
                    body: {
                        id: 'tabview_protocols',
                        rows: [
                            {
                                view: 'datatable',
                                id: 'list_protocols',
                                resizeColumn: true,
                                select: 'row',
                                columns: [
                                    { id: 'id', header: 'Id', sort: 'string' },
                                    { id: 'name', header: 'Name', fillspace: true, sort: 'string' }
                                ],
                                data: [
                                    { id: '1', name: 'Pain' },
                                    { id: '2', name: 'Blood Pressure' }
                                ]
                            }
                        ]}
                }
            ]
        };

        return view;
    };

    exports.init = function (app) {

        $$('navigation').getTabbar().attachEvent('onBeforeTabClick', function (id) {
            app.bus.view.publish('navigation.tabclick', {
                id: id
            });
        });
    };

})();