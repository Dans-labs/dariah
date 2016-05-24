/* MESSAGES
 * ºMsg is a function that issues messages to a specified element.
 * It has also controls for clearing and hiding the messages.
 */

function ºMsg(ºdestination, ºon_clear) {
    this.º_destination = $(`#${ºdestination}`);
    this.º_trash_control = $(`#trash_${ºdestination}`);
    this.º_trash_control_para = this.º_trash_control.closest(`p`);
    this.º_trash_control.click(function(ºe) {ºe.preventDefault();
        this.ºclear();
    }.bind(this));
    this.º_hide();
    this.º_on_clear = ºon_clear;
};

ºMsg.prototype = {
    º_hide: function() {
        this.º_destination.hide();
        this.º_trash_control_para.hide();
    },
    º_show: function() {
        this.º_destination.show();
        if (this.º_destination.html() != ``) {
            this.º_trash_control_para.show();
        }
    },
    ºclear: function() {
        this.º_destination.html(``);
        if (this.º_on_clear != undefined) {
            this.º_on_clear();
        }
        this.º_hide();
    },
    ºmsg: function(ºtext, ºkind) {
        if (ºkind == undefined) {
            ºkind = `info`;
        }
        var ºmessage_text = this.º_destination.html();
        this.º_destination.html(`${ºmessage_text}<p class="${ºkind}">${ºtext}</p>`);
        this.º_show();
    },
};

