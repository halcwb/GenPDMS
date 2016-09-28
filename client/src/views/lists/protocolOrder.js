/**
 * @module views/lists/protocolOrder
 */

/*global webix, $$, _ */

(function () {
    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'protocolOrderList',
        toolbarId = id + '.toolbar',

        name = "views:lists:protocolOrder";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    //endregion

    //region --- CHILD VIEWS ---

    //endregion

    //region --- VIEW ---

    var getView = function () {
        return {
           rows: [
               {
                   view: 'datatable',
                   id: id,
                   resizeColumn: true,
                   select: 'row',
                   columns: [
                       { id: 'id', header: 'Id', width: 40 },
                       { id: 'indication', header: 'Indication', width: 200 },
                       { id: 'contra', header: 'Contra Indication', width: 200 },
                       { id: 'order', header: 'Order', fillspace: true }
                   ],
                   data: []
               },
               {
                   view: 'toolbar',
                   id: toolbarId,
                   height: 40,
                   cols: [
                       { template: '' },
                       {
                           view: 'button',
                           id: id + '.ruleEditor',
                           value: 'Rule Editor',
                           tooltip: 'Open the rule editor',
                           width: 100
                       },
                       {
                           view: 'button',
                           id: id + '.add',
                           value: 'Add',
                           tooltip: 'Add a new protocol item',
                           width: 75
                       }
                   ]
               }
           ]
        };
    };

    //endregion

    //region --- HELPER FUNCTIONS ---

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

    /*
     Subscribe All
     */

    //endregion

    //region --- PUBLISH ---

    var publish = function (app, debug, publish) {
        var msg = app.msg;

        debug("publish");

        $$(id + ".ruleEditor").attachEvent("onItemClick", function () {
            publish(msg.ui.ruleEditor, {
                editor: true
            });
        });

    };

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
        var pub = _.partial(app.bus.view.publish, debug);

        if (!$$(id)) {
            webix.ui({
                view: 'contextmenu',
                data: [
                    'Create Indication'
                ]
            }).attachTo($$(id));
        }

        publish(app, debug, pub);
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