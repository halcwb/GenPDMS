/**
 * @module views/components/navigation
 */

/*global webix, $$, _, console */

(function () {
    "use strict";

    var id = 'navigation',
        name = "views:components:navigation",

        patientList = require('./../lists/patient'),
        protocolList = require('./../lists/protocol');

    /**
     * ### Get the view id
     * @returns {string} the view id
     */
    exports.getId = function () { return id; };

    /**
     * ### Get the view config
     * @param app
     * @returns {object} The view config
     */
    exports.getView = function (app) {
        var debug = app.debug(name),
            view = {
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
        ]};

        debug(view);
        return view;
    };

    /**
     * ### Initializes the view
     * @param {object} app The application namespace
     */
    exports.init = function (app) {
        var debug = app.debug(name),
            publish = _.partial(app.bus.view.publish, debug),
            msg = app.msg,
            tabs = {};

        debug('init');

        tabs['tab.' + patientList.getId()] = 'patients';
        tabs['tab.' + protocolList.getId()] = 'protocols';

        patientList.init(app);
        protocolList.init(app);

        $$(id).getTabbar().attachEvent('onBeforeTabClick', function (tabId) {
            publish(msg.ui.detailsBody, {
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

})();