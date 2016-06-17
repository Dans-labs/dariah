/* MESSAGES
 * Msg is a function that issues messages to a specified element.
 * It has also controls for clearing and hiding the messages.
 */

function Msg(destination, on_clear) {
    this._destination = $(`#${destination}`);
    this._trash_control = $(`#trash_${destination}`);
    this._trash_control_para = this._trash_control.closest('p');
    this._trash_control.click(function(e) {e.preventDefault();
        this.clear();
    }.bind(this));
    this._hide();
    this._on_clear = on_clear;
};

Msg.prototype = {
    _hide: function() {
        this._destination.hide();
        this._trash_control_para.hide();
    },
    _show: function() {
        this._destination.show();
        if (this._destination.html() != '') {
            this._trash_control_para.show();
        }
    },
    clear: function() {
        this._destination.html('');
        if (this._on_clear != undefined) {
            this._on_clear();
        }
        this._hide();
    },
    msg: function(text, kind) {
        if (kind == undefined) {
            kind = 'info';
        }
        let message_text = this._destination.html();
        this._destination.html(`${message_text}<p class="${kind}">${text}</p>`);
        this._show();
    },
};

module.exports = Msg;
