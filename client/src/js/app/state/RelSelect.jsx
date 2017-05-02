import React from 'react'
import { connect } from 'react-redux'
import { combineSelectors } from 'utils'

import { getSelect, setSearch, setPopUp, togglePopUp } from 'select'
import { getOptions } from 'tables'

const RelOption = ({ label, selected, onHit }) => (
  <p
    className={`option tag ${selected ? 'selected' : ''}`}
    onClick={selected ? null : onHit}
  >{label}</p>
)

const handlePopUp = (tag, togglePU) => () => togglePU(tag)
const handleSetPopUp = (tag, onOff, setPU) => () => setPU(tag, onOff)
const handleSearch = (tag, setS) => event => setS(tag, event.target.value)
const handleClear = (tag, setS) => () => setS(tag, '')

const removeVal = (value, onChange, val) => event => {
  event.stopPropagation()
  if (value.includes(val)) {
    const newValue = value.filter(v => v != val)
    onChange(newValue)
  }
}
const addVal = (optionLookup, multiple, value, onChange, label) => () => {
  const { [label]: rep } = optionLookup
  const exists = rep != null || value.includes(label)
  if (!exists) {
    const newValue = multiple ? [label, ...value] : label
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

const Tags = ({ tag, optionLookup, value, onChange, togglePU }) => (
  <div
    className="tags"
    onClick={handlePopUp(tag, togglePU)}
  >{
    (value || []).map(val => {
      const { [val]: lab = val } = optionLookup
      return (
        <span
          key={val}
          className="tag"
        >
          <span
            className="button-tag"
            onClick={removeVal(value, onChange, val)}
          >{'×'}</span>{' '}
          <span>{lab}</span>
        </span>
      )
    })
  }{' '}
  </div>
)

const Head = ({ optionLookup, value, tag, togglePU }) => {
  let label = ''
  const { [value]: lab = value } = optionLookup
  label = lab
  return (
    <span
      className={`option-head tag`}
      onClick={handlePopUp(tag, togglePU)}
    >{label}</span>
  )
}

const Typing = ({ tag, search, setS, setPU }) => (
  <span className="option-type" >
    <input
      className="invisible"
      type="text"
      placeholder={'filter ...'}
      value={search || ''}
      onFocus={handleSetPopUp(tag, true, setPU)}
      onChange={handleSearch(tag, setS)}
    />
    {search ?
      <span
        className="button-tag"
        onClick={handleClear(tag, setS)}
      >{'×'}</span> : null
    }
  </span>
)

const Options = ({ tag, optionLookup, multiple, allowNew, options, value, onChange, search, setPU }) => {
  const pat = search.toLowerCase()
  return (
    <div className="options" >
      {(allowNew && search) ? (
        <span
          className="new tag"
          onClick={addVal(optionLookup, multiple, value, onChange, search)}
        >{search}</span>
      ) : null}
      {
        options.map(({ value: val, label: lab }) => (
          (!multiple || !value.includes(val)) &&
          (pat == null || pat == '' || lab == null || lab.toLowerCase().indexOf(pat) !== -1)
        ) ? (
          <RelOption
            key={val}
            label={lab}
            selected={(multiple && value.includes(val)) || (!multiple && value == val)}
            onHit={changeSel(tag, multiple, value, onChange, setPU, val)}
          />
        ) : null)
      }
    </div>
  )
}

const RelSelect = ({
  tag, options, optionLookup,
  input: { value, onChange },
  multiple, allowNew, popUp, search, togglePU, setPU, setS,
}) => (
  <div
    className={`select ${multiple ? 'multiselect' : ''}`}
  >
    {multiple ?
      <Tags
        optionLookup={optionLookup}
        value={value}
        tag={tag}
        togglePU={togglePU}
        onChange={onChange}
      /> :
      <Head
        optionLookup={optionLookup}
        value={value}
        popUp={popUp}
        tag={tag}
        togglePU={togglePU}
      />
    }
    {popUp ?
      <Typing
        tag={tag}
        search={search}
        setS={setS}
        setPU={setPU}
      /> : null
    }
    {popUp ?
      <Options
        tag={tag}
        optionLookup={optionLookup}
        options={options}
        multiple={multiple}
        allowNew={allowNew}
        value={value}
        search={search}
        setPU={setPU}
        onChange={onChange}
      /> : null
    }
  </div>
)

const getSelectOptions = combineSelectors(getOptions, getSelect)

export default connect(getSelectOptions, { setPU: setPopUp, togglePU: togglePopUp, setS: setSearch})(RelSelect)
