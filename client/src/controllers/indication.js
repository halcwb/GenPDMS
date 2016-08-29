/**
 * @module controllers/indication
 */

/*global webix, $$, _ */

(function () {
    "use strict";


    exports.init = function (app) {
        var debug = app.debug('client:controllers:indication:init');

        app.bus.view.subscribe('indicationList.add', function (data, envelope) {
            var msg = 'Not implemented yet:</br>' +
                envelope.topic + '</br>' +
                'will add or indications';

            debug(envelope.topic, data);

            webix.message(msg);
        });

        app.bus.view.subscribe("patientList.onItemClick", function (data, envelope) {
            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    debug(resp);
                    app.bus.controller.publish("patient.indications", {
                        indications: resp.result.indications
                    });
                },

                fail = function (err) {
                    debug(err);
                };

            debug(envelope.topic, data);

            app.loading(true);
            post(succ, fail, "indications", { id: data.item.id });
            app.loading(false);

        });

        debug('init');
    };


})();