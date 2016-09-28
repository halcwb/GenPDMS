/**
 * ## Rule Editor View
 * @module views/components/ruleEditor
 */


/*global webix, $$, _, Blockly */

(function () {

    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var id = 'ruleEditorBody',
        toolbarId = id + '.toolbar',

        name = "views:components:ruleEditorBody";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    var ruleEditorNode = 'rule_editor';

    //endregion

    //region --- CHILD VIEWS ---

    //endregion

    //region --- VIEW ---

    var getView = function () {
        return {
            id: id,
            rows: [{
                id: 'ruleEditor',
                template: ''
            },{
                view: 'toolbar',
                id: toolbarId,
                height: 40,
                cols: [
                    { template: '' },
                    {
                        view: 'button',
                        id: 'ruleEditor.back',
                        value: 'Back',
                        tooltip: 'back to the main window',
                        width: 75
                    },
                    {
                        view: 'button',
                        id: 'ruleEditor.addRule',
                        value: 'Add Rule',
                        tooltip: 'Add the rule to the ruleList',
                        width: 75
                    }
                ]
            }]
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
        var pub = _.partial(app.bus.view.publish, debug),
            msg = app.msg;

        $$('ruleEditor').getNode().id = ruleEditorNode;

        var workspace = Blockly.inject(ruleEditorNode, {
            toolbox: document.getElementById('rule_editor_toolbox')
        });

        workspace.addChangeListener(function () {
            var xml = Blockly.Xml.workspaceToDom(workspace);
            pub('ruleEditor.rule', {
                rule: (Blockly.Xml.domToText(xml))
            });
        });

        $$("ruleEditor.back").attachEvent("onItemClick", function () {
            pub(msg.ui.ruleEditor, {
                editor: false
            });
        });
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