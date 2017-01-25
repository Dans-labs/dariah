import React, { Component } from 'react'

import { getData } from '../helpers/data.js'
import { withContext, saveState } from '../helpers/hoc.js'

const normalizeValues = ({initValues}) => {
  const savedValues = (initValues == null) ? [] : initValues;
  const curValues = [...savedValues];
  return { curValues, savedValues, reasons: {}, save: {}, relValues: null }
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
    if (!linkText) {linkText = email}
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
    console.log('VALIDATE val=', val);
    let times;
    try {
      times = Date.parse(val);
    }
    catch (error) {
      reason = `not a valid date/time - ${error}`;
      vstatus = false;
      rawVal = null;
    }
    if (isNaN(times)) {
      reason = `not a valid date/time`;
      vstatus = false;
      rawVal = null;
    }
    else {
      rawVal = {'$date': times}
    }
  }
  console.log(vstatus);
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

  newValToState(i, newVal, reason) {
    const newValues = [...this.state.curValues];
    newValues[i] = newVal;
    this.setState({
      ...this.state,
      curValues: newValues,
      reasons: {...this.state.reasons, [i]: reason}
    })
  }

  newSaveToState(newValues) {
    this.setState({
      ...this.state,
      savedValues: [...newValues],
    })
  }

  changeVal(i, _id, event) {
    event.preventDefault();
    const { valType, validation } = this.props;
    const newVal = event.target.value;
    const { rawVal, vstatus, reason } = validate(newVal, valType, validation);
    const sendVal = { _id }
    if (rawVal != null) {
      sendVal.value = rawVal
    }
    else {
      sendVal.dvalue = newVal
    }
    this.newValToState(i, sendVal, reason);
  }

  saveField(event) {
    const { name, rowId, valType, validation, convert, multiple, allowNew } = this.props;
    const { savedValues, curValues, reasons } = this.state;
    const valid = Object.keys(reasons).every(i => !reasons[i]);
    let changed = false;
    console.log(savedValues, curValues);
    if (curValues.length != savedValues.length) {
      changed = true
    }
    else {
      for (const i in curValues) {
        const cv = curValues[i];
        const sv = savedValues[i];
        for (const k of Object.keys(cv)) {
          if (cv[k] != sv[k]) {
            changed = true;
            break;
          }
        }
        if (changed) {
          break;
        }
      }
    }
        
    if (!valid || !changed) {
      console.log('not saving');
      return
    }
    console.log('saving');
    this.newSaveToState(curValues);
  }

  valueAsString(valRaw) {
    const { valType, convert, usersMap } = this.props;
    const valdval = valRaw.dvalue;
    if (valdval != null) {
      return valdval
    }
    const valval = valRaw.value;
    switch (valType) {
      case 'rel': {
        switch (convert) {
          case 'user': {return userAsString(valRaw, usersMap)}
          case 'country': {return `${valRaw._id}=${valval}`}
          default: {return valval}
        }
      }
      case 'datetime': {return (new Date(valval['$date'])).toISOString()}
      default: {return valval}
    }
  }

  valuesAsReadonly() {
    const { curValues } = this.state;
    if (curValues.length == 0) {return <span className='absent'>no value</span>}
    const { valType, multiple, convert } = this.props;
    const fragments = [];
    curValues.forEach((v, i) => {
      const text = this.valueAsString(v);
      const classNames = ['value', valType];
      let fragment;
      switch (valType) {
        case 'url': {
          fragment = <a key={i} target="_blank" href={text} className={classNames.join(' ')}>{text}</a>;
          break
        }
        case 'email': {
          fragment = <a key={i} target="_blank" href={`mailto:${text}`} className={classNames.join(' ')}>{text}</a>;
          break;
        }
        case 'markdown': {
          fragment = <span key={i} className={classNames.join(' ')}>{text}</span>;
          break;
        }
        default: {
          fragment = <span key={i} className={classNames.join(' ')}>{text}</span>;
          break;
        }
      }
      if (multiple || i == 0) {fragments.push(fragment)}
      if (multiple) {fragments.push(' ')}
    });
    return fragments
  }

  valuesAsControls() {
    const { curValues, reasons } = this.state;
    const { name, valType, multiple, validation, allowNew } = this.props;
    const fragments = [];
    curValues.forEach((v, i) => {
      const text = this.valueAsString(v);
      const _id = v._id;
      const classNames = ['value', valType];
      const reason = reasons[i] || '';
      if (reason != '') {
        classNames.push('invalid');
      }
      let fragment;
      switch (valType) {
        case 'rel': {
          fragment = (<span key={i}
            className={classNames.join(' ')}
          >{text}</span>);
          break
        }
        case 'url': {
          fragment = (<input key={i} type="text"
            className={classNames.join(' ')}
            defaultValue={text}
            onChange={this.changeVal.bind(this, i, _id)}
            size="50"
          />);
          break
        }
        case 'email': {
          fragment = (<input key={i} type="text"
            className={classNames.join(' ')}
            defaultValue={text}
            onChange={this.changeVal.bind(this, i, _id)}
            size="50"
          />);
          break
        }
        case 'datetime': {
          fragment = (<input key={i} type="text"
            className={classNames.join(' ')}
            defaultValue={text}
            onChange={this.changeVal.bind(this, i, _id)}
            size="50"
          />);
          break
        }
        case 'range': {
          fragment = (<input key={i} type="text"
            className={classNames.join(' ')}
            defaultValue={text}
            onChange={this.changeVal.bind(this, i, _id)}
          />);
          break
        }
        case 'textarea': {
          fragment = (<textarea key={i}
            className={classNames.join(' ')}
            defaultValue={text}
            onChange={this.changeVal.bind(this, i, _id)}
            rows="10"
            cols="50"
            wrap="soft"
          />);
          break;
        }
        case 'text': {
          classNames.push(valType);
          fragment = (<input key={i} type="text"
            className={classNames.join(' ')}
            defaultValue={text}
            onChange={this.changeVal.bind(this, i, _id)}
            size="50"
          />);
          break;
        }
      }
      if (multiple || i == 0) {
        fragments.push(fragment);
        if (reason != '') {
          fragments.push(' ');
          fragments.push(<span key={`r_${i}`} className="reason">{reason}</span>)
        }
      }
      if (multiple) {fragments.push(' ')}
    });
    return fragments
  }

  render() {
    const { relValues } = this.state;
    const { editable, valType } = this.props;
    if (editable && relValues == null && (valType == 'rel')) {
      return null;
    }
    return editable ? (
      <p className="editable" onBlur={this.saveField.bind(this)}>{this.valuesAsControls()}</p>
    ):(
      <p className="readonly">{this.valuesAsReadonly()}</p>
    )
  }

/**
 * @method
 * @param {Contrib[]} contribs (from *state*) The list of contribution records as it comes form mongo db
 * @returns {Object} The data fetched from the server.
*/
  componentDidMount() {
    const { relValues } = this.state;
    const { valType, getValues } = this.props;
    if (valType == 'rel' && relValues == null) {
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
