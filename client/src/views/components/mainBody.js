/**
 * @module views/components/mainBody
 */

/*global $$, _ */

(function () {
    "use strict";

    var id = 'mainBody',
        name = "views:components:mainBody";

    var detailBody = require('./detailsBody.js'),
        treatBody  = require("./treatmentBody.js");

    /*
     Subscribe to Controller
     */
    var subscribe = function (app, debug) {
        var subscribe = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg,
            show = {
                details: $$(detailBody.getId()),
                treatment: $$(treatBody.getId()),
            };

        subscribe(msg.ui.mainBody, function (data) {
            show[data.item].show();
        });
    };

    /*
     Initialize
     */
    var init = _.once(function (app) {
        var debug = app.debug(name);

        debug("init");

        detailBody.init(app);
        treatBody.init(app);

        subscribe(app, debug);
    });

    /**
     * ### Get the view Id
     * @returns {string} The view Id
     */
    exports.getId = function () { return id; };

    /**
     * ### Get the view config object
     * @param {object} app The application namespace
     * @returns {object} The view config
     */
    exports.getView = function (app) {
        var debug = app.debug(name);

        var view = {
                    id: id, view: "multiview", cells: [
                    detailBody.getView(app),
                    treatBody.getView(app)
                ]
            };

        debug(view);

        return view;
    };

    /**
     * ### Initialize the View
     * @param {obj} app The application namespace
     */
    exports.init = function (app) { init(app); };

})();