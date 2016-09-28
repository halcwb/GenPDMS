/**
 * ## Patient Model
 * @module models/patient
 */


/*global _ */

(function () {

    "use strict";

    //region --- IDENTIFIERS AND NAMES ---

    var name = "patient";

    //endregion

    //region --- ADDITIONAL VARIABLES ---

    //endregion

    //region --- MODEL ---

    var model = require("model-component")(name)
        .attr("id", {type: "string" })
        .attr("no", {type: "string" })
        .attr("lname", {type: "string" })
        .attr("fname", {type: "string" })
        .attr("dob", {type: "date" })
        .attr("weight", {type: "string" })
        .attr("weightUnit", {type: "string" })
        .attr("length", {type: "string" })
        .attr("lengthUnit", {type: "string" })
        .attr("bsa", {type: "number" })
        .attr("age", {type: "string" })
        .attr("ageUnit", {type: "string" })({});

    //endregion

    //region --- HELPER FUNCTIONS ---

    function publishModel (publish, msg) {
        publish(msg, {
            patient: model.toJSON()
        });
    }

    function cancelModel() {
        model.set(model.origAttrs);
    }

    //endregion

    //region --- SUBSCRIBE ---

    var subscribeController = function (app, debug, publish) {
        var msg = app.msg,
            sub = _.partial(app.bus.controller.subscribe, debug),
            pub = _.partial(publishModel, publish);

        debug("subscribe to controller");

        sub(msg.patient.select, function (data) {
            model.set(data.patient);
            model.clean();
            pub(msg.patient.select);
        });

        sub(msg.patient.update, function (data) {
            model.set(data.patient);
            pub(msg.patient.update);
        });

        sub("patient.cancel", function () {
            cancelModel();
            pub(msg.patient.update);
        });
    };

    var subscribeOnce = _.once(subscribeController);

    //endregion

    //region --- INITIALIZE ---

    var init = function (app, debug) {
        var pub = _.partial(app.bus.model.publish, debug);
        subscribeOnce(app, debug, pub);
    };

    //endregion

    //region --- EXPORT ---

    /**
     * #### Get the model name
     * @returns {string} Name of the model
     */
    exports.getName = function () { return name; };

    /**
     * #### Initializes the model
     *
     * - Create subscriptions for the model
     * - Add publish handlers to model events
     *
     * @param {object} app The application namespace
     */
    exports.init = function (app) {
        var deb = app.debug("models:" + name);
        deb("init");
        init(app, deb);
        return model;
    };

    //endregion

})();