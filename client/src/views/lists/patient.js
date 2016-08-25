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
                { id: '1', no: '1', name: 'John Cedar', dob: new Date('3/11/1967') },
                { id: '2', no: '2', name: 'Frederick Maple', dob: new Date('12/03/1986') },
                { id: '3', no: '3', name: 'Christine Damian', dob: new Date('5/07/1992') },
                { id: '4', no: '4', name: 'Eric Underwood', dob: new Date('9/30/1975') }
            ]
        };

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        app.debug('client:' + id)(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init');

        webix.ui({
            view: 'contextmenu',
            data: [
                'Add',
                'Remove'
            ]
        }).attachTo($$(id));

        $$(id).attachEvent('onItemClick', function (item) {
            var evt = id + '.onItemClick',
                data = { item: $$(id).data.getItem(item.row) };

            debug(evt, data);
            app.bus.view.publish(evt, data);
        });

        debug('init');
    };


})();