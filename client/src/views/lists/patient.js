/**
 * views/lists/patient
 */

/*global webix, $$, _ */

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
            data: []
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

        app.bus.controller.subscribe("patient.patients", function (data, envelope) {
            debug(envelope.topic, data);

            $$(id).clearAll();
            $$(id).data.importData(_.each(data.pats, function (pat) {
                pat.name = pat.lname + " " + pat.fname;
            }));
        });

        app.bus.view.publish(id + ".init", {});

        debug('init');
    };


})();