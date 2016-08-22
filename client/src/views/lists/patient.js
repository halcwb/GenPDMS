/**
 * views/lists/patient
 */

/*global webix, $$ */

(function () {
    "use strict";

    var id = 'patientList',
        view = {
            view: 'datatable',
            id: id,
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
        };

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        app.debug('client:' + id)(view);
        return view;
    };

    exports.init = function (app) {
        webix.ui({
            view: 'contextmenu',
            data: [
                'Add',
                'Remove'
            ]
        }).attachTo($$(id));
    };


})();