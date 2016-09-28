/**
 * ## Loading mask view
 * @module views/windows/loadingMask
 */

/*global webix, $$, _ */

(function () {

    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'loadingMask',
        name = "views:windows:loadingMask";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    //endregion

    //region --- CHILD VIEWS ---

    //endregion

    //region --- VIEW ---

    var getView = function () {
        return {
            id: id,
            view: "window",
            width: 100,
            height: 100,
            modal: true,
            position: "center",
            head: false,
            borderless: true,
            body: {
                template: "<p align='center'><i class='fa fa-spin fa-spinner fa-4x'></i></p>",
                css: "wait"

            }
        };
    };

    //endregion

    //region --- HELPER FUNCTIONS ---

    var doWait = function (loading) {
        var mask = $$(id);

        if (loading) {
            mask.show();
        }
        else {
            mask.hide();
        }
    };

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

    var init = _.once(function (app) {

        // make sure loading mask is not visible
        if (!$$(id)) {
            webix.ui(getView()).hide();
        }

        // make app loading shortcut
        app.loading = doWait;
    });

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

