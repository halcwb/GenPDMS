/**
 * ## Header bar of the application
 * @module views/bars/header
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'header',
        name = "views:bars:header",
        iconId = id + '.icon';

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    //endregion

    //region --- CHILD VIEWS ---

    //endregion

    //region --- VIEW ---

    var getView = function () {
        return {
            id: id,
            view: 'toolbar',
            elements: [
                {
                    view: 'icon',
                    id: iconId,
                    icon: 'bars'
                },
                { view: 'label', label: 'GenPDMS' }
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

    var publish = function (app, debug) {
        var pub = _.partial(app.bus.view.publish, debug),
            msg = app.msg;

        debug("publish");

        $$(iconId).attachEvent('onItemClick', function () {
            pub(msg.sideMenu.show, {});
        });

        webix.event($$(iconId).getNode(), 'mouseenter', function (e) {
            pub(iconId + '.mouseenter', { e: e });
        });

        webix.event($$(iconId).getNode(), 'mouseleave', function (e) {
            pub(iconId + '.mouseleave', { e: e });
        });
    };

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
        publish(app, debug);
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