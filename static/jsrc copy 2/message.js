/* MESSAGES
 * Msg is a function that issues messages to a specified element.
 * It has also controls for clearing and hiding the messages.
 */

function Msg(dst, on_clear) {
    var that = this;
    this._dst = $(`#${dst}`);
    this._trashc = $(`#trash_${dst}`);
    this._trashp = this._trashc.closest(`p`);
    this._trashc.click(function(e) {e.preventDefault();
        that.clear();
    });
    this._hide();
    this._on_clear = on_clear;
};

Msg.prototype = {
    _hide: function() {
        this._dst.hide();
        this._trashp.hide();
    },
    _show: function() {
        this._dst.show();
        if (this._dst.html() != ``) {
            this._trashp.show();
        }
    },
    clear: function() {
        this._dst.html(``);
        if (this._on_clear != undefined) {
            this._on_clear();
        }
        this._hide();
    },
    µmsg: function(text, kind) {
        if (kind == undefined) {
            kind = `info`;
        }
        var mtext = this._dst.html();
        this._dst.html(`${mtext}<p class="${kind}">${text}</p>`);
        this._show();
    },
};

