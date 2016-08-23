/**
 * views/components/details
 */

/*global webix, $$ */

(function () {
    "use strict";

    var form = require('./../forms/patient.js'),
        indications = require('./../lists/indication.js'),
        orders = require('./../lists/order.js'),
        id = 'patientDetails',
        tabViewId = id + 'tabs';

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        var view = { id: id, rows: [
            form.getView(app),
            { view: 'resizer' },
            {
                view: 'tabview',
                id: tabViewId,
                cells: [
                    {
                        header: 'Indications',
                        body: {
                            id: 'tab.' + indications.getId(),
                            rows: [indications.getView(app)]
                        }
                    },
                    {
                        header: 'Treatment',
                        body: {
                            id: 'tab.' + orders.getId(),
                            rows: [orders.getView(app)]
                        }
                    }
                ]
            }
        ]};

        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init'),
            tabs = {};

        tabs['tab.' + indications.getId()] = 'indications';
        tabs['tab.' + orders.getId()] = 'orders';

        form.init(app);
        indications.init(app);

        $$(tabViewId).getTabbar().attachEvent('onBeforeTabClick', function (tabId) {
            app.bus.view.publish(id + '.tabclick', {
                tab: tabs[tabId]
            });
        });

        debug('init');
    };


})();