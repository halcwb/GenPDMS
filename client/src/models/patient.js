/**
 * @module models/patient
 */


/*global _ */

(function () {
    "use strict";

    var name = "patient",
        model;

    var create = require("model-component")(name)
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
        .attr("ageUnit", {type: "string" });

    var init = _.once(function (app) {
        var debug = app.debug("models:patient"),
            publish   = _.partial(app.bus.model.publish, debug),
            subscribe = _.partial(app.bus.controller.subscribe, debug),
            msg = app.msg;

        model = create({});
        model.emitChange = true;

        function publishModel () {
            publish(msg.patient.update, {
                patient: model.toJSON()
            });
        }

        function setModel (data) {
            model.emitChange = false;
            model.set(data);
            model.emitChange = true;
        }

        model.cancel = function () {
            setModel(model.origAttrs);
            publishModel();
        };

        model.on("change", function (prop, val, old) {
            if (model.emitChange && !_.isEqual(val, old)) {
                publishModel();
            }
        });

        subscribe(msg.patient.select, function (data) {
            setModel(data.patient);
            model.clean();

            publishModel();
        });

        return model;
    });

    exports.getName = function () { return name; };

    exports.init = function (app) { return init(app); };

})();