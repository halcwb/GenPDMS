/**
 * module views/windows/tooltip
 */

/* global webix, $$ */

(function () {
    "use strict";

    var id = 'tooltip';

    exports.getId = function () { return id; };


    exports.init = function (app) {
        var tip, style;
        app.debug('client:' + id)('init');

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

    };

})();