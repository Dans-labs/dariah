/* INDIVIDUAL COMPONENT: ctype
 * This manages the facet "contribution type"
 */

const Relative = require('./relative.js');

function TadirahT(component) {
    Relative.call(this, component, 'tadiraht', 1, 30);
};

TadirahT.prototype = Object.create(Relative.prototype);
TadirahT.prototype.constructor = TadirahT;

module.exports = TadirahT;
