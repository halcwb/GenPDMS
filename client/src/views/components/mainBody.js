/**
 * @module views/components/mainBody
 */

/*global $$, _ */

(function () {
    "use strict";

    var id = 'mainBody';

    var detailBody = require('./detailsBody.js'),
        treatBody  = require("./treatmentBody.js"),

        subscribe = _.once(function (app, debug) {
            var bus = app.bus,
                msg = app.msg,
                show = {
                    details: $$(detailBody.getId()),
                    treatment: $$(treatBody.getId()),
                };

            bus.controller.subscribe(msg.ui.mainBody, function (data, envelope) {
                debug(envelope.topic, data);
                show[data.item].show();
            });

        });

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        var debug = app.debug('client:' + id + ':getView');

        var view = {
                    id: id, view: "multiview", cells: [
                    detailBody.getView(app),
                    treatBody.getView(app)
                ]
            };

        debug(view);

        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init');

        detailBody.init(app);
        treatBody.init(app);

        subscribe(app, debug);

        debug('init');
    };

})();