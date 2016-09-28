/**
 * ## Show a list of patients
 * @module views/lists/patient
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'patientList',
        name = "views:lists:patient";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    //endregion

    //region --- CHILD VIEWS ---

    //endregion

    //region --- VIEW ---

    var getView = function () {
        return {
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
    };

    //endregion

    //region --- HELPER FUNCTIONS ---

    //endregion

    //region --- SUBSCRIBE ---

    /*
     // Subscribe to View
     */
    var subscribeView = function (app, debug) {
        var sub = _.partial(app.bus.view.subscribe, debug),
            msg = app.msg;

        debug("subscribe to view");

        // Make sure patient is selected
        sub(msg.patient.select, function (data) {
            $$(id).select(data.patient.id);
        });
    };


    /*
     Subscribe to Model
     */

    /*
     Subscribe to Controller
     */
    var subscribeController = function (app, debug) {
        var sub = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        debug("subscribe to controller");

        // Display the list of patients
        sub(msg.patient.get, function (data) {
            var view = $$(id);

            // Clear the list
            view.clearAll();
            // Add the new list of patients
            // and calculate full name for each patient
            view.data.importData(_.each(data.patients, function (pat) {
                pat.name = pat.lname + ", " + pat.fname;
            }));
        });
    };

    /*
     Subscribe All
     */
    var subscribeOnce = _.once(function (app, debug) {
        subscribeController(app, debug);
        subscribeView(app, debug);
    });

    //endregion

    //region --- PUBLISH ---

    var publish = function (app, debug, publish) {
        var msg = app.msg;

        debug("publish");

        $$(id).attachEvent('onItemClick', function (item) {

            publish(msg.patient.select, {
                patient : $$(id).data.getItem(item.row)
            });
        });

        // Trigger the retrieval of all patients
        (function () {
            publish(msg.patient.get, {});
        })();
    };

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
        var pub = _.partial(app.bus.view.publish, debug);

        webix.ui({
            view: 'contextmenu',
            data: [
                'Add',
                'Remove'
            ]
        }).attachTo($$(id));

        subscribeOnce(app, debug);

        publish(app, debug, pub);
    };

    //endregion

    //region --- EXPORT ---

    /**
     * #### Get the view id
     * @returns {string} Id of the view
     */
    exports.getId = function () { return id; };

    /**
     * #### Get the view config
     * @param {object} app The application namespace
     * @returns {object} webix view config
     */
    exports.getView = function (app) {
        var view = getView();
        app.debug(name)(view);
        return view;
    };

    /**
     * #### Initializes the view
     *
     * - Create subscriptions for the view
     * - Add publish handlers to view events
     *
     * @param {object} app The application namespace
     */
    exports.init = function (app) {
        var deb = app.debug(name);
        deb("init");
        init(app, deb);
    };

    //endregion

})();