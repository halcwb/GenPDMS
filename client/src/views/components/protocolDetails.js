/**
 * components/protocolDetails
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'protocolDetails',
        protocolForm   = require('./../forms/protocol.js'),
        protocolOrders = require('./../lists/protocolOrder.js');

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        var view  = {
            id: id,
            rows: [
                protocolForm.getView(app),
                protocolOrders.getView(app),
            ]
        };

        app.debug('client:' + id + ':getView')(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init');

        protocolForm.init(app);
        protocolOrders.init(app);

        debug('init');
    };


})();