/* GENERIC
 * Some function for very generic purposes
 */

const chr = new Map([
    ['&', '&amp;'],
    ['<', '&lt;'],
    ['>', '&gt;'],
]);

function escapeHTML(text) {
    return text.replace(/[&<>]/g, function (a) {return chr.get(a) || a;});
};

const _Request = {
    parameter: function(name) {
        return this.parameters().get(name);
    },
    parameters: function() {
        const result = new Map();
        const uri = window.location.search;
        if (uri.indexOf("?") === -1) {
            return result;
        }
        for (const paramval of uri.slice(1).split("&")) {
            result.set(...paramval.split("="));
        }
        return result;
    }
};

const request_vars = _Request.parameters();
const _localstorage = $.initNamespaceStorage('req');
const localstorage_vars = _localstorage.localStorage;

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
        const range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    }
    else if (window.getSelection) {
        const range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
    }
};

function toggleDetail(widget, detail, extra) {
    const thedetail = (detail == undefined)?widget.closest('div').find('.detail'):detail;
    thedetail.toggle();
    if (extra != undefined) {
        extra(widget);
    }
    let thiscl, othercl;
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
    return (text.length > cutoff)?text.replace(/[^ -]+/g, x => {return x.substr(0,size)}):text;
};

function from_str(st) {
    return (st !== null && st != undefined && st != '')?new Set(st.split(',')):new Set();
};
function a_to_str(ar) {
    return ar.join(',');
};
function to_str(set) {
    return Array.from(set).join(',');
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
