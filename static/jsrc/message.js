/* MESSAGES
 * Msg is a function that issues messages to a specified element.
 * It has also controls for clearing and hiding the messages.
 */

function Msg(dest, on_clear) {
    var that = this;
    this.dest = $(`#${dest}`);
    this.trashc = $(`#trash_${dest}`);
    this.trashp = this.trashc.closest(`p`);
    this.trashc.click(function(e) {e.preventDefault();
        that.clear();
    });
    this.trashp.hide();
    this.on_clear = on_clear;
};

Msg.prototype = {
    clear: function() {
        this.dest.html(``);
        if (this.on_clear != undefined) {
            this.on_clear();
        }
        this.trashp.hide();
        this.dest.hide();
    },
    hide: function() {
        this.dest.hide();
        this.trashp.hide();
    },
    show: function() {
        this.dest.show();
        if (this.dest.html() != ``) {
            this.trashp.show();
        }
    },
    msg: function(text, kind) {
        if (kind == undefined) {
            kind = `info`;
        }
        var mtext = this.dest.html();
        this.dest.html(`${mtext}<p class="${kind}">${text}</p>`);
        this.dest.show();
        this.trashp.show();
    },
};

