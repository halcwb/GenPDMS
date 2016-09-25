/**
 * @module views/lists/indication
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'indicationList',
        name = "views:lists:indication",
        toolbarId = id + '.toolbar',
        addTip = 'Add an indication';

    /*
     Subscribe to Controller
     */
    var subscribe = _.once(function (app, debug) {
            var subscribe = _.partial(app.bus.controller.subscribe, debug),
                msg = app.msg;

            subscribe(msg.patient.indications, function (data) {
                $$(id).data.importData(data.indications);
            });
        });

    /*
     Initialize
     */
    var init = function (app) {
        var debug = app.debug(name);
        subscribe(app, debug);
    };

    /**
     * #### Get the view id
     * @returns {string}
     */
    exports.getId = function () { return id; };

    /**
     * #### Get the view config
     * @param {object} app The application namespace
     * @returns {object}
     */
    exports.getView = function (app) {
        var debug = app.debug(name),
            publish = _.partial(app.bus.view.publish, debug),
            msg = app.msg,
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
                                    publish(msg.indication.add, {});
                                }
                            }
                        ]
                    }
                ]
            };


        debug(view);
        return view;
    };

    /**
     * #### Initialize the view
     * @param app
     */
    exports.init = function (app) { init(app); };

})();