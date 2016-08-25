/**
 * views/components/patientBody
 */

/*global _ */

(function () {
    "use strict";

    var id = 'patientBody',
        navigation = require('./navigation.js'),
        patientDetails = require('./patientDetails.js'),
        goldenRatio = (1 + Math.sqrt(5))/2;

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        var view = {
                id: id,
                cols: [
                    _.extend(navigation.getView(app), { gravity: 1/goldenRatio }),
                    { view: 'resizer' },
                    patientDetails.getView(app)
                ]
            };

        app.debug('client:' + id + '.getView')(view);

       return view;
    };

    exports.init = function (app) {
        require('./navigation.js').init(app);
        patientDetails.init(app);

        app.debug('client' + id + '.init')('init');
    };

})();