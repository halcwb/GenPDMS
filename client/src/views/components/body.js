/**
 * @module views/components/body
 */


(function () {
    "use strict";

    var id = 'body';

    var patbody   = require('./patientBody.js'),
        treatbody = require("./treatmentBody.js");

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        var debug = app.debug('client:' + id + ':getView');

        var view = {
                    id: id, view: "multiview", cells: [
                    patbody.getView(app),
                    treatbody.getView(app)
                ]
            };

        debug(view);

        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init');

        debug('init');

        patbody.init(app);
        treatbody.init(app);

    };

})();