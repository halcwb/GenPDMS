/**
 * @module views/bars/header
 */

/*global webix, $$ */

(function () {
    "use strict";

    var id = 'header',
        iconId = id + '.icon';

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        var view = {
            id: id,
            view: 'toolbar',
            elements: [
                {
                    view: 'icon',
                    id: iconId,
                    icon: 'bars'
                },
                { view: 'label', label: 'GenPDMS' }
            ]
        };

        app.debug('client:' + id + ':view')(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client' + id + ':init'),
            bus = app.bus,
            msg = app.msg;

        debug('init');

        $$(iconId).attachEvent('onItemClick', function () {
            bus.view.publish(msg.sideMenu.show, {});
        });

        webix.event($$(iconId).getNode(), 'mouseenter', function (e) {
            bus.view.publish(iconId + '.mouseenter', { e: e });
        });

        webix.event($$(iconId).getNode(), 'mouseleave', function (e) {
            bus.view.publish(iconId + '.mouseleave', { e: e });
        });

    };

})();