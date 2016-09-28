/**
 * ## Protocol details form
 * @module views/forms/protocol
 */

(function () {
    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'protocolForm',
        name = "views:forms:protocol";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    var labelWidth = 100;

    //endregion

    //region --- CHILD VIEWS ---

    //endregion

    //region --- VIEW ---

    var getView = function () {
       return {
           view: 'form',
           id: id,
           elements: [
               { rows: [
                   { template: 'Protocol Details', type: 'section' },
                   {
                       view: "text",
                       label: 'Id',
                       placeholder: 'Id',
                       name: 'id',
                       labelAlign: 'right',
                       labelWidth: labelWidth
                   },
                   {
                       view: "text",
                       label: 'Name',
                       placeholder: 'Protocol Name',
                       name: 'name',
                       labelAlign: 'right',
                       labelWidth: labelWidth
                   },
                   { template: '', height: 20 },
                   {
                       cols: [
                           { template: '' },
                           {
                               view: 'button',
                               id: id + '.new',
                               tooltip: 'Enter a new protocol',
                               value: 'New',
                               width: 75
                           },
                           {
                               view: 'button',
                               id: id + '.edit',
                               value: 'Edit',
                               tooltip: 'Change exisiting protocol',
                               type: 'form',
                               width: 75
                           },
                           {
                               view: 'button',
                               id: id + '.save',
                               value: 'Save',
                               tooltip: 'Save protocol',
                               width: 75
                           }
                       ]
                   }
               ]}
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


    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {

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