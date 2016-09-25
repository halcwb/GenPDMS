/**
 * @module views/lists/protocol
 */

/*global webix, $$ */

(function () {
    "use strict";

    var id = 'protocolList',
        name = "views:lists:protocol",
        view =  {
            view: 'datatable',
            id: id,
            resizeColumn: true,
            select: 'row',
            columns: [
                { id: 'id', header: 'Id', sort: 'string' },
                { id: 'name', header: 'Name', fillspace: true, sort: 'string' }
            ],
            data: [
                { id: '1', name: 'Pain' },
                { id: '2', name: 'Blood Pressure' }
            ]
        };

    /**
     * #### Return the view Id
     * @returns {string}
     */
    exports.getId = function () { return id; };

    /**
     * Return the view config
     * @param {object} app The application namespace
     * @returns {object} The view config
     */
    exports.getView = function (app) {
        app.debug(name)(view);

        return view;
    };

    /**
     * Initializes the view
     * @param {object} app The application namespace
     */
    exports.init = function (app) {
        app.debug(name)('init');

        webix.ui({
            view: 'contextmenu',
            data: [
                'Add',
                'Remove'
            ]
        }).attachTo($$(id));

    };

})();