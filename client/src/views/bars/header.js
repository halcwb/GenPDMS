/**
 * @module views/bars/header
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    var id = 'header',
        name = "views:bars:header",
        iconId = id + '.icon';

    /*
     Initialize
     */
    var init = _.once(function (app) {
        var debug = app.debug(name),
            publish = _.partial(app.bus.view.publish, debug),
            msg = app.msg;

        debug("init");

        $$(iconId).attachEvent('onItemClick', function () {
            publish(msg.sideMenu.show, {});
        });

        webix.event($$(iconId).getNode(), 'mouseenter', function (e) {
            publish(iconId + '.mouseenter', { e: e });
        });

        webix.event($$(iconId).getNode(), 'mouseleave', function (e) {
            publish(iconId + '.mouseleave', { e: e });
        });
    });

    /**
     * ### Get the view Id
     * @returns {string} Id of the view
     */
    exports.getId = function () { return id; };

    /**
     * Get the view config object
     * @param app Application namespace
     * @returns {view} View config object
     */
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

        app.debug(name)(view);
        return view;
    };

    /**
     * ### Initializes the view
     * @param {object} app Application namespace
     */
    exports.init = function (app) { init(app); };

})();