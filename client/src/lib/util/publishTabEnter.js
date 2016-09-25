/**
 * @module lib/util/publishTabEnter
 */

/*global webix, _ */

(function () {
    "use strict";

    /**
     * ### Publish the tab enter and leave events
     * @param {object} args The arguments tabs, app and debug
     */
    module.exports = function (args) {
        var tabs = args.tabs,
            app = args.app;

        _.forEach(tabs, function (id) {
            var tab = app.util.elly.$$('[button_id="'+ id +'"]')[0];

            webix.event(tab, 'mouseenter', function (e) {
                var evt = id + '.mouseenter',
                    debug = app.debug(evt);

                app.bus.view.publish(debug, id + '.mouseenter', { e: e, node: tab });
            });

            webix.event(tab, 'mouseleave', function () {
                var evt = id + '.mouseleave',
                    debug = app.debug(evt);

                app.bus.view.publish(debug, id + '.mouseleave', { node: tab });
            });

        });

    };

})();