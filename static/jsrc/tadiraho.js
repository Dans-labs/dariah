/* INDIVIDUAL COMPONENT: ctype
 * This manages the facet "contribution type"
 */

let Relative = require('./relative.js');

function TadirahO(component) {
    Relative.call(this, component, 'tadiraho');
};

TadirahO.prototype = Object.create(Relative.prototype);
TadirahO.prototype.constructor = TadirahO;

module.exports = TadirahO;
