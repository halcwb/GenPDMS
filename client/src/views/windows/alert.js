/**
 * ## Alert window
 * @module views/windows/alert
 */

/*global webix, _ */

(function () {

    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'alert',
        name = "views:windows:alert";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    //endregion

    //region --- CHILD VIEWS ---

    //endregion

    //region --- VIEW ---

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
    var subscribeToController = function (app, debug, publish) {
        var sub = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        sub(msg.alert.show, function (data) {
            var text = '';

            if (data.text) {
                text = data.text.substr(0, data.length || 200);
                if (text.length < data.text.length) {
                    text = text + '...';
                }

                webix.alert({
                    id: id,
                    title: data.title,
                    text: text,
                    type: data.type,
                    callback: function () {
                        publish(msg.alert.ok, { text: text });
                    }
                });

            }
        });
    };

    /*
     Subscribe All
     */
    var subscribeOnce = _.once(subscribeToController);

    //endregion

    //region --- PUBLISH ---


    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
        var pub = _.partial(app.bus.view.publish, debug);

        subscribeOnce(app, debug, pub);
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
        var view = {};
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