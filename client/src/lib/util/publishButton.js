/**
 * @module lib/util/publishButton
 *
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    /**
     * publish click event for all buttons in el with id
     * @param args
     */
    module.exports = function (args) {
        if (!$$(args.id)) throw 'Cannot find: ' + args.id;

        _.forEach($$(args.id).getNode().querySelectorAll('[class="webix_view webix_control webix_el_button"]'), function (el) {
            var btnId = el.getAttribute('view_id');

            if (btnId.indexOf('.') === -1) {
                args.debug('error', el);
                throw 'Button has no valid id';
            }

            $$(btnId).attachEvent('onItemClick', function () {
                args.debug('publish', btnId);
                args.app.bus.view.publish(btnId, {
                    btn: $$(btnId),
                    args: args
                });
            });
        });


    };

})();