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

var Request = {
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
        ºi = 0;
        while (ºi < ºparams.length) {
            ºparameter = ºparams[ºi].split("=");
            ºresult[ºparameter[0]] = ºparameter[1];
            ºi++;
        }
        return ºresult;
    }
};

var ºrvars = Request.ºparameters();
var ºnslvars = $.initNamespaceStorage(`req`);
var ºlvars = ºnslvars.localStorage;

