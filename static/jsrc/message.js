/* MESSAGES
 * ºMsg is a function that issues messages to a specified element.
 * It has also controls for clearing and hiding the messages.
 */

function ºMsg(ºdst, ºon_clear) {
    this.º_dst = $(`#${ºdst}`);
    this.º_trashc = $(`#trash_${ºdst}`);
    this.º_trashp = this.º_trashc.closest(`p`);
    this.º_trashc.click(function(ºe) {ºe.preventDefault();
        this.ºclear();
    }.bind(this));
    this.º_hide();
    this.º_on_clear = ºon_clear;
};

ºMsg.prototype = {
    º_hide: function() {
        this.º_dst.hide();
        this.º_trashp.hide();
    },
    º_show: function() {
        this.º_dst.show();
        if (this.º_dst.html() != ``) {
            this.º_trashp.show();
        }
    },
    ºclear: function() {
        this.º_dst.html(``);
        if (this.º_on_clear != undefined) {
            this.º_on_clear();
        }
        this.º_hide();
    },
    ºmsg: function(ºtext, ºkind) {
        if (ºkind == undefined) {
            ºkind = `info`;
        }
        var ºmtext = this.º_dst.html();
        this.º_dst.html(`${ºmtext}<p class="${ºkind}">${ºtext}</p>`);
        this.º_show();
    },
};

