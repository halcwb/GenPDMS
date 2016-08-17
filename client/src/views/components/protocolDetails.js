/**
 * components/protocolDetails
 */

(function () {
    "use strict";

    var id = 'protocol_details';

    exports.id = function () { return id; };

    exports.view = function (app) {
       var view  = {
           id: id,
           template: 'Protocol Details'
       };

       return view;
    };


})();