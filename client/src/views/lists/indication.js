/**
 * @module views/lists/indication
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'indicationList',
        toolbarId = id + '.toolbar',
        addTip = 'Add an indication',

        subscribe = _.once(function (app, debug) {
            var bus = app.bus.controller,
                msg = app.msg;

            bus.subscribe(msg.patient.indications, function (data, envelope) {
                debug(envelope.topic, data);

                $$(id).data.importData(data.indications);
            });
        });

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        var bus = app.bus.view,
            msg = app.msg,

            debug = app.debug("client:views" + id),

            view = {
                rows: [
                    {
                        view: 'datatable',
                        id: id,
                        resizeColumn: true,
                        select: 'row',
                        editable: true,
                        columns: [
                            {
                                id: 'indication',
                                header: 'Indication',
                                fillspace: true,
                                sort: 'string'
                            }
                        ],
                        data: []
                    },
                    {
                        view: 'toolbar',
                        id: toolbarId,
                        height: 40,
                        cols: [
                            { template: '' },
                            {
                                view: 'button',
                                id: id + '.add',
                                value: 'Add',
                                tooltip: addTip,
                                width: 75,
                                click: function () {
                                    bus.publish(msg.indication.add, {});
                                }
                            }
                        ]
                    }
                ]
            };


        debug(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug("client:views" + id);

        subscribe(app, debug);
    };


})();