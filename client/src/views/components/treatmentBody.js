/**
 * @module views/treatmentBody
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'treatmentBody',
        toolbarId = id + '.toolbar',
        treatmentDetails = require('./../lists/treatmentDetail.js');

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        var view = {
            id: id,
            rows: [
                {
                    template: 'Patient: #name# Birth date: #dob# Weight: #weight# ',
                    id: id + '.header',
                    height: 40,
                    data: {
                        name: 'Test Patient',
                        dob: '12-Mar-1956',
                        weight: '70 kg'
                    }
                },
                {
                    multi: 'mixed',
                    view: 'accordion',
                    rows: [
                        {
                            header: 'Treatment',
                            collapsed: false,
                            body: treatmentDetails.getView(app)
                        },
                        {
                            header: 'Totals',
                            collapsed: true,
                            body: 'Totals'
                        }
                    ]
                },
                {
                    view: 'toolbar',
                    id: toolbarId,
                    height: 40,
                    cols: [
                        { template: '' },
                        {
                            view: 'button',
                            id: id + '.back',
                            value: 'Back',
                            tooltip: 'Return to the main stream',
                            width: 75
                        },
                        {
                            view: 'button',
                            id: id + '.sign',
                            value: 'Sign',
                            tooltip: 'Sign treatment to be administered',
                            width: 75
                        }
                    ]
                }
            ]
        };

        app.debug('client:views:components:' + id + ':getView')(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:views:components:' + id + ':init');

        app.util.publishButton({
            id: toolbarId,
            app: app,
            debug: debug
        });

        treatmentDetails.init(app);

        debug('init');
    };


})();