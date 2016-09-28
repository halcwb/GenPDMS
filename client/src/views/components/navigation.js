/**
 * ## Navigation view
 * Navigate between patients and protocols
 * @module views/components/navigation
 */

/*global webix, $$, _, console */

(function () {
    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'navigation',
        name = "views:components:navigation";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    //endregion

    //region --- CHILD VIEWS ---

    var patientList  = require('./../lists/patient'),
        protocolList = require('./../lists/protocol');

    //endregion

    //region --- VIEW ---

    var getView = function (app) {
        return {
            view: 'tabview',
            id: id,
            cells: [{
                header: 'Patients',
                body: {
                    id: 'tab.' + patientList.getId(),
                    rows: [patientList.getView(app)]
                }
            },
                {
                    header: 'Protocols',
                    body: {
                        id: 'tab.' + protocolList.getId(),
                        rows: [ protocolList.getView(app) ]
                    }
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

    /*
     Subscribe All
     */

    //endregion

    //region --- PUBLISH ---

    var publish = function (app, debug) {
        var pub = _.partial(app.bus.view.publish, debug),
            msg = app.msg,
            tabs = {};

        debug("publish");

        tabs['tab.' + patientList.getId()] = 'patients';
        tabs['tab.' + protocolList.getId()] = 'protocols';

        $$(id).getTabbar().attachEvent('onBeforeTabClick', function (tabId) {
            pub(msg.ui.detailsBody, {
                item: tabs[tabId]
            });

            // Re-attach events to the tabbar tabs
            app.util.publishTabEnter({
                tabs: ['tab.patientList', 'tab.protocolList'],
                app: app,
                debug: debug
            });
        });

        app.util.publishTabEnter({
            tabs: ['tab.patientList', 'tab.protocolList'],
            app: app,
            debug: debug
        });
    };

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {

        patientList.init(app);
        protocolList.init(app);

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
        var view = getView(app);
        app.debug(name)(view);
        return view;
    };

    /**
     * #### Initializes the view
     *
     * - Create subscriptions for the view
     * - Add publish handlers to view events
     * - Initialize child views
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