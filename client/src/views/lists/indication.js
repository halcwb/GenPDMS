/**
 * ## List with patient indications
 * @module views/lists/indication
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'indicationList',
        toolbarId = id + '.toolbar',
        addBtn = id + ".add",

        name = "views:lists:indication";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    var addTip = 'Add an indication';

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
                    editable: true,
                    columns: [
                        {
                            id: 'indication',
                            header: 'Indication',
                            fillspace: true,
                            sort: 'string'
                        }
                    ],
                    data: []
                },
                {
                    view: 'toolbar',
                    id: toolbarId,
                    height: 40,
                    cols: [
                        { template: '' },
                        {
                            view: 'button',
                            id: addBtn,
                            value: 'Add',
                            tooltip: addTip,
                            width: 75
                        }
                    ]
                }
            ]
        };
    };

    //endregion

    //region --- HELPER FUNCTIONS ---

    //endregion

    //region --- SUBSCRIBE ---

    /*
     // Subscribe to View
     */

    /*
     Subscribe to Model
     */

    /*
     Subscribe to Controller
     */
    var subscribeToController = function (app, debug) {
        var sub = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        debug("subscribe to controller");

        sub(msg.patient.indications, function (data) {
            $$(id).data.importData(data.indications);
        });
    };

    /*
     Subscribe All
     */
    var subscribeOnce = _.once(subscribeToController);

    //endregion

    //region --- PUBLISH ---

    var publish = function(app, debug, publish) {
        var msg = app.msg;

        debug("publish");

        $$(addBtn).attachEvent("onItemClick", function () {
            publish(msg.indication.add, {});
        });
    };

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