/**
 * Created by halcwb on 05/08/16.
 */

/*global webix, $$, window, _ */

(function () {
    "use strict";

    var id = 'sideMenu',

        subscribe = _.once(function (app, debug) {
            var bus = app.bus.controller,
                msg = app.msg;

            bus.subscribe('set.status', function () {
                var status = app.settings.demo ? 'demo' : 'online';

                $$(id).getBody().updateItem('server', { value: status });
            });

            bus.subscribe(msg.sideMenu.show, function () {
                var view = $$(id);

                if (view.config.hidden) {
                    view.show();
                } else {
                    view.hide();
                }
            });

        });

    exports.init = function (app) {
        var debug = app.debug("client:" + id + ":init"),
            enabled = window.localStorage.debug === '' ? 'disabled' : 'enabled',
            bus = app.bus.view,
            msg = app.msg;

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
                        bus.publish(msg.sideMenu.item, {
                            item: id,
                            trg: trg
                        });
                    }
                }
            }
        });

        subscribe(app, debug);

        debug("init");
    };

})();