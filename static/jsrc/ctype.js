/* INDIVIDUAL COMPONENT: ctype
 * This manages the facet "contribution type"
 */

let Relative = require('./relative.js');

function CType(component) {
    Relative.call(this, component, 'type');
};

CType.prototype = Object.create(Relative.prototype);
CType.prototype.constructor = CType;

module.exports = CType;
