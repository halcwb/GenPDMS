/**
 * module views/windows/tooltip
 */

/* global _, webix, $$, clearTimeout */

(function () {
    "use strict";

    var id = 'tooltip';

    var showTooltip = function (clientX, clientY, text) {
        var // calculate x pos
            uiWidth  = $$('ui').getNode().clientWidth,
            tipWidth = 200,
            totWidth = clientX + tipWidth,
            x = totWidth > uiWidth ? (clientX - tipWidth) : clientX,
            // calculate y pos
            uiHeight  = $$('ui').getNode().clientHeight,
            tipHeight = 100,
            totHeight = clientY + tipHeight,
            y = totHeight > uiHeight ? (clientY - tipHeight) : clientY;


        $$(id).show({ text: text }, { x: x, y: y });
    };

    var subscribe = _.once(function (app, debug) {
        var bus = app.bus,
            msg = app.msg;

        bus.controller.subscribe(msg.ui.tooltip, function (data, envelope) {
            var show = _.partial(showTooltip, data.clientX, data.clientY, data.text);
            debug(envelope.topic, data);

            if (data.tooltip) {
                app.tooltip = _.delay(show, 1000);
                _.delay(function () {
                    clearTimeout(app.tooltip);
                    $$(id).hide();
                }, 5000);
            } else {
                clearTimeout(app.tooltip);
                $$(id).hide();
            }
        });

    });

    exports.getId = function () { return id; };


    exports.init = function (app) {
        var tip, style,
            debug = app.debug('client:' + id),
            bus = app.bus,
            msg = app.msg;

        webix.ui({
            id: id,
            view: 'tooltip',
            template: '#text#'
        }).attachEvent('onAfterRender', function () {
            // webix does not set width and height to tooltip
            tip = $$(id).getNode();
            style = tip.getAttribute('style') + " max-width: 200px; height: 100px;";
            tip.setAttribute('style', style);
        });

        // hack to make onAfterRender work, otherwise the div has no style
        $$(id).show({ text: ''}, { x: 0, y: 0});
        $$(id).hide();

        subscribe(app, debug);

    };

})();