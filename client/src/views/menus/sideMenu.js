/**
 * @module views/menus/sideMenu.
 */

/*global webix, $$, window, _ */

(function () {
    "use strict";

    var id = 'sideMenu',
        name = "views:menus:sideMenu";

    var subscribe = _.once(function (app, debug) {
        var subscribe = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        subscribe('set.status', function () {
            var status = app.settings.demo ? 'demo' : 'online';

            $$(id).getBody().updateItem('server', { value: status });
        });

        subscribe(msg.sideMenu.show, function () {
            var view = $$(id);

            if (view.config.hidden) {
                view.show();
            } else {
                view.hide();
            }
        });

    });

    var init = function (app) {
        var debug = app.debug(name),
            enabled = window.localStorage.debug === '' ? 'disabled' : 'enabled',
            publish = _.partial(app.bus.view.publish, debug),
            msg = app.msg;

        debug("init");

        webix.ui({
            id: id,
            view: 'sidemenu',
            width: 200,
            position: 'left',
            state: function(state) {
                var headerHeight = $$('header').$height;
                state.top = headerHeight;
                state.height -= headerHeight;
            },
            body: {
                view: 'list',
                borderless: true,
                scroll: false,
                template: "<span class='webix_icon fa-#icon#'></span> #setting#: #value#",
                data: [
                    { id: 'server', icon: 'cog', setting: 'server', value: '' },
                    { id: 'debug', icon: 'code', setting: 'debug',  value: enabled }
                ],
                on: {
                    'onItemClick': function (id, e, trg) {
                        publish(msg.sideMenu.item, {
                            item: id,
                            trg: trg
                        });
                    }
                }
            }
        });

        subscribe(app, debug);
    };

    exports.init = function (app) { init(app); };

})();