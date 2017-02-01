import React, { Component } from 'react'

import RelSelect from './RelSelect.jsx'

import { getData } from '../helpers/data.js'
import { withContext, saveState } from '../helpers/hoc.js'

const sizes = {
  url: 50,
  email: 30,
  range: 6,
  datetime: 25,
  text: 50,
  _max: 50,
}

const readonlyMakeFragment = obj => ({
  url: obj.urlFragment.bind(obj),
  email: obj.emailFragment.bind(obj),
  markdown: obj.markdownFragment.bind(obj),
  _default: obj.defaultFragment.bind(obj),
})

const editMakeFragment = obj => ({
  rel: obj.relEditFragment.bind(obj),
  textarea: obj.textareaEditFragment.bind(obj),
  _default: obj.defaultEditFragment.bind(obj),
})

const normalizeValues = ({initValues}) => {
  const savedValues = (initValues == null) ? [] : initValues;
  const curValues = [...savedValues];
  return { curValues, savedValues, reasons: {}, saving: {}, changed: false, valid: true, relValues: null }
}

const userAsString = (valRaw, usersMap) => {
  const valId = valRaw._id;
  let valRep;
  if (!usersMap.has(valId)) {
    valRep = 'UNKNOWN';
  }
  else {
    const userData = usersMap.get(valId);
    const fname = userData.firstName || '';
    const lname = userData.lastName || '';
    const email = userData.email || '';
    const eppn = userData.eppn || '';
    const authority = userData.authority || '';
    const mayLogin = userData.mayLogin?'yes':'no';
    let linkText = [fname, lname].filter(x => x).join(' '); 
    if (linkText == '') {linkText = email}
    const namePart = (linkText && email)? (
      `[${linkText}](mailto:${email})`
    ) : (
      linkText+email
    );
    const eppnPart = eppn?` eppn=${eppn} `:'';
    const authorityPart = authority?` authenticated by=${authority} `:'';
    const mayLoginPart = mayLogin?` active=${mayLogin} `:'';
    valRep = [namePart, eppnPart, authorityPart, mayLoginPart].filter(x => x).join('; ');
  }
  return valRep
}

const countryAsString = (valRaw, countriesMap) => {
  const valId = valRaw._id;
  let valRep;
  if (!countriesMap.has(valId)) {
    valRep = 'UNKNOWN';
  }
  else {
    const countryData = countriesMap.get(valId);
    valRep = countryData.name;
  }
  return valRep
}

const validate = (val, valType, validation) => {
  let rawVal = val;
  let vstatus = true;
  let reason = '';
  if (validation.nonEmpty && (val == null || val == '')) {
    reason = `field may not be empty`;
    vstatus =  false;
  }
  if (validation.min != null || validation.max != null) {
    if (isNaN(val)) {
      reason = `value must be a number`;
      vstatus = false;
    }
    else {
      const valn = parseInt(val);
      if (!(validation.min <= valn)){
        reason = `value must be at least ${validation.min}`;
        vstatus = false;
      }
        if (!(validation.max >= val)) {
        reason = `value must be at most ${validation.max}`;
        vstatus = false;
      }
    }
  }
  if (valType == 'datetime') {
    let times;
    try {
      times = Date.parse(val);
    }
    catch (error) {
      reason = `not a valid date/time - ${error}`;
      vstatus = false;
      rawVal = val;
    }
    if (isNaN(times)) {
      reason = `not a valid date/time`;
      vstatus = false;
      rawVal = val;
    }
    else {
      rawVal = {'$date': times}
    }
  }
  return { rawVal, vstatus, reason};
}

/**
 * @class
 * @classdesc
 *
 * **stateful** {@link external:Component|Component}
 *
 * ## A single contribution record
 *
 * Displays all fields that the user is entitled to read.
 * With a control to edit the record.
 * 
 * For the actual editing I intend to use
 * {@link https://github.com/kaivi/riek|React Inline Edit Kit}
 *
 */
class ContribField extends Component {
/**
 *
 * @method
 * @param {Contrib[]} contribdata (from *state*) The list of contribution records as it comes form mongo db,
 * plus a list of fields that is provided for each row (dependent on user permissions)
 * @returns {Fragment}
*/

  setValToState(i, newVal, _id, doSave) {
    const { reasons } = this.state;
    let newReasons;
    let newValues = [...this.state.curValues];
    if (newVal == null) {
      newValues = newValues.filter((x,j) => j != i) 
      newReasons = reasons;
    }
    else {
      const { valType, validation } = this.props;
      const { rawVal, vstatus, reason } = validate(newVal, valType, validation);
      const sVal = (rawVal == null)?newVal:rawVal
      const sendVal = (_id == null)? sVal:{ _id, value: sVal }
      const refI = (i == -1)?newValues.length:i;
      if (i == -1) {newValues.push(sendVal)}
      else {newValues[i] = sendVal}
      newReasons = {...this.state.reasons, [refI]: reason};
    }
    const { valid, changed } = this.checkForSave({ newValues, newReasons });
    if (!doSave || !valid || !changed) {
      this.setState({
        ...this.state,
        curValues: newValues,
        reasons: newReasons,
        saving: {},
        valid,
        changed,
      })
    }
    else {
      this.toDb(newValues);
    }
  }

  changeVal(i, event) {
    event.preventDefault();
    this.setValToState(i, event.target.value, null, false);
  }

  keyUp(i, event) {
    if (event.keyCode === 13) {
      event.target.blur();
      this.setValToState(i, event.target.value, null, true);
    }
  }

  changeRelVal(i, _id, value) {
    this.setValToState(i, value, _id, true);
  }

  removeVal(i, _id, event) {
    event.preventDefault();
    this.setValToState(i, null, null, true);
  }

  checkForSave(info) {
    const { newValues, newReasons } = info;
    const { rowId, valType, validation, multiple, allowNew } = this.props;
    const { savedValues } = this.state;
    const valid = Object.keys(newReasons).every(i => !newReasons[i]);
    let changed = false;
    if (newValues.length != savedValues.length) {
      changed = true
    }
    else {
      for (const i in newValues) {
        const cv = newValues[i];
        const sv = savedValues[i];
        if (sv == null) {
          changed = true
        }
        else if (typeof cv == 'object') {
          for (const k of Object.keys(cv)) {
            if (cv[k] != sv[k]) {
              changed = true;
              break;
            }
          }
        }
        else {
          if (cv != sv) {
            changed = true;
          }
        }
        if (changed) {
          break;
        }
      }
    }
    return { valid , changed }
  }

  saveField() {
    const { valid, changed } = this.state;
    if (valid && changed) {
      this.toDb();
    }
  }

  saved(data) {
    if (data == null) {
      this.setState({
        ...this.state,
        saving: {status: 'error'},
      });
    }
    else {
      this.setState({
        ...this.state,
        saving: {status: 'saved'},
        savedValues: data,
        curValues: data,
        changed: false,
        valid: true,
      });
    }
  }

  toDb(newValues) {
    const { curValues } = this.state;
    const { name, rowId, valType } = this.props;
    let sendValues = (newValues == null)?curValues:newValues;
    if (valType == 'datetime') {
      sendValues = sendValues.map(v => (new Date(v['$date'])).toISOString());
    }
    this.setState({
      ...this.state,
      saving: {status: 'saving'},
    });
    getData([
        {
          type: 'db',
          path: '/item_contrib?action=update',
          branch: `save ${name}`,
          callback: this.saved.bind(this),
          data: {_id: rowId, name, values: sendValues},
        },
      ],
      this,
      this.props.notification.component
    );
  }

  valueAsString(valRaw) {
    const { valType, convert, usersMap, countriesMap } = this.props;
    switch (valType) {
      case 'rel': {
        switch (convert) {
          case 'user': {
            return userAsString(valRaw, usersMap)
          }
          case 'country': {
            return countryAsString(valRaw, countriesMap)
          }
          default: {return valRaw.value}
        }
      }
      case 'datetime': {
        return (typeof valRaw == 'string')?valRaw:(new Date(valRaw['$date'])).toISOString();
      }
      default: {return valRaw}
    }
  }

  urlFragment(i, classNames, text) {
    return <a key={i} target="_blank" href={text} className={classNames.join(' ')}>{text}</a>
  }
  emailFragment(i, classNames, text) {
    return <a key={i} target="_blank" href={`mailto:${text}`} className={classNames.join(' ')}>{text}</a>
  }
  markdownFragment(i, classNames, text) {
    return <span key={i} className={classNames.join(' ')}>{text}</span>
  }
  defaultFragment(i, classNames, text) {
    return <span key={i} className={classNames.join(' ')}>{text}</span>
  }

  relOptions() {
    const { relValues } = this.state;
    return relValues.map(rv => [rv._id, rv.value])
  }
  userOptions() {
    const { usersMap } = this.props;
    return [...usersMap.values()].map(rv => [rv._id,  this.valueAsString(rv)])
  }
  countryOptions() {
    const { countriesMap } = this.props;
    return [...countriesMap.values()].map(rv => [rv._id,  this.valueAsString(rv)])
  }

  relSelect(i, _id, classNames, text) {
    const { convert, allowNew, name } = this.props;
    const valueList = (convert == 'user')? this.userOptions() : ((convert == 'country')? this.countryOptions() : this.relOptions())
    return <RelSelect
      tag={`${name}_${_id}_${i}`}
      key={i}
      isNew={i == -1}
      allowNew={allowNew}
      valueList={valueList}
      initVal={_id}
      initText={text}
      onChange={this.changeRelVal.bind(this, i)}
      classNames={classNames}
    />
  }
  relEditFragment(i, _id, classNames, text) {
    const { multiple } = this.props;
    return (!multiple && i == 0)? (
      this.relSelect(i, _id, classNames, text)
    ) : (
      <span key={i} className={classNames.join(' ')}>{text}
        <span
          className="xtag fa fa-close"
          onClick={this.removeVal.bind(this, i, _id)}
        />
      </span>
    )
  }
  textareaEditFragment(i, _id, classNames, text, cols=100, rows=10) {
    return (
      <textarea key={i}
        className={classNames.join(' ')}
        defaultValue={text}
        onChange={this.changeVal.bind(this, i)}
        cols={cols}
        rows={rows}
        wrap="soft"
      />
    )
  }
  defaultEditFragment(i, _id, classNames, text, size=50) {
    return (
      <input key={i} type="text"
        className={classNames.join(' ')}
        defaultValue={text}
        onChange={this.changeVal.bind(this, i)}
        onKeyUp={this.keyUp.bind(this, i)}
        size={size}
      />
    )
  }

  valuesAsReadonly() {
    const { curValues } = this.state;
    const {name } = this.props;
    if (curValues.length == 0) {return <span className='absent'>no value</span>}
    const { valType, multiple } = this.props;
    const methods = readonlyMakeFragment(this);
    const makeFragment = methods[valType] || methods._default;
    const progIcon = 'fa fa-circle-o progress';
    const fragments = [
      <span key={name} className={progIcon}/>
    ];
    fragments.push(' ');
    curValues.forEach((v, i) => {
      const text = this.valueAsString(v);
      const classNames = ['value', valType];
      const fragment = makeFragment(i, classNames, text);
      if (multiple || i == 0) {fragments.push(fragment)}
      if (multiple) {fragments.push(' ')}
    });
    return fragments
  }

  valuesAsControls() {
    const { curValues, reasons, saving, valid, changed } = this.state;
    const { name, valType, multiple, validation, allowNew } = this.props;
    const methods = editMakeFragment(this);
    const makeFragment = methods[valType] || methods._default;
    const cs = saving.status;
    let progIcon;
    if (cs == 'saving') {progIcon = 'fa-spinner fa-spin'}
    else if (cs == 'saved') {progIcon = 'fa-check saved'}
    else if (cs == 'error') {progIcon = 'fa-exclamation error'}
    else if (!valid) {progIcon = 'fa-close invalid'}
    else if (changed) {progIcon = 'fa-pencil changed'}
    else {progIcon = 'fa-circle'}
    progIcon += ' fa progress';
    const fragments = []
    fragments.push(<span key={name} className={progIcon}/>);
    curValues.forEach((v, i) => {
      const text = this.valueAsString(v);
      const _id = v._id;
      const classNames = ['value', valType];
      const reason = reasons[i] || '';
      if (reason != '') {
        classNames.push('invalid');
      }
      const size = sizes[valType] || sizes._max;
      const fragment = makeFragment(i, _id, classNames, text, size);
      if (multiple || i == 0) {
        fragments.push(fragment);
        if (reason != '') {
          fragments.push(' ');
          fragments.push(<span key={`r_${i}`} className="reason">{reason}</span>)
        }
      }
      if (multiple) {
        fragments.push(' ');
        if ((i == curValues.length - 1) && (valType == 'rel')) {
          fragments.push(this.relSelect(-1, null, classNames, null));
        }
      }
      
    });
    return fragments
  }

  render() {
    const { relValues } = this.state;
    const { editable, valType, convert } = this.props;
    const { usersMap, countriesMap } = this.props;
    if (editable && relValues == null && valType == 'rel' && convert != 'user' && convert != 'country') {
      return null;
    }
    return editable ? (
      <div className="editable" onBlur={this.saveField.bind(this)}>{this.valuesAsControls()}</div>
    ):(
      <div className="readonly">{this.valuesAsReadonly()}</div>
    )
  }

/**
 * @method
 * @param {Contrib[]} contribs (from *state*) The list of contribution records as it comes form mongo db
 * @returns {Object} The data fetched from the server.
*/
  componentDidMount() {
    let { relValues } = this.state;
    const { valType, getValues, convert, usersMap, countriesMap } = this.props;
    if (valType == 'rel' && convert != 'user' && convert != 'country' && relValues == null) {
      getData([
          {
            type: 'db',
            path: getValues,
            branch: 'relValues'
          },
        ],
        this,
        this.props.notification.component
      );
    }
  }
}

export default withContext(saveState(ContribField, 'ContribField', normalizeValues))
