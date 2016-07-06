/* MESSAGES
 * Msg is a function that issues messages to a specified element.
 * It has also controls for clearing and hiding the messages.
 */

/* private attributes as symbols */
const _destination = Symbol();
const _trash_control = Symbol();
const _trash_control_para = Symbol();
const _on_clear = Symbol();

export default class {
    constructor(destination, on_clear) {
        this[_destination] = $(`#${destination}`);
        this[_trash_control] = $(`#trash_${destination}`);
        this[_trash_control_para] = this[_trash_control].closest('p');
        this[_trash_control].click(e => {e.preventDefault();
            this.clear();
        });
        this._hide();
        this[_on_clear] = on_clear;
    }
    _hide() {
        this[_destination].hide();
        this[_trash_control_para].hide();
    }
    _show() {
        this[_destination].show();
        if (this[_destination].html() != '') {
            this[_trash_control_para].show();
        }
    }
    clear() {
        this[_destination].html('');
        if (this[_on_clear] != undefined) {
            this[_on_clear]();
        }
        this._hide();
    }
    msg(text, kind) {
        if (kind == undefined) {
            kind = 'info';
        }
        let message_text = this[_destination].html();
        this[_destination].html(`${message_text}<p class="${kind}">${text}</p>`);
        this._show();
    }
}
