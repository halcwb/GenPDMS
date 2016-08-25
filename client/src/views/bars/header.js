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
        var debug = app.debug('client' + id + ':init');

        debug('init');

        $$(iconId).attachEvent('onItemClick', function () {
            app.bus.view.publish('show.sideMenu', {});
        });

        webix.event($$(iconId).getNode(), 'mouseenter', function (e) {
            app.bus.view.publish(iconId + '.mouseenter', { e: e });
        });

        webix.event($$(iconId).getNode(), 'mouseleave', function (e) {
            app.bus.view.publish(iconId + '.mouseleave', { e: e });
        });

    };

})();