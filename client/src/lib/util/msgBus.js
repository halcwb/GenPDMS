/**
 * @module lib/util/msgBus
 */

/*global app, $$, _, console */

(function () {
    "use strict";

    var postal = require('postal'),

        model      = postal.channel("model"),
        view       = postal.channel("view"),
        controller = postal.channel("controller"),

        info = postal.channel("info"),
        warn = postal.channel("warn"),
        errs = postal.channel("errs"),

        reqs = postal.channel("reqs"),

        log = postal.channel("log");

    function publishLog (debug, channel, topic, data) {
        if (app.debug.enabled()) {
            debug(topic, data);
        }

        log.publish(channel + "." + topic, data);
    }

    function channel (channel) {
        return {
            publish: function (debug, msg, data) {
                if (!_.isFunction(debug)) {
                    console.log("debug", debug, "msg", msg, "data", data);
                    throw "Publish debug is not a function";
                }

                if (!_.isString(msg)) {
                    console.log("debug", debug, "msg", msg, "data", data);
                    throw "Publish topic is not a string: " + debug.namespace;
                }

                if (!_.isObject(data)) {
                    console.log("debug", debug, "msg", msg, "data", data);
                    throw "Publish data is not an object: " + debug.namespace;
                }

                publishLog(_.partial(debug, "send"), channel.channel, msg, data);
                channel.publish(msg, data);
            },
            subscribe: function (debug, msg, cb) {
                if (!_.isFunction(debug)) {
                    console.log("debug", debug, "msg", msg, "cb", cb);
                    throw "Subscribe debug is not a function";
                }

                if (!_.isString(msg)) {
                    console.log("debug", debug, "msg", msg, "cb", cb);
                    throw "Subscribe topic is not a string: " + debug.namespace;
                }

                if (!_.isFunction(cb)) {
                    console.log("debug", debug, "msg", msg, "cb", cb);
                    throw "Subscribe callback is not a function: " + debug.namespace;
                }

                channel.subscribe(msg, function (data, envelope) {
                    publishLog(_.partial(debug, "receive"), channel.channel, envelope.topic, data);
                    cb(data, envelope);
                });
            }
        };
    }

    /**
     * logging channel
     */
    exports.log = log;

    /**
     * controller channel
     */
    exports.controller = channel(controller);

    /**
     * view channel
     */
    exports.view = channel(view);

    /**
     * model channel
     */
    exports.model = channel(model);

    /**
     * info channel
     */
    exports.info = channel(info);

    /**
     * warning channel
     */
    exports.warn = channel(warn);

    /**
     * errors channel
     */
    exports.errs = channel(errs);

    /**
     * requests channel
     */
    exports.reqs = channel(reqs);

    /**
     * postal object
     */
    exports.postal = postal;


})();