/* INDIVIDUAL COMPONENT: ctype
 * This manages the facet "contribution type"
 */

let Relative = require('./relative.js');

function TadirahA(component) {
    Relative.call(this, component, 'tadiraha');
};

TadirahA.prototype = Object.create(Relative.prototype);
TadirahA.prototype.constructor = TadirahA;

module.exports = TadirahA;
