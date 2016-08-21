/**
 * views/components/patientBody
 */

(function () {
    "use strict";

    var navigation = require('./navigation.js'),
        patientDetails = require('./patientDetails.js');


    exports.view = function (app) {
       var view = { id: 'patient_body', cols: [
           navigation.view(app),
           { view: 'resizer' },
           patientDetails.view(app)
       ]};

       return view;
    };

    exports.init = function (app) {
        navigation.init(app);
        patientDetails.init(app);
    };

})();