/* GENERIC
 * Some function for very generic purposes
 */

var ºescapeHTML = (function () {
    `use strict`;
    var ºchr = {
        '&': `&amp;`, '<': `&lt;`,  '>': `&gt;`
    };
    return function (ºtext) {
        return ºtext.replace(/[&<>]/g, function (ºa) { return ºchr[ºa]; });
    };
}());

var ºRequest = {
    ºparameter: function(ºname) {
        return this.ºparameters()[ºname];
    },
    ºparameters: function(ºuri) {
        var ºi, ºparameter, ºparams, ºquery, ºresult;
        ºresult = {};
        if (!ºuri) {
            ºuri = window.location.search;
        }
        if (ºuri.indexOf("?") === -1) {
            return {};
        }
        ºquery = ºuri.slice(1);
        ºparams = ºquery.split("&");
        ºparams.forEach(function(ºp, ºi) {
            ºparameter = ºp.split("=");
            ºresult[ºparameter[0]] = ºparameter[1];
        });
        return ºresult;
    }
};

var ºrvars = ºRequest.ºparameters();
var ºnslvars = $.initNamespaceStorage(`req`);
var ºlvars = ºnslvars.localStorage;

