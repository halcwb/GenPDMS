/**
 * views/components/navigation
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'navigation',
        patientList = require('./../lists/patient'),
        protocolList = require('./../lists/protocol');

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        var view = {
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

        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init'),
            bus = app.bus,
            msg = app.msg,
            tabs = {};

        tabs['tab.' + patientList.getId()] = 'patients';
        tabs['tab.' + protocolList.getId()] = 'protocols';

        patientList.init(app);
        protocolList.init(app);

        $$(id).getTabbar().attachEvent('onBeforeTabClick', function (tabId) {
            debug('publish', tabs[tabId]);

            bus.view.publish(msg.ui.detailsBody, {
                item: tabs[tabId]
            });
        });

        app.util.publishTabEnter({
            tabs: ['tab.patientList', 'tab.protocolList'],
            app: app,
            debug: debug
        });

        debug('init');
    };

})();