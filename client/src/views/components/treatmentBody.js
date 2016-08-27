/**
 * @module views/treatmentBody
 */


(function () {
    "use strict";

    var id = 'treatmentBody',
        treatmentDetails = require('./../lists/treatmentDetail.js');

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        var view = {
            id: id,
            multi: true,
            view: 'accordion',
            rows: [
                _extend(treatmentDetails.getView(app), {
                    header: 'Treatment'
                })
            ]
        };

        app.debug('client:views:components:' + id + ':getView')(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:views:components:' + id + ':init');

        treatmentDetails.init(app);

        debug('init');
    };


})();