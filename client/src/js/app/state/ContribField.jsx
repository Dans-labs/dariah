import React, { Component } from 'react'
import Markdown from 'react-markdown'

import RelSelect from 'RelSelect.jsx'
import Alternatives from 'Alternatives.jsx'

import { getData } from 'data.js'
import { withContext, saveState } from 'hoc.js'

const sizes = {
  url: 50,
  email: 30,
  range: 6,
  datetime: 25,
  text: 50,
  _max: 50,
}

const trimDate = text => ({ full: text, text: (text == null) ? '' : (text.replace(/\.[0-9]+/, ''))})

const condense = text => ({ full: text, text: (text == null) ? '' : ((text.length > 20)?`${text.slice(0,8)}...${text.slice(-8)}`:text)})

const readonlyMakeFragment = obj => ({
  url: obj.urlFragment.bind(obj),
  email: obj.emailFragment.bind(obj),
  textarea: obj.textareaFragment.bind(obj),
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
  let valShort;
  if (!usersMap.has(valId)) {
    valRep = 'UNKNOWN';
    valShort = '??';
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
    valShort = [fname, lname, eppn].filter(x => x).slice(0, 2).join(' ');
  }
  return {text: valShort , full: valRep}
}

const countryAsString = (valRaw, countriesMap) => {
  const valId = valRaw._id;
  let valRep;
  let valShort;
  if (!countriesMap.has(valId)) {
    valRep = 'UNKNOWN';
    valShort = '??';
  }
  else {
    const countryData = countriesMap.get(valId);
    valShort = countryData.name;
    valRep = `${countryData.iso}: ${countryData.name}`;
  }
  return {text: valShort, full:valRep}
}

const validate = (val, valType, validation) => {
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
    }
    if (isNaN(times)) {
      reason = `not a valid date/time`;
      vstatus = false;
    }
  }
  return { vstatus, reason };
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
 */
class ContribField extends Component {
/**
 *
 * @method
 * @param {Contrib[]} contribData (from *state*) The list of contribution records as it comes form mongo db,
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
      const { vstatus, reason } = validate(newVal, valType, validation);
      const sendVal = (valType == 'rel')? ((typeof newVal != 'string')? newVal : { _id, value: newVal }) : newVal;
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
    const { rowId, name, valType, validation, multiple, allowNew, updEdit } = this.props;
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
    updEdit(name, changed, valid, newValues);
    return { valid , changed }
  }

  saveField() {
    const { valid, changed, saving } = this.state;
    if (valid && changed && !saving.status) {
      this.toDb();
    }
  }

  saved(data) {
    const { name, updMod, updEdit } = this.props;
    if (data == null) {
      this.setState({
        ...this.state,
        saving: {status: 'error'},
      });
    }
    else {
      const { [name]: newValues, ...modValues } = data;
      this.setState({
        ...this.state,
        saving: {status: 'saved'},
        savedValues: newValues,
        curValues: newValues,
        changed: false,
        valid: true,
      });
      updMod(modValues);
      updEdit(name, false, true, newValues);
    }
  }

  toDb(newValues) {
    const { curValues } = this.state;
    const { name, rowId, valType } = this.props;
    let sendValues = (newValues == null)?curValues:newValues;
    /*
    if (valType == 'datetime') {
      sendValues = sendValues.map(v => dtm(v));
    }
    */
    this.setState({
      ...this.state,
      reasons: {},
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

  fullfillSave() {
    const { editable, saveConcern } = this.props;
    const { name } = this.props;
    if (editable && saveConcern) { this.saveField() }
  }

  valueAsString(valRaw) {
    const { valType, convert, usersMap, countriesMap, initial } = this.props;
    if (valRaw == null) {return { text: '', full: '', initial: (valType == 'rel')? true : initial }}
    switch (valType) {
      case 'rel': {
        switch (convert) {
          case 'user': {
            return userAsString(valRaw, usersMap)
          }
          case 'country': {
            return countryAsString(valRaw, countriesMap)
          }
          default: {return condense(valRaw.value)}
        }
      }
      case 'datetime': {
        return trimDate(valRaw);
      }
      default: {
        return {text: valRaw, full: valRaw}
      }
    }
  }

  urlFragment(i, valType, valText) {
    const { text, full } = valText;
    return <a key={i} target="_blank" href={full} className="link">{text}</a>
  }
  emailFragment(i, valType, valText) {
    const { text, full } = valText;
    return <a key={i} target="_blank" href={`mailto:${full}`} className="link">{full}</a>
  }
  textareaFragment(i, valType, valText) {
    const { text, full } = valText;
    return (
      <Markdown
        key={i}
        source={full}
      />
    )
    //return <p key={i} className="varia-large">{full}</p>
  }
  defaultFragment(i, valType, valText) {
    const { text, full } = valText;
    const cl = `${(valType == 'rel')?'tag':'varia'}-medium`;
    return <span key={i} className={cl} title={full}>{text}</span>
  }

  relOptions() {
    const { relValues } = this.state;
    return relValues.map(rv => [rv._id, condense(rv.value)])
  }
  userOptions() {
    const { usersMap } = this.props;
    return [...usersMap.values()].map(rv => [rv._id,  this.valueAsString(rv)])
  }
  countryOptions() {
    const { countriesMap } = this.props;
    return [...countriesMap.values()].map(rv => [rv._id,  this.valueAsString(rv)])
  }

  relSelect(i, _id, isNew, extraClasses, valText) {
    const { text, full } = valText;
    const { convert, allowNew, name, rowId } = this.props;
    const { valid } = this.state;
    const valueList = (convert == 'user')? this.userOptions() : ((convert == 'country')? this.countryOptions() : this.relOptions())
    return <RelSelect
      tag={`relselect_${rowId}_${name}_${i}`}
      key={i}
      isNew={isNew}
      allowNew={allowNew}
      valid={valid}
      valueList={valueList}
      initVal={_id}
      initText={text}
      initFull={full}
      onChange={this.changeRelVal.bind(this, i)}
      extraClasses={extraClasses}
    />
  }
  editValControl(i, _id, isNew) {
    const { multiple } = this.props;
    return (isNew || !multiple)? null : (
      <span
        className="button-small fa fa-close"
        onClick={this.removeVal.bind(this, i, _id)}
      />
    )
  }

  relEditFragment(i, _id, isNew, valType, extraClasses, valText) {
    const { text, full } = valText;
    const { multiple } = this.props;
    return ((!multiple && i == 0) || isNew)? (
      this.relSelect(i, _id, isNew, extraClasses, valText)
    ) : (
      <span key={i} className="tag-medium" title={full}>{text}{' '}
        {this.editValControl(i, _id, isNew)}
      </span>
    )
  }
  textareaEditFragment(i, _id, isNew, valType, extraClasses, valText, cols=100, rows=10) {
    const { rowId, name } = this.props;
    const { text, full } = valText;
    this.saveLater = true;
    return (
      <Alternatives key={i} tag={`md_${rowId}_${name}`}
        controlPlacement={control => (<p className="stick">{control}</p>)}
        controls={[
          (handler => <span className="button-small fa fa-pencil" onClick={handler}/>),
          (handler => <span className="button-small fa fa-hand-o-down" onClick={handler}/>),
        ]}
        alternatives={[
          <Markdown
            source={full}
          />,
          <span>
            <textarea
              className={`input ${valType} ${extraClasses.join(' ')}`}
              value={full}
              onChange={this.changeVal.bind(this, i)}
              cols={cols}
              rows={rows}
              placeholder={valText.initial}
              wrap="soft"
            />
            {this.editValControl(i, _id, isNew)}
          </span>
        ]}
        initial={0}
      />
    )
  }
  defaultEditFragment(i, _id, isNew, valType, extraClasses, valText, size=50) {
    const { text, full } = valText;
    this.saveLater = true;
    return (
      <span key={i}>
        <input type="text"
          className={`input ${valType} ${extraClasses.join(' ')}`}
          value={full}
          placeholder={valText.initial}
          onChange={this.changeVal.bind(this, i)}
          onKeyUp={this.keyUp.bind(this, i)}
          size={size}
        />
        {this.editValControl(i, _id, isNew)}
      </span>
    )
  }

  progIcon() {
    const { editable } = this.props;
    let progIcon;
    if (editable) {
      const { saving, changed, valid } = this.state;
      const cs = saving.status;
      if (cs == 'saving') {progIcon = 'fa-spinner fa-spin'}
      else if (cs == 'saved') {progIcon = 'fa-check good'}
      else if (cs == 'error') {progIcon = 'fa-exclamation error'}
      else if (!valid) {progIcon = 'fa-close error'}
      else if (changed) {progIcon = 'fa-pencil warning'}
      else {progIcon = 'fa-circle-o hidden'}
      progIcon += ' fa progress';
    }
    else {
      progIcon = 'fa fa-lock progress info';
    }
    return (<span key={name} className={progIcon}/>)
  }

  valuesAsReadonly() {
    const { curValues } = this.state;
    const { name } = this.props;
    if (curValues.length == 0) {return <span className='warning'>no value</span>}
    const { valType, multiple, appearance } = this.props;
    const methods = readonlyMakeFragment(this);
    const makeFragment = methods[valType] || methods._default;
    const cutoff = appearance.cutoff;
    const alt2 = []
    const alt1 = [];
    alt1.push(' ');
    const processValues = appearance.reverse?[...curValues].reverse():curValues;
    processValues.forEach((v, i) => {
      let destAlt = (!cutoff || i <= cutoff-1)?alt1:alt2;
      const valText = this.valueAsString(v);
      const fragment = makeFragment(i, valType, valText);
      if (multiple || i == 0) {destAlt.push(fragment)}
      if (multiple) {destAlt.push(' ')}
    });
    return this.knead(alt1, alt2)
  }

  valuesAsControls() {
    const { curValues, reasons } = this.state;
    const { savedValues } = this.state;
    const { name, valType, multiple, validation, allowNew, appearance } = this.props;
    const methods = editMakeFragment(this);
    const makeFragment = methods[valType] || methods._default;
    const cutoff = appearance.cutoff;
    const alt2 = []
    const alt1 = []
    const enumCurValues = curValues.map((v,i) => [i, v])
    const nValues = curValues.length;
    const processValues = appearance.reverse?enumCurValues.reverse():enumCurValues;
    if (multiple || nValues == 0) {
      processValues.push([nValues, null])
    }
    const size = sizes[valType] || sizes._max;
    let destAlt = alt1;
    let extraClasses = []
    processValues.forEach((ev, j) => {
      const [i, v] = ev;
      const isNew = j == nValues;
      destAlt = (!cutoff || j <= cutoff-1)?alt1:alt2;
      const valText = this.valueAsString(v);
      const _id = (v == null)? null : v._id;
      extraClasses = []
      const reason = reasons[i] || '';
      if (reason != '') {
        extraClasses.push('error');
      }
      const fragment = makeFragment(i, _id, isNew, valType, extraClasses, valText, size);
      if (multiple || j == 0) {
        destAlt.push(fragment);
        if (reason != '') {
          destAlt.push(' ');
          destAlt.push(<span key={`r_${i}`} className="reason">{reason}</span>)
        }
        destAlt.push(' ');
      }
    });
    return this.knead(alt1, alt2)
  }

  knead(alt1, alt2) {
    const { rowId, name } = this.props;
    if (alt2.length == 0) {return alt1}
    return (
      <Alternatives tag={`field_${rowId}_${name}`}
        controlPlacement={control => (<span>{alt1}{' '}{control}</span>)}
        controls={[
          (handler => <span className="button-small" onClick={handler}>show more</span>),
          (handler => <span className="button-small" onClick={handler}>show less</span>),
        ]}
        alternatives={[
          '',
          alt2,
        ]}
        initial={0}
      />
    )
  }

  render() {
    const { relValues } = this.state;
    const { name, label, editable, valType, convert } = this.props;
    const { curValues } = this.state;
    if (editable && relValues == null && valType == 'rel' && convert != 'user' && convert != 'country') {
      return null;
    }
    const classNames = editable?'editable':'readonly';
    const prog = this.progIcon();
    const values = editable?this.valuesAsControls():this.valuesAsReadonly();
    const onClick = (editable && this.saveLater) ? {onClick: this.saveField.bind(this)} : {};
    return (
      <tr>
        <td className="label" {...onClick} >{label}</td>
        <td className="label" {...onClick} >{prog}</td>
        <td><div className="values">{values}</div></td>
      </tr>
    )
  }

/**
 * @method
 * @param {Contrib[]} contribs (from *state*) The list of contribution records as it comes form mongo db
 * @returns {Object} The data fetched from the server.
*/
  fetchValues() {
    const { rowId } = this.props;
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
  componentDidMount()  {this.fetchValues(); this.fullfillSave()}
  componentDidUpdate() {this.fetchValues(); this.fullfillSave()}
}

export default withContext(saveState(ContribField, 'ContribField', normalizeValues))
