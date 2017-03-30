import React, { Component } from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'

import RelSelect from 'RelSelect.jsx'
import Alternative from 'Alternative.jsx'

import { getData } from 'data.js'
import { fetchData } from 'server.js'
import { withContext, saveState } from 'hoc.js'
import memoBind from 'memoBind.js'

const sizes = {
  url: 50,
  email: 30,
  range: 6,
  datetime: 25,
  text: 50,
  _max: 50,
}

const trimDate = text => ({ full: text, text: (text == null) ? '' : (text.replace(/\.[0-9]+/, ''))})

const condense = text => ({ full: text, text: (text == null) ? '' : ((text.length > 20) ? `${text.slice(0, 8)}...${text.slice(-8)}` : text)})

const normalizeValues = ({ tables, table, eId, name }) => {
  const { [table]: { entities: { [eId]: { [name]: initValues } } } } = tables
  const savedValues = (initValues == null) ? [] : initValues
  const curValues = [...savedValues]
  return { curValues, savedValues, reasons: {}, saving: {}, changed: false, valid: true }
}

const userAsString = ({ _id: valId }, { entities }) => {
  console.warn('USER', entities)
  let valRep
  let valShort
  const userData = entities[valId]
  if (!userData) {
    valRep = 'UNKNOWN'
    valShort = '??'
  }
  else {
    const fname = userData.firstName || ''
    const lname = userData.lastName || ''
    const email = userData.email || ''
    const eppn = userData.eppn || ''
    const authority = userData.authority || ''
    const mayLogin = userData.mayLogin ? 'yes' : 'no'
    let linkText = [fname, lname].filter(x => x).join(' ')
    if (linkText == '') {linkText = email}
    const namePart = (linkText && email) ? (
      `[${linkText}](mailto:${email})`
    ) : (
      linkText + email
    )
    const eppnPart = eppn ? ` eppn=${eppn} ` : ''
    const authorityPart = authority ? ` authenticated by=${authority} ` : ''
    const mayLoginPart = mayLogin ? ` active=${mayLogin} ` : ''
    valRep = [namePart, eppnPart, authorityPart, mayLoginPart].filter(x => x).join('; ')
    valShort = [fname, lname, eppn].filter(x => x).slice(0, 2).join(' ')
  }
  return { text: valShort, full: valRep }
}

const countryAsString = ({ _id: valId }, { entities }) => {
  console.warn('COUNTRY', entities)
  let valRep
  let valShort
  const countryData = entities[valId]
  if (!countryData) {
    valRep = 'UNKNOWN'
    valShort = '??'
  }
  else {
    const { name, iso } = countryData
    valShort = name
    valRep = `${iso}: ${name}`
  }
  return {text: valShort, full: valShort, long: valRep}
}

const validate = (val, valType, validation) => {
  let vstatus = true
  let reason = ''
  if (validation.nonEmpty && (val == null || val == '')) {
    reason = `field may not be empty`
    vstatus = false
  }
  if (validation.min != null || validation.max != null) {
    if (isNaN(val)) {
      reason = `value must be a number`
      vstatus = false
    }
    else {
      const valn = parseInt(val)
      if (!(validation.min <= valn)) {
        reason = `value must be at least ${validation.min}`
        vstatus = false
      }
      if (!(validation.max >= val)) {
        reason = `value must be at most ${validation.max}`
        vstatus = false
      }
    }
  }
  if (valType == 'datetime') {
    let times
    try {
      times = Date.parse(val)
    }
    catch (error) {
      reason = `not a valid date/time - ${error}`
      vstatus = false
    }
    if (isNaN(times)) {
      reason = `not a valid date/time`
      vstatus = false
    }
  }
  return { vstatus, reason }
}

class ItemField extends Component {

  setValToState(i, newVal, _id, doSave) {
    const { state: { reasons, curValues } } = this
    let newReasons
    let newValues = [...curValues]
    if (newVal == null) {
      newValues = newValues.filter((x, j) => j != i)
      newReasons = reasons
    }
    else {
      const { props: { valType, validation } } = this
      const { vstatus, reason } = validate(newVal, valType, validation)
      const sendVal = (valType == 'rel') ? ((typeof newVal != 'string') ? newVal : { _id, value: newVal }) : newVal
      if (vstatus && valType == 'rel' && _id == null) {
        /* add new value to value list
         * assume that fields that have allowNew, do not have an associated value table.
         * This app gleans the value of such fields from the actual values encountered in the big table.
         * What if we have multiple new values, all with _id: null, will that go wrong?
         * Yes.
         * It is better to fetch the relValues anew.
         * In order to do this, we do two things:
         * 1. set the current state for relValues to null
         *
         * This is surprisingly difficult to achieve.
         * And a simple refresh also solves the problem.
         * So: put a (limited) refresh button on the interface, also for the filters.
         */
      }
      const refI = (i == -1) ? newValues.length : i
      if (i == -1) {newValues.push(sendVal)}
      else {newValues[i] = sendVal}
      newReasons = {...reasons, [refI]: reason}
    }
    const { valid, changed } = this.checkForSave({ newValues, newReasons })
    if (!doSave || !valid || !changed) {
      this.setState({
        curValues: newValues,
        reasons: newReasons,
        saving: {},
        valid,
        changed,
      })
    }
    else {
      this.toDb(newValues)
    }
  }

  keyUp = i => event => {
    if (event.keyCode === 13) {
      event.target.blur()
      this.setValToState(i, event.target.value, null, true)
    }
  }

  changeVal = i => event => {
    event.preventDefault()
    this.setValToState(i, event.target.value, null, false)
  }

  changeRelVal = i => (_id, value) => {
    this.setValToState(i, value, _id, true)
  }

  removeVal = i => event => {
    event.preventDefault()
    this.setValToState(i, null, null, true)
  }

  checkForSave(info) {
    const { newValues, newReasons } = info
    const {
      props: { name, updEdit },
      state: { savedValues },
    } = this
    const valid = Object.keys(newReasons).every(i => !newReasons[i])
    let changed = false
    if (newValues.length != savedValues.length) {
      changed = true
    }
    else {
      for (const i in newValues) {
        const { [i]: cv } = newValues
        const { [i]: sv } = savedValues
        if (sv == null) {
          changed = true
        }
        else if (typeof cv == 'object') {
          for (const k of Object.keys(cv)) {
            if (cv[k] != sv[k]) {
              changed = true
              break
            }
          }
        }
        else {
          if (cv != sv) {
            changed = true
          }
        }
        if (changed) {
          break
        }
      }
    }
    updEdit(name, changed, valid, newValues)
    return { valid, changed }
  }

  saveField = () => {
    const { state: { valid, changed, saving } } = this
    if (valid && changed && !saving.status) {
      this.toDb()
    }
  }

  saved = data => {
    const { props: { name, updMod, updEdit } } = this
    if (data == null) {
      this.setState({
        saving: {status: 'error'},
      })
    }
    else {
      const { [name]: newValues, ...modValues } = data
      this.setState({
        saving: {status: 'saved'},
        savedValues: newValues,
        curValues: newValues,
        changed: false,
        valid: true,
      })
      updMod(modValues)
      updEdit(name, false, true, newValues)
    }
  }

  toDb(newValues) {
    const {
      props: { table, name, eId, notification },
      state: { curValues },
    } = this
    const sendValues = (newValues == null) ? curValues : newValues
    this.setState({
      reasons: {},
      saving: {status: 'saving'},
    })
    getData(
      [
        {
          type: 'db',
          path: `/mod?table=${table}&action=update`,
          branch: `save ${name}`,
          callback: this.saved,
          data: {_id: eId, name, values: sendValues},
        },
      ],
      this,
      notification.component
    )
  }

  fullfillSave() {
    const { props: { editable, saveConcern } } = this
    if (editable && saveConcern) {this.saveField()}
  }

  valueAsString(valRaw) {
    const { props: { valType, convert, user, country, initial } } = this
    if (valRaw == null) {return { text: '', full: '', initial: (valType == 'rel') ? true : initial }}
    switch (valType) {
      case 'rel': {
        switch (convert) {
          case 'user': {
            return userAsString(valRaw, user)
          }
          case 'country': {
            return countryAsString(valRaw, country)
          }
          default: {return condense(valRaw.value)}
        }
      }
      case 'datetime': {
        return trimDate(valRaw)
      }
      default: {
        return {text: valRaw, full: valRaw}
      }
    }
  }

  urlFragment = (i, valType, valText) => {
    const { text, full } = valText
    return <a key={i} target="_blank" rel="noopener noreferrer" href={full} className="link" >{text}</a>
  }
  emailFragment = (i, valType, valText) => {
    const { full } = valText
    return <a key={i} target="_blank" rel="noopener noreferrer" href={`mailto:${full}`} className="link" >{full}</a>
  }
  textareaFragment = (i, valType, valText) => {
    const { full } = valText
    return (
      <Markdown
        key={i}
        source={full}
      />
    )
  }
  defaultFragment = (i, valType, valText) => {
    const { text, full } = valText
    const cl = `${(valType == 'rel') ? 'tag' : 'varia'}-medium`
    return <span key={i} className={cl} title={full} >{text}</span>
  }

  relOptions() {
    const { props: { name , tables } } = this 
    console.warn(tables)
    const { [name]: { order, entities } } = tables
    console.warn(order, entities)
    console.warn(order.map(_id => [_id, condense(entities[_id].value)]))
    return order.map(_id => [_id, condense(entities[_id].value)])
  }
  userOptions() {
    const { props: { tables } } = this 
    const { user: { order } } = tables
    return order.map(_id => [_id, this.valueAsString({_id})])
  }
  countryOptions() {
    const { props: { tables } } = this 
    const { country: { order } } = tables
    return order.map(_id => [_id, this.valueAsString({_id})])
  }

  relSelect(i, _id, isNew, extraClasses, valText) {
    const { text, full } = valText
    const {
      props: { table, convert, allowNew, name, eId },
      state: { valid },
    } = this
    const valueList = (convert == 'user') ? this.userOptions() : ((convert == 'country') ? this.countryOptions() : this.relOptions())
    return (
      <RelSelect
        tag={`relselect_${table}_${eId}_${name}_${i}`}
        table={table}
        key={i}
        isNew={isNew}
        allowNew={allowNew}
        valid={valid}
        valueList={valueList}
        initVal={_id}
        initText={text}
        initFull={full}
        extraClasses={extraClasses}
        onChange={memoBind(this, 'changeRelVal', [i])}
      />
    )
  }
  editValControl(i, _id, isNew) {
    const { props: { multiple } } = this
    return (isNew || !multiple) ? null : (
      <span
        className="button-small fa fa-close"
        onClick={memoBind(this, 'removeVal', [i])}
      />
    )
  }

  relEditFragment = (i, _id, isNew, valType, extraClasses, valText) => {
    const { text, full } = valText
    const { props: { multiple } } = this
    return ((!multiple && i == 0) || isNew) ? (
      this.relSelect(i, _id, isNew, extraClasses, valText)
    ) : (
      <span key={i} className="tag-medium" title={full} >{text}{' '}
        {this.editValControl(i, _id, isNew)}
      </span>
    )
  }
  textAreaControlPlacement = control => <p className="stick" >{control}</p>
  textAreaControl1 = handler => <span className="button-small fa fa-pencil" onClick={handler} />
  textAreaControl2 = handler => <span className="button-small fa fa-hand-o-down" onClick={handler} />

  textareaEditFragment = (i, _id, isNew, valType, extraClasses, valText, cols = 100, rows = 10) => {
    const { props: { table, eId, name } } = this
    const { full } = valText
    this.saveLater = true
    return (
      <Alternative
        key={i}
        tag={`md_${table}_${eId}_${name}`}
        controlPlacement={this.textAreaControlPlacement}
        controls={[this.textAreaControl1, this.textAreaControl2]}
        alternatives={[
          <Markdown
            key="fmt"
            source={full}
          />,
          <span key="src" >
            <textarea
              className={`input ${valType} ${extraClasses.join(' ')}`}
              value={full}
              cols={cols}
              entities={entities}
              placeholder={valText.initial}
              wrap="soft"
              onChange={memoBind(this, 'changeVal', [i])}
            />
            {this.editValControl(i, _id, isNew)}
          </span>,
        ]}
        initial={0}
      />
    )
  }
  defaultEditFragment = (i, _id, isNew, valType, extraClasses, valText, size = 50) => {
    const { full } = valText
    this.saveLater = true
    return (
      <span key={i} >
        <input
          type="text"
          className={`input ${valType} ${extraClasses.join(' ')}`}
          value={full}
          placeholder={valText.initial}
          size={size}
          onChange={memoBind(this, 'changeVal', [i])}
          onKeyUp={memoBind(this, 'keyUp', [i])}
        />
        {this.editValControl(i, _id, isNew)}
      </span>
    )
  }

  readonlyMakeFragment = valType => {
    if (valType == 'url') {return this.urlFragment}
    if (valType == 'email') {return this.emailFragment}
    if (valType == 'textarea') {return this.textareaFragment}
    return this.defaultFragment
  }

  editMakeFragment = valType => {
    if (valType == 'rel') {return this.relEditFragment}
    if (valType == 'textarea') {return this.textareaEditFragment}
    return this.defaultEditFragment
  }

  progIcon() {
    const { props: { editable } } = this
    let progIcon
    if (editable) {
      const { state: { saving: { status }, changed, valid } } = this
      if (status == 'saving') {progIcon = 'fa-spinner fa-spin'}
      else if (status == 'saved') {progIcon = 'fa-check good'}
      else if (status == 'error') {progIcon = 'fa-exclamation error'}
      else if (!valid) {progIcon = 'fa-close error'}
      else if (changed) {progIcon = 'fa-pencil warning'}
      else {progIcon = 'fa-circle-o hidden'}
      progIcon += ' fa progress'
    }
    else {
      progIcon = 'fa fa-lock progress info'
    }
    return (<span key={name} className={progIcon} />)
  }

  valuesAsReadonly() {
    const { state: { curValues } } = this
    if (curValues.length == 0) {return <span className="warning" >{'no value'}</span>}
    const { props: { valType, multiple, appearance: { cutoff, reverse } } } = this
    const makeFragment = memoBind(this, 'readonlyMakeFragment', [valType])
    const alt2 = []
    const alt1 = []
    alt1.push(' ')
    const processValues = reverse ? [...curValues].reverse() : curValues
    processValues.forEach((v, i) => {
      const destAlt = (!cutoff || i <= cutoff - 1) ? alt1 : alt2
      const valText = this.valueAsString(v)
      const fragment = makeFragment(i, valType, valText)
      if (multiple || i == 0) {destAlt.push(fragment)}
      if (multiple) {destAlt.push(' ')}
    })
    return this.knead(alt1, alt2)
  }

  valuesAsControls() {
    const {
      props: { valType, multiple, appearance: { cutoff, reverse } },
      state: { curValues, reasons },
    } = this
    const makeFragment = memoBind(this, 'editMakeFragment', [valType])
    const alt2 = []
    const alt1 = []
    const enumCurValues = curValues.map((v, i) => [i, v])
    const { length: nValues } = curValues
    const processValues = reverse ? enumCurValues.reverse() : enumCurValues
    if (multiple || nValues == 0) {
      processValues.push([nValues, null])
    }
    const size = sizes[valType] || sizes._max
    let destAlt = alt1
    let extraClasses = []
    processValues.forEach((ev, j) => {
      const [i, v] = ev
      const isNew = j == nValues
      destAlt = (!cutoff || j <= cutoff - 1) ? alt1 : alt2
      const valText = this.valueAsString(v)
      const _id = (v == null) ? null : v._id
      extraClasses = []
      const reason = reasons[i] || ''
      if (reason != '') {
        extraClasses.push('error')
      }
      const fragment = makeFragment(i, _id, isNew, valType, extraClasses, valText, size)
      if (multiple || j == 0) {
        destAlt.push(fragment)
        if (reason != '') {
          destAlt.push(' ')
          destAlt.push(<span key={`r_${i}`} className="reason" >{reason}</span>)
        }
        destAlt.push(' ')
      }
    })
    return this.knead(alt1, alt2)
  }

  kneadControlPlacement = alt1 => control => <span>{alt1}{' '}{control}</span>
  kneadControl1 = handler => <span className="button-small" onClick={handler} >{'show more'}</span>
  kneadControl2 = handler => <span className="button-small" onClick={handler} >{'show less'}</span>

  knead(alt1, alt2) {
    const { props: { table, eId, name } } = this
    if (alt2.length == 0) {return alt1}
    return (
      <Alternative
        tag={`field_${table}_${eId}_${name}`}
        controlPlacement={memoBind(this, 'kneadControlPlacement', [], [alt1])}
        controls={[this.kneadControl1, this.kneadControl2]}
        alternatives={['', alt2]}
        initial={0}
      />
    )
  }

  render() {
    const {
      props: { label, name, editable, valType, convert },
    } = this
    console.warn('RENDER1', name, editable, this.needValues())
    if (editable && this.needValues()) {
      return null
    }
    console.warn('RENDER2', name, editable, this.needValues())
    const prog = this.progIcon()
    const values = editable ? this.valuesAsControls() : this.valuesAsReadonly()
    const onClick = (editable && this.saveLater) ? {onClick: this.saveField} : {}
    console.warn('RENDER3', name, editable, this.needValues())
    return (
      <tr>
        <td className="label" {...onClick} >{label}</td>
        <td className="label" {...onClick} >{prog}</td>
        <td><div className="values" >{values}</div></td>
      </tr>
    )
  }

  needValues() {
    const { props: { name, valType, convert, tables } } = this
    return (valType == 'rel' && convert != 'user' && convert != 'country' && (tables == null || tables[name] == null))
  }
  fetchValues() {
    const { props: { table, name, getValues, fetch } } = this
    if (this.needValues()) {
      console.warn('FETCH', name)
      fetch({ type: 'fetchTable', contentType: 'db', path: getValues, desc: `${name} table`, table: name })
    }
  }

  componentDidMount() {
    this.fetchValues()
    this.fullfillSave()
  }
  componentDidUpdate() {
    this.fullfillSave()
  }
}

const mapStateToProps = ({ tables }) => ({ tables })

export default connect(mapStateToProps, { fetch: fetchData })(
  withContext(saveState(ItemField, 'ItemField', normalizeValues))
)
