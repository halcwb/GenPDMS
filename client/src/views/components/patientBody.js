/**
 * views/components/patientBody
 */

(function () {
    "use strict";

    var navigation = require('./navigation.js'),
        patientDetails = require('./patientDetails.js');


    exports.getView = function (app) {
       var view = { id: 'patient_body', cols: [
           navigation.getView(app),
           { view: 'resizer' },
           patientDetails.getView(app)
       ]};

       return view;
    };

    exports.init = function (app) {
        navigation.init(app);
        patientDetails.init(app);
    };

})();