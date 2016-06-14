/* GENERIC
 * Some function for very generic purposes
 */

var escapeHTML = (function () {
    `use strict`;
    var chr = {
        '&': `&amp;`, '<': `&lt;`,  '>': `&gt;`
    };
    return function (text) {
        return text.replace(/[&<>]/g, function (a) { return chr[a]; });
    };
}());

var _Request = {
    parameter: function(name) {
        return this.parameters()[name];
    },
    parameters: function(uri) {
        var i, parameter, params, query, result;
        result = {};
        if (!uri) {
            uri = window.location.search;
        }
        if (uri.indexOf("?") === -1) {
            return {};
        }
        query = uri.slice(1);
        params = query.split("&");
        params.forEach(function(p, i) {
            parameter = p.split("=");
            result[parameter[0]] = parameter[1];
        });
        return result;
    }
};

var request_vars = _Request.parameters();
var _localstorage = $.initNamespaceStorage(`req`);
var localstorage_vars = _localstorage.localStorage;

function deselectText() {
    if (document.selection) {
        document.selection.empty();
    }
    else if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
};

function selectText(containerid) {
    deselectText();
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    }
    else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
    }
};

function toggleDetail(widget, detail, extra) {
    var thedetail = (detail == undefined)?widget.closest('div').find('.detail'):detail;
    thedetail.toggle();
    if (extra != undefined) {
        extra(widget);
    }
    var thiscl, othercl;
    if (widget.hasClass('fa-chevron-right')) {
        thiscl = 'fa-chevron-right';
        othercl = 'fa-chevron-down';
    }
    else {
        thiscl = 'fa-chevron-down';
        othercl = 'fa-chevron-right';
    }
    widget.removeClass(thiscl);
    widget.addClass(othercl);
};

function compact(cutoff, size, text) {
    return (text.length > cutoff)?text.replace(/[^ -]+/g, function(x){return x.substr(0,size)}):text;
};

function from_str(st) {
    var ob = {};
    if (st !== null && st != undefined && st != '') {
        var ar = st.split(',');
        ar.forEach(function(v) {
            ob[v] = true;
        });
    }
    return ob;
};
function a_to_str(ar) {
    return ar.join(',');
};
function to_str(ob) {
    var ar = [];
    for (var x in ob) {
        if (ob[x]) {
            ar.push(x);
        }
    }
    return ar.join(',');
};

module.exports.escapeHTML = escapeHTML;
module.exports.request_vars = request_vars;
module.exports.localstorage_vars = localstorage_vars;
module.exports.selectText = selectText;
module.exports.deselectText = deselectText;
module.exports.toggleDetail = toggleDetail;
module.exports.compact = compact;
module.exports.from_str = from_str;
module.exports.to_str = to_str;
module.exports.a_to_str = a_to_str;
