/**
 * views/components/patientBody
 */

(function () {
    "use strict";

    var id = 'patientBody',
        navigation = require('./navigation.js'),
        patientDetails = require('./patientDetails.js');

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        var view = {
                id: id,
                cols: [
                    navigation.getView(app),
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