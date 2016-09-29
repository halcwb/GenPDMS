/**
 * ### Tooltip window that shows a tooltip at a calculated location
 * @module views/windows/tooltip
 */

/* global _, webix, $$, clearTimeout */

(function () {

    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'tooltip',
        name = "views:windows:tooltip";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    //endregion

    //region --- CHILD VIEWS ---

    //endregion

    //region --- VIEW ---

    var getView = function () {
        throw "getView is not supported for " + name;
    };

    //endregion

    //region --- HELPER FUNCTIONS ---

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

    //endregion

    //region --- SUBSCRIBE ---

    /*
     // Subscribe to View
     */

    /*
     Subscribe to Model
     */

    /*
     Subscribe to Controller
     */
    var subscribeToController = function (app, debug) {
        var sub = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        debug("subscribe to controller");

        sub(msg.ui.tooltip, function (data) {
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
    };

    /*
     Subscribe All
     */
    var subscribeOnce = _.once(subscribeToController);

    //endregion

    //region --- PUBLISH ---


    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {

        // create the view
        createView();

        // create all subscriptions
        // Note: no publish
        subscribeOnce(app, debug);
    };

    //endregion

    //region --- EXPORT ---

    /**
     * #### Get the view id
     * @returns {string} Id of the view
     */
    exports.getId = function () { return id; };

    /**
     * #### Get the view config
     * @param {object} app The application namespace
     * @returns {object} webix view config
     */
    exports.getView = function (app) {
        var view = getView();
        app.debug(name)(view);
        return view;
    };

    /**
     * #### Initializes the view
     *
     * - Create subscriptions for the view
     * - Add publish handlers to view events
     *
     * @param {object} app The application namespace
     */
    exports.init = function (app) {
        var deb = app.debug(name);
        deb("init");
        init(app, deb);
    };

    //endregion

})();