/* VIEW STATE
 * Contains the current state, based on request variables and local storage.
 * Request variables have precedence over local storage.
 * Request variables are checked and validated and translated, translated values go to local storage.
 * There is a list of recognized request variables, with their types and allowable values.
 */

import * as g from './generic.js';
import Msg from './message';

/* private attributes as symbols */
const _spec_info = Symbol()
const _data = Symbol()
const _specs = Symbol()
const _msg = Symbol()

export default class {
    constructor(page) {
        this[_spec_info] = {
            vars: new Set([
                'list',
                'flt_contrib',
                'flt_country',
                'flt_type',
                'flt_tadiraha',
                'flt_tadiraho',
                'flt_tadiraht',
                'rel_country_contrib',
                'rel_type_contrib',
                'rel_tadiraha_contrib',
                'rel_tadiraho_contrib',
                'rel_tadiraht_contrib',
                'item_contrib',
                'item_country',
                'sort', 
            ]),
            vals: new Map([
                ['list', new Set([
                    'contrib',
                    'country',
                    'type',
                    'tadiraha',
                    'tadiraho',
                    'tadiraht',
                ])],
                ['sort', new Map([
                    ['v', true],
                    ['x', false],
                ])],
            ]),
            default_value: new Map([
                ['list', 'contrib'],
                ['sort', true],
            ]),
            typ: new Map([
                ['sort', 'boolean'],
            ]),
            url: new Set([
                'list',
                'item_contrib',
                'item_country',
            ]),
            showas: new Map([
                ['list', new Map([
                    ['contrib', {sg: 'contribution', pl: 'contributions'}],
                    ['country', {sg: 'country', pl: 'countries'}],
                    ['type', {sg: 'type', pl: 'types'}],
                    ['tadiraha', {sg: 'tadirah activity', pl: 'tadirah activities'}],
                    ['tadiraho', {sg: 'tadirah object', pl: 'tadirah objects'}],
                    ['tadiraht', {sg: 'tadirah technique', pl: 'tadirah techniques'}],
                ])],
            ]),
        };
        this[_data] = {}; // this should be an object and not a collection such as Map. Otherwise it does not function well with popstate.
        this[_specs] = new Map();
        this.page = page;
        this[_msg] = new Msg('msg_page');
        this._compile_specs();
        this._getInitstate();
        this._addHistory();
    }
    _compile_specs() {
        const info = this[_spec_info];
        for (const v of info.vars) {
            const spec = {};
            spec.vals = info.vals.get(v) || null;
            spec.default_value = info.default_value.get(v) || '';
            spec.typ = info.typ.get(v) || 'string';
            spec.url = info.url.has(v);
            spec.showas = info.showas.get(v) || {};
            this[_specs].set(v, spec);
        }
    }
    _validate(v, val) {
        let newval, message;
        if (this[_specs].has(v)) {
            const spec = this[_specs].get(v);
            if (spec.typ == 'string') {
                if (spec.vals) {
                    if (spec.vals.has(val)) {
                        newval = val;
                    }
                    else {
                        newval = spec.default_value;
                        this[_msg].msg(`illegal string value for ${v}: "${val}" is replaced by "${spec.default_value}"`, 'warning');
                    }
                }
                else {
                    newval = val;
                }
            }
            else if (spec.typ == 'integer') {
                if (/^(\-|\+)?[0-9]+$/.test(val)) {
                    newval = Number(val);
                }
                else {
                    newval = spec.default_value;
                    this[_msg].msg(`not a number value for ${v}: "${val}" is replaced by "${spec.default_value}"`, 'warning');
                }
                if (newval < spec.limits.min) {
                    this[_msg].msg(`number to small for ${v}: "${newval}" is replaced by "${spec.limits.min}"`, 'warning');
                }
                if (newval > spec.limits.max) {
                    this[_msg].msg(`number to big for ${v}: "${newval}" is replaced by "${spec.limits.max}"`, 'warning');
                }
            }
            else if (spec.typ == 'boolean') {
                if (spec.vals.has(val)) {
                    newval = spec.vals.get(val);
                }
                else {
                    newval = spec.default_value;
                    this[_msg].msg(`illegal boolean value for ${v}: "${val}" is replaced by "${spec.default_value}"`, 'warning');
                }
            }
        }
        else {
            newval = null;
            this[_msg].msg(`unknown parameter: ${v}=${val}`, 'warning');
        }
        return newval;
    }
    getVars(comprehensive) {
        const vars = [];
        for (const v in this[_data]) {
            const val = this[_data][v]
            const spec = this[_specs].get(v);
            if (comprehensive || spec.url) {
                if (spec.typ == 'string' || spec.typ == 'integer') {vars.push(`${v}=${val}`)}
                else if (spec.typ == 'boolean') {
                    for (const [valid_val, trans_val] of spec.vals) {
                        if (trans_val == val) {vars.push(`${v}=${valid_val}`)}
                    }
                }
            }
        }
        return vars.join('&')
    }
    _getInitstate() {
        for (const [v, val] of g.request_vars) {
            if (!(this[_specs].has(v))) {
                this[_msg].msg(`unknown parameter: ${v}=${val}`, 'warning');
            }
        }
        for (const [v, spec] of this[_specs]) {
            let val = null;
            if (g.request_vars.has(v)) {
                const raw_val = g.request_vars.get(v);
                val = this._validate(v, raw_val);
                g.localstorage_vars.set(v, val);
            }
            else if (g.localstorage_vars.isSet(v)) {
                val = g.localstorage_vars.get(v);
            }
            else {
                val = spec.default_value;
                g.localstorage_vars.set(v, val);
            }
            this[_data][v] = val;
        }
    }
    _addHistory(title, view_url) {
        const tit = 'DARIAH contribution tool';
        const this_url = `${app_url}?${this.getVars(false)}`;
        History.pushState(this[_data], tit, this_url);
    }
    setState(v, val) {
        this[_data][v] = val;
        g.localstorage_vars.set(v, val);
        this._addHistory();
    }
    getState(v) {
        return this[_data][v];
    }
    getValues(v) {
        return this[_specs].get(v).vals;
    }
    showState(v, val, mode) {
        let result = val;
        const md = (mode == undefined)?'sg':mode;
        const showas = this[_specs].get(v).showas;
        if (showas.has(val)) {
            result = showas.get(val)[mode];
        }
        return result;
    }
    work() {
        return function () {
            const state = History.getState();
            if (state && state.data) {
                this[_data] = state.data;
                this.page.work();
            }
        }.bind(this)
    }
}
