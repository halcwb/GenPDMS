/**
 * views/components/patientBody
 */

/*global _ */

(function () {
    "use strict";

    var id = 'patientBody',

        navigation = require('./navigation.js'),
        patientDetails = require('./patientDetails.js'),
        protocolDetails = require("./protocolDetails.js"),

        goldenRatio = (1 + Math.sqrt(5))/2;

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
        require('./navigation.js').init(app);

        patientDetails.init(app);
        protocolDetails.init(app);

        app.debug('client' + id + '.init')('init');
    };

})();