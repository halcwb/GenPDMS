/**
 * @module views/lists/treatment
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'treatmentList',

        subscribe = _.once(function (app, debug) {
            var bus = app.bus.controller,
                msg = app.msg;

            bus.subscribe(msg.patient.treatment, function (data, envelope) {
                debug(envelope.topic, data);

                $$(id).data.importData(data.treatment);
            });
        });

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        var debug = app.debug("client:" + id),

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
                    }
                ]
            };

        debug(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init');

        subscribe(app, debug);

        debug('init');
    };

})();