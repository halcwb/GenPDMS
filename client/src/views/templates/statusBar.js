/**
 * @module views/templates/statusBar
 */

/*global webix, $$ */

(function () {
    "use strict";

    var id = 'statusBar',
        view = {
            template: 'status: #status# | message: #message#',
            id: id,
            height: 30,
            data: { status: '', message: '' }
        };

    exports.getId = function () { return id; };

    /**
     * Create the view
     * @param app {app} provides the app functionality
     * @returns {view} Returns the view
     */
    exports.getView = function (app) {
        //noinspection JSUnresolvedFunction
        app.debug('client:' + id)(view);

        //noinspection JSValidateTypes
        return view;
    };

    /**
     * Initializes the view
     * Uses the webix $$ to get the view
     * @param app {app} provides the app functionality
     */
    exports.init = function (app) {
        //noinspection JSUnresolvedFunction
        var view = $$(id),
            debug = app.debug('client:' + id);

        debug('init');

        webix.event(view.$view, 'click', function () {
            app.bus.view.publish('status_bar_message', {
                text: $$(id).getValues().message
            });
        });

        app.bus.controller.subscribe('set.status', function (data, envelope) {
            var bar  = $$(id),
                vals = bar.getValues();

            debug(envelope);

            vals.status = data.status;
            bar.setValues(vals);
        });

        //noinspection JSUnresolvedVariable
        app.bus.controller.subscribe('*.err', function (data /*, envelope */) {
            //noinspection JSUnresolvedFunction
            debug('result', data.result);
            var bar = $$(id),
                vals = bar.getValues();

            vals.message = data.err;
            bar.setValues(vals);
        });

    };


})();