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
        },

        subscribe = _.once(function (app, debug) {

            app.bus.controller.subscribe(app.msg.patient.patients, function (data, envelope) {
                debug(envelope.topic, data);

                $$(id).clearAll();
                $$(id).data.importData(_.each(data.pats, function (pat) {
                    pat.name = pat.lname + " " + pat.fname;
                }));
            });
        });

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        app.debug('client:' + id)(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init'),
            bus = app.bus.view,
            msg = app.msg;

        webix.ui({
            view: 'contextmenu',
            data: [
                'Add',
                'Remove'
            ]
        }).attachTo($$(id));

        $$(id).attachEvent('onItemClick', function (item) {
            var data = { item: $$(id).data.getItem(item.row) };

            debug(msg.patient.patient, data);
            app.bus.view.publish(msg.patient.patient, data);
        });

        subscribe(app, debug);

        bus.publish(msg.patient.patients, {});

        debug('init');
    };


})();