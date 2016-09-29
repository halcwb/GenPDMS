/**
 * ## Side Menu View
 * @module views/menus/sideMenu.
 */

/*global webix, $$, window, _ */

(function () {

    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'sideMenu',
        listId = id + ".list",

        name = "views:menus:sideMenu";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    //endregion

    //region --- CHILD VIEWS ---

    //endregion

    //region --- VIEW ---

    var getView = function (enabled) {
        return {
            id: id,
            view: 'sidemenu',
            width: 200,
            position: 'left',
            state: function(state) {
                var headerHeight = $$('header').$height;
                state.top = headerHeight;
                state.height -= headerHeight;
            },
            body: {
                id: listId,
                view: 'list',
                borderless: true,
                scroll: false,
                template: "<span class='webix_icon fa-#icon#'></span> #setting#: #value#",
                data: [
                    { id: 'server', icon: 'cog', setting: 'server', value: '' },
                    { id: 'debug', icon: 'code', setting: 'debug',  value: enabled }
                ]
            }
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

        sub('set.status', function () {
            var status = app.settings.demo ? 'demo' : 'online';

            $$(id).getBody().updateItem('server', { value: status });
        });

        sub(msg.sideMenu.show, function () {
            var view = $$(id);

            if (view.config.hidden) {
                view.show();
            } else {
                view.hide();
            }
        });
    };

    /*
     Subscribe All
     */
    var subscribeOnce = _.once(subscribeToController);

    //endregion

    //region --- PUBLISH ---

    var publish = function (app, debug, publish) {
        var msg = app.msg;

        debug("publish");

        $$(listId).attachEvent('onItemClick', function (id, e, trg) {
            publish(msg.sideMenu.item, {
                item: id,
                trg: trg
            });
        });
    };

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
        var enabled = window.localStorage.debug === '' ? 'disabled' : 'enabled',
            pub = _.partial(app.bus.view.publish, debug);

        debug("init");

        webix.ui(getView(enabled));

        publish(app, debug, pub);
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