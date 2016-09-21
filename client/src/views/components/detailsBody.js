/**
 * views/components/detailsBody
 */

/*global $$, _ */

(function () {
    "use strict";

    var id = 'detailsBody',

        navigation = require('./navigation.js'),
        patientDetails = require('./patientDetails.js'),
        protocolDetails = require("./protocolDetails.js"),

        goldenRatio = (1 + Math.sqrt(5))/2,

        subscribe = _.once(function (app, debug) {
            var bus = app.bus,
                msg = app.msg,
                item = {
                    select: patientDetails.getId(),
                    protocol: protocolDetails.getId()
                };

            bus.controller.subscribe(msg.ui.detailsBody, function (data, envelope) {

                debug(envelope.topic, data);

                $$(item[data.item]).show();
            });
        });

    exports.getId = function () { return id; };

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

        app.debug('client:' + id + '.getView')(view);

       return view;
    };

    exports.init = function (app) {
        var debug = app.debug("client:" + id + ":init");

        debug("init");

        navigation.init(app);
        patientDetails.init(app);
        protocolDetails.init(app);

        subscribe(app, debug);
    };

})();