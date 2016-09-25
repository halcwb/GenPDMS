/**
 * @module views/lists/treatment
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'treatmentList',
        name = "views:lists:treatment";

    /*
     Subscribe to Controller
     */
    var subscribe = _.once(function (app, debug) {
        var subscribe = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        subscribe(msg.patient.treatment, function (data) {
            $$(id).data.importData(data.treatment);
        });
    });

    /*
     Initialize
     */
    var init = function (app) {
        var debug = app.debug(name);

        debug('init');
        subscribe(app, debug);
    };

    /**
     * #### Get the view id
     * @returns {string}
     */
    exports.getId = function () { return id; };

    /**
     * #### Geth the view config
     * @param {object} app The application namespace
     * @returns {object}
     */
    exports.getView = function (app) {
        var debug = app.debug(name),

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

    /**
     * #### Initialize the view
     * @param {object} app The application namespace
     */
    exports.init = function (app) { init(app); };

})();