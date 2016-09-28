/**
 * @module views/lists/protocol
 */

/*global webix, $$ */

(function () {
    "use strict";


    //region --- IDENTIFIERS AND NAMES ---

    var id = 'protocolList',
        name = "views:lists:protocol";

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
               { id: 'id', header: 'Id', sort: 'string' },
               { id: 'name', header: 'Name', fillspace: true, sort: 'string' }
           ],
           data: [
               { id: '1', name: 'Pain' },
               { id: '2', name: 'Blood Pressure' }
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

    /*
     Subscribe All
     */

    //endregion

    //region --- PUBLISH ---


    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {

        webix.ui({
            view: 'contextmenu',
            data: [
                'Add',
                'Remove'
            ]
        }).attachTo($$(id));

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