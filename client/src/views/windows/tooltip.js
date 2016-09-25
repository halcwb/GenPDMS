/**
 * ### Tooltip window that shows a tooltip at a calculated location
 * @module views/windows/tooltip
 */

/* global _, webix, $$, clearTimeout */

(function () {
    "use strict";

    var id = 'tooltip';

    /*
     Helper Functions
     */

    // Show tooltip at a calculated position
    function showTooltip (clientX, clientY, text) {
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
    }

    /*
     Controller Subscriptions
     */

    // Create all controller subscriptions
    var subscribeController = _.once(function (app, debug) {
        var subscribe = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        subscribe(msg.ui.tooltip, function (data) {
            var show = _.partial(showTooltip, data.clientX, data.clientY, data.text);

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

    var createView = _.once(function () {
        var tip, style;

        // create the view
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
    });


    var init = _.once(function (app) {
        var debug = app.debug("views:windows:tooltip");

        debug("init");

        // create the view
        createView();

        // create all subscriptions
        // Note: no publish
        subscribeController(app, debug);
    });

    /**
     * #### Get the id of the view
     * @type {Function}
     * @returns {string}
     */
    exports.getId = function () { return id; };

    /**
     * #### Initializes the view
     * @type {Function}
     * @param app {Object} The application namespace
     * @returns {undefined}
     */
    exports.init = function (app) { init(app); };

})();