/**
 * @module lib/util/publishTabEnter
 */

/*global webix, _ */

(function () {
    "use strict";

    module.exports = function (args) {
        var tabs = args.tabs,
            app = args.app,
            debug = app.debug;

        _.forEach(tabs, function (id) {
            var tab = app.util.elly.$$('[button_id="'+ id +'"]')[0];

            webix.event(tab, 'mouseenter', function (e) {
                var evt = id + '.mouseenter';

                debug('publish', evt);

                app.bus.view.publish(id + '.mouseenter', { e: e, node: tab });
            });

            webix.event(tab, 'mouseleave', function () {
                var evt = id + '.mouseleave';

                debug('publish', evt);

                app.bus.view.publish(id + '.mouseleave', { node: tab });
            });

        });

    };

})();