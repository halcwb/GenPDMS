/**
 * ### The general details body of the application
 * @module views/components/detailsBody
 */

/*global $$, _ */

(function () {
    "use strict";

    var id = 'detailsBody',
        name = "views:components:detailsBody",

        navigation = require('./navigation.js'),
        patientDetails = require('./patientDetails.js'),
        protocolDetails = require("./protocolDetails.js"),

        goldenRatio = (1 + Math.sqrt(5))/2;

    /*
     Subscribe to Controller
     */
    var subscribe = _.once(function (app, debug) {
        var subscribe = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg,
            item = {
                patient: patientDetails.getId(),
                protocol: protocolDetails.getId()
            };

        subscribe(msg.ui.detailsBody, function (data) {
            $$(item[data.item]).show();
        });
    });

    /**
     * ### Get the View Id
     * @returns {string} The view id
     */
    exports.getId = function () { return id; };

    /**
     * Get the View Config
     * @param {object} app The application namespace
     * @returns {object} The view config
     */
    exports.getView = function (app) {
        var view = {
                id: id,
                cols: [
                    _.extend(navigation.getView(app), { gravity: 1/goldenRatio }),
                    { view: 'resizer' },
                    {
                        view: "multiview", cells: [
                            patientDetails.getView(app),
                            protocolDetails.getView(app)
                        ]
                    }
                ]
            };

        app.debug(name)("getView", view);

       return view;
    };

    /**
     * Initialize the View
     * @param {object} app The application namespace
     */
    exports.init = function (app) {
        var debug = app.debug(name);

        debug("init");

        navigation.init(app);
        patientDetails.init(app);
        protocolDetails.init(app);

        subscribe(app, debug);
    };

})();