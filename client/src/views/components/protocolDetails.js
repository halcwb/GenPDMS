/**
 * @module views/components/protocolDetails
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'protocolDetails',
        name = "views:components:protocolDetails",

        protocolForm   = require('./../forms/protocol.js'),
        protocolOrders = require('./../lists/protocolOrder.js');

    /**
     * #### Get the view id
     * @returns {string}
     */
    exports.getId = function () { return id; };

    /**
     * Get the view config
     * @param {object} app The application namespace
     * @returns {object}
     */
    exports.getView = function (app) {
        var view  = {
            id: id,
            rows: [
                _.extend(protocolForm.getView(app), { type: 'space' }),
                protocolOrders.getView(app),
            ]
        };

        app.debug(name)(view);
        return view;
    };

    /**
     * Initialize the view
     * @param {object} app The application namespace
     */
    exports.init = function (app) {
        var debug = app.debug(name);

        debug('init');

        protocolForm.init(app);
        protocolOrders.init(app);
    };


})();