/**
 * ## Show a list of patients
 * @module views/lists/patient
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'patientList',
        name = "views:lists:patient",

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

    /*
     Subscribe to View
     */
    var subscribeView = function (app, debug) {
        var subscribe = _.partial(app.bus.view.subscribe, debug),
            msg = app.msg;

        // Make sure patient is selected
        subscribe(msg.patient.select, function (data) {
            $$(id).select(data.patient.id);
        });
    };

    /*
     Subscribe to Controller
     */
    var subscribeController = function (app, debug) {
        var subscribe = _.partial(app.bus.controller.subscribe, debug),
            deb = _.partial(debug, "receive"),
            msg = app.msg;

        // Display the list of patients
        subscribe(msg.patient.get, function (data, envelope) {
            var view = $$(id);

            deb(envelope.topic, data);

            // Clear the list
            view.clearAll();
            // Add the new list of patients
            // and calculate full name for each patient
            view.data.importData(_.each(data.patients, function (pat) {
                pat.name = pat.lname + ", " + pat.fname;
            }));
        });
    };

    var subscribe = _.once(function (app, debug) {
        subscribeController(app, debug);
        subscribeView(app, debug);
    });

    /*
     Initialize
     */
    var init = function (app) {
        var debug = app.debug(name),
            publish = _.partial(app.bus.view.publish, debug),
            msg = app.msg;

        debug("init");

        webix.ui({
            view: 'contextmenu',
            data: [
                'Add',
                'Remove'
            ]
        }).attachTo($$(id));

        $$(id).attachEvent('onItemClick', function (item) {

            publish(msg.patient.select, {
                patient : $$(id).data.getItem(item.row)
            });
        });

        subscribe(app, debug);

        // Trigger the retrieval of all patients
        (function () {
            publish(msg.patient.get, {});
        })();
    };

    /**
     * ### Get the id of the view
     * @returns {string}
     */
    exports.getId = function () { return id; };

    /**
     * ### Get the view
     * @param {object} app application namespace
     * @returns {view}
     */
    exports.getView = function (app) {
        app.debug('client:' + id)("getView", view);
        return view;
    };

    /**
     * ### Initializes the view
     * @param {object} app The application namespace
     */
    exports.init = function (app) { init(app); };


})();