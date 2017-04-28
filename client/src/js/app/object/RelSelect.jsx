import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getSelect, setSearch, setPopUp, togglePopUp } from 'select.js'

const RelOption = ({ label, selected, onHit }) => (
  <p
    className={`option ${selected}`}
    onClick={onHit}
  >{label}</p>
)

class RelSelect extends Component {
  constructor(props) {
    super(props)
    const { options } = props
    this.lookup = {}
    options.forEach(({ value: val, label: lab }) => {this.lookup[val] = lab})
  }
  handlePopUp = () => {
    const { props: { tag, togglePU } } = this
    togglePU(tag)
  }
  handleSearch = event => {
    const { props: { tag, setS } } = this
    const { target: { value: search } } = event
    setS(tag, search)
  }
  changeSel = val => () => {
    const { props: { tag, multiple, input: { value, onChange }, setPU } } = this
    if (multiple) {
      if (!value.includes(val)) {
        const newValue = [...value, val]
        onChange(newValue)
      }
    }
    else {
      onChange(val)
      setPU(tag, false)
    }
  }
  removeVal = val => () => {
    const { props: { input: { value, onChange } } } = this
    if (value.includes(val)) {
      const newValue = value.filter(v => v != val)
      onChange(newValue)
    }
  }
  addVal = label => () => {
    const { props: { input: { value, onChange } } } = this
    const { [label]: rep } = this
    const exists = rep != null || value.includes(label)
    if (!exists) {
      const newValue = [label, ...value]
      onChange(newValue)
    }
  }

  setHeight = n => domElem => {
    if (domElem != null) {
      const height = Math.max(1, Math.min(n, 25)) * 1.7
      domElem.style.height = `${height}em`
      domElem.scrollIntoView(false)
    }
  }

  renderTags() {
    const { lookup, props: { input: { value } } } = this
    return (value || []).map(val => {
      const { [val]: lab = val } = lookup
      return (
        <span key={val} >
          <span className="tag-medium" >{lab}{' '}
            <span
              className="button-small fa fa-close"
              onClick={this.removeVal(val)}
            />
          </span>{' '}
        </span>
      )
    })
  }
  renderHead() {
    const { lookup, props: { multiple, input: {value }, popUp } } = this
    let label = ''
    if (!multiple) {
      const { [value]: lab = value } = lookup
      label = lab
    }
    const icon = popUp ? 'arrow-up' : 'arrow-down'
    return (
      <p className="option-head tag-medium" >
        <span>{label}</span>
        <span
          className={`button-small fa fa-${icon}`}
          onClick={this.handlePopUp}
        />
      </p>
    )
  }
  renderInput() {
    const { props: { allowNew, search } } = this
    return (
      <p className="option-type" >
        <input
          type="text"
          placeholder="search..."
          value={search}
          onChange={this.handleSearch}
        />
        {(allowNew && search != '') ? (
          <span
            className="button-small fa fa-plus-square"
            onClick={this.addVal(search)}
          />
        ) : null}
      </p>
    )
  }
  renderOptions() {
    const { props: { options, input: { value }, search } } = this
    const pat = search.toLowerCase()
    const unselectedOptions = options.filter(({ value: val }) => !value.includes(val))
    return (
      <div
        ref={this.setHeight(unselectedOptions.length)}
        className="options"
      >{
        unselectedOptions.map(({ value: val, label: lab }) => (
          pat == null || pat == '' || lab == null || lab.toLowerCase().indexOf(pat) !== -1
        ) ? (
          <RelOption
            key={val}
            label={lab}
            selected={val == value}
            onHit={this.changeSel(val)}
          />
        ) : null)
      }</div>
    )
  }

  render() {
    const { props: { multiple, popUp } } = this
    return (
      <div className="select" >
        {multiple ? this.renderTags() : null}
        {this.renderHead()}
        {(popUp) ? (
          <div className="option-popup" >
            {this.renderInput()}
            {this.renderOptions()}
          </div>) : null
        }
      </div>
    )
  }
}

export default connect(getSelect, { setPU: setPopUp, togglePU: togglePopUp, setS: setSearch})(RelSelect)
