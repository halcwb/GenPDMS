/**
 * @module views/lists/indication
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'indicationList',
        toolbarId = id + '.toolbar',
        addTip = 'Add an indication',
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
                        { view: 'button', id: id + '.add', value: 'Add', tooltip: addTip, width: 75 }
                    ]
                }
            ]
        };

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        app.debug('client:' + id + ':getView')(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init');

        app.util.publishButton({
            id: toolbarId,
            app: app,
            debug: debug
        });

        app.bus.controller.subscribe("patient.indications", function (data, envelope) {
            debug(envelope.topic, data);

            $$(id).data.importData(data.indications);
        });

        debug('init');
    };


})();