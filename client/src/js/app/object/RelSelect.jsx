import React from 'react'
import { connect } from 'react-redux'
import { combineSelectors } from 'utils.js'

import { getSelect, setSearch, setPopUp, togglePopUp } from 'select.js'
import { getOptions } from 'tables.js'

const RelOption = ({ label, selected, onHit }) => (
  <p
    className={`option ${selected}`}
    onClick={onHit}
  >{label}</p>
)

const handlePopUp = (tag, togglePU) => () => togglePU(tag)
const handleSearch = (tag, setS) => event => setS(tag, event.target.value)
const removeVal = (value, onChange, val) => () => {
  if (value.includes(val)) {
    const newValue = value.filter(v => v != val)
    onChange(newValue)
  }
}
const addVal = (optionLookup, value, onChange, label) => () => {
  const { [label]: rep } = optionLookup
  const exists = rep != null || value.includes(label)
  if (!exists) {
    const newValue = [label, ...value]
    onChange(newValue)
  }
}
const changeSel = (tag, multiple, value, onChange, setPU, val) => () => {
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

const Tags = ({ optionLookup, value, onChange }) => (
  <div>{
    (value || []).map(val => {
      const { [val]: lab = val } = optionLookup
      return (
        <span key={val} >
          <span className="tag-medium" >{lab}{' '}
            <span
              className="button-small fa fa-close"
              onClick={removeVal(value, onChange, val)}
            />
          </span>{' '}
        </span>
      )
    })
  }
  </div>
)

const Head = ({ optionLookup, multiple, value, popUp, tag, togglePU }) => {
  let label = ''
  if (!multiple) {
    const { [value]: lab = value } = optionLookup
    label = lab
  }
  const icon = popUp ? 'arrow-up' : 'arrow-down'
  return (
    <p className="option-head tag-medium" >
      <span>{label}</span>
      <span
        className={`button-small fa fa-${icon}`}
        onClick={handlePopUp(tag, togglePU)}
      />
    </p>
  )
}

const Typing = ({ tag, optionLookup, allowNew, value, onChange, search, setS }) => (
  <p className="option-type" >
    <input
      type="text"
      placeholder="search..."
      value={search}
      onChange={handleSearch(tag, setS)}
    />
    {(allowNew && search != '') ? (
      <span
        className="button-small fa fa-plus-square"
        onClick={addVal(optionLookup, value, onChange, search)}
      />
    ) : null}
  </p>
)

const Options = ({ tag, multiple, options, value, onChange, search, setPU }) => {
  const pat = search.toLowerCase()
  const unselectedOptions = options.filter(({ value: val }) => !value.includes(val))
  return (
    <div className="options" >{
      unselectedOptions.map(({ value: val, label: lab }) => (
        pat == null || pat == '' || lab == null || lab.toLowerCase().indexOf(pat) !== -1
      ) ? (
        <RelOption
          key={val}
          label={lab}
          selected={val == value}
          onHit={changeSel(tag, multiple, value, onChange, setPU, val)}
        />
      ) : null)
    }</div>
  )
}

const RelSelect = ({
  tag, options, optionLookup,
  input: { value, onChange },
  multiple, allowNew, popUp, search, togglePU, setPU, setS,
}) => (
  <div className="select" >
    {multiple ?
      <Tags
        optionLookup={optionLookup}
        value={value}
        onChange={onChange}
      /> : null
    }
    <Head
      optionLookup={optionLookup}
      multiple={multiple}
      value={value}
      popUp={popUp}
      tag={tag}
      togglePU={togglePU}
    />
    {(popUp) ? (
      <div className="option-popup" >
        <Typing
          tag={tag}
          optionLookup={optionLookup}
          allowNew={allowNew}
          value={value}
          search={search}
          setS={setS}
          onChange={onChange}
        />
        <Options
          tag={tag}
          options={options}
          multiple={multiple}
          value={value}
          search={search}
          setPU={setPU}
          onChange={onChange}
        />
      </div>) : null
    }
  </div>
)

const getSelectOptions = combineSelectors(getOptions, getSelect)

export default connect(getSelectOptions, { setPU: setPopUp, togglePU: togglePopUp, setS: setSearch})(RelSelect)
