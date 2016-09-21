/**
 * @module modules/patient
 */


/*global _ */

(function () {
    "use strict";

    var name = "patient";

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

    exports.getName = function () { return name; };

    exports.create = function (app, data) {
        var bus = app.bus,
            msg = app.msg,
            debug = app.debug("client:models:patient"),
            model = create(data);

        model.emitChange = true;

        function publishModel () {
            bus.model.publish(msg.patient.select, {
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

        bus.controller.subscribe(msg.patient.select, function (data, envelope) {
            debug(envelope.topic, data);

            setModel(data.select);
            model.clean();

            publishModel();
        });

        return model;
    };

})();