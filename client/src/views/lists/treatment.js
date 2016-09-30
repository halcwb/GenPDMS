/**
 * ## List with patient treatment
 * @module views/lists/treatment
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'treatmentList',
        name = "views:lists:treatment";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    //endregion

    //region --- CHILD VIEWS ---

    //endregion

    //region --- VIEW ---

    var getView = function () {
        return {
            rows: [
                {
                    view: 'datatable',
                    id: id,
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
                    data: []
                }
            ]
        };
    };

    //endregion

    //region --- HELPER FUNCTIONS ---

    //endregion

    //region --- SUBSCRIBE ---

    var subscribeToController = function (app, debug) {
        var sub = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        debug("subscribe to controller");

        sub(msg.patient.treatment, function (data) {
            $$(id).data.importData(data.treatment);
        });

        sub(msg.patient.get, function () {
            $$(id).clearAll();
        });

        sub(msg.patient.new, function () {
            $$(id).clearAll();
        });
    };

    var subscribeOnce = _.once(subscribeToController);

    //endregion

    //region --- PUBLISH ---


    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
        subscribeOnce(app, debug);
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