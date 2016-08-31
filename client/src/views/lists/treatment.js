/**
 * @module views/lists/treatment
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'treatmentList',
        treatmentToolbarId = id + '.toolbar',
        reviewTip = 'Add or remove treatment according to patient signs and available protocols',

        view = {
            rows: [
                {
                    view: 'datatable',
                    id: id,
                    resizeColumn: true,
                    select: 'row',
                    columns: [
                        { id: 'id', header: 'Id', sort: 'string' },
                        {
                            id: 'order',
                            header: 'Order',
                            fillspace: true,
                            sort: 'string'
                        }
                    ],
                    data: []
                },
                {
                    view: 'toolbar',
                    id: treatmentToolbarId,
                    height: 40,
                    cols: [
                        { template: '' },
                        { view: 'button', id: id + '.edit', value: 'Edit', tooltip: 'Edit orders', width: 75 },
                        { view: 'button', id: id + '.review', value: 'Review', tooltip: reviewTip, width: 75 }
                    ]
                }
            ]
        },

        subscribe = _.once(function (app, debug) {
            app.bus.controller.subscribe("patient.treatment", function (data, envelope) {
                debug(envelope.topic, data);

                $$(id).data.importData(data.treatment);
            });
        });

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        app.debug('client:' + id + ':getView');
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init');

        app.util.publishButton({
            id: treatmentToolbarId,
            app: app,
            debug: debug
        });

        subscribe(app, debug);

        debug('init');
    };

})();