import React from 'react'
import { connect } from 'react-redux'
import { memoize } from 'memo'
import { combineSelectors, emptyO } from 'utils'
import { handle, handlEV } from 'handle'

import { getSelect, setSearch, setPopUp, togglePopUp } from 'select'
import { getOptions } from 'tables'

const RelOption = ({ label, xClass, selected, onHit }) => (
  <p
    className={`tag option ${xClass} ${selected ? 'selected' : ''}`}
    onClick={selected ? null : onHit}
  >{label}</p>
)

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
const changeSel = memoize((selectTag, multiple, value, val, onChange, dispatch) => () => {
  if (multiple) {
    if (!value.includes(val)) {
      const newValue = [...value, val]
      onChange(newValue)
    }
  }
  else {
    onChange(val)
    dispatch(setPopUp(selectTag, false))
  }
})

const Tags = ({ selectTag, optionLookup, optionStyle, value, onChange, dispatch }) => (
  <div
    className="tags"
    onClick={handle(dispatch, togglePopUp, selectTag)}
  >
    {
      (value != null && value.length)
      ? value.map(
          val => {
            const { [val]: lab = val } = optionLookup
            const { [val]: xClass = '' } = optionStyle
            return (
              <span
                key={val}
                className="tag"
              >
                <span
                  className={`button-tag ${xClass}`}
                  onClick={removeVal(value, onChange, val)}
                >{'×'}</span>{' '}
                <span>{lab}</span>
              </span>
            )
          }
        )
      : <span className="tag empty">{'click to enter values'}</span>
    }
  </div>
)

const Head = ({ optionLookup, optionStyle, value, selectTag, dispatch }) => {
  let label = ''
  const { [value]: lab = value } = optionLookup
  const { [value]: xClass = '' } = optionStyle
  label = lab
  const classes = ['option-head', 'tag', xClass]
  if (value == '') {
    label = 'click to enter a value'
    classes.push('new')
  }
  return (
    <span
      className={classes.join(' ')}
      onClick={handle(dispatch, togglePopUp, selectTag)}
    >{label}</span>
  )
}

const Typing = ({ selectTag, search, dispatch }) => (
  <span className="option-type" >
    <input
      className="invisible"
      type="text"
      placeholder={'filter ...'}
      value={search || ''}
      onFocus={handle(dispatch, setPopUp, selectTag, true)}
      onChange={handlEV(dispatch, setSearch, selectTag)}
    />
    {
      search
      ? <span
          className="button-tag"
          onClick={handle(dispatch, setSearch, selectTag, '')}
        >{'×'}</span>
      : null
    }
  </span>
)

const Options = ({ selectTag, optionLookup, optionStyle, multiple, allowNew, options, value, onChange, search, dispatch }) => {
  const pat = search.toLowerCase()
  return (
    <div className={'options'} >
      {
        (
          allowNew
          && search
          && !options.some(({ label }) => label == search)
          && !value.includes(search)
        )
        ? <span
            className="new tag"
            onClick={addVal(optionLookup, multiple, value, onChange, search)}
          >{search}</span>
        : null
      }
      {
        options.map(({ value: val, label: lab }) => {
          if (
            (!multiple || !value.includes(val))
            && (pat == null || pat == '' || lab == null || lab.toLowerCase().indexOf(pat) !== -1)
          ) {
            const { [val]: xClass = '' } = optionStyle
            return (
              <RelOption
                key={val}
                label={lab}
                xClass={xClass}
                selected={(multiple && value.includes(val)) || (!multiple && value == val)}
                onHit={changeSel(selectTag, multiple, value, val, onChange, dispatch)}
              />
            )
          }
          else {
            return null
          }
        })
      }
    </div>
  )
}

const RelSelect = ({
  selectTag, options, optionLookup, optionStyle = emptyO,
  input: { value, onChange },
  multiple, allowNew, popUp, search, dispatch,
}) => (
  <div
    className={`select ${multiple ? 'multiselect' : ''}`}
  >
    {
      multiple
      ? <Tags
          optionLookup={optionLookup}
          optionStyle={optionStyle}
          value={value}
          selectTag={selectTag}
          dispatch={dispatch}
          onChange={onChange}
        />
      : <Head
          optionLookup={optionLookup}
          optionStyle={optionStyle}
          value={value}
          popUp={popUp}
          selectTag={selectTag}
          dispatch={dispatch}
        />
    }
    {
      popUp
      ? <Typing
          selectTag={selectTag}
          search={search}
          dispatch={dispatch}
        />
      : null
    }
    {
      popUp
      ? <Options
          selectTag={selectTag}
          optionLookup={optionLookup}
          optionStyle={optionStyle}
          options={options}
          multiple={multiple}
          allowNew={allowNew}
          value={value}
          search={search}
          dispatch={dispatch}
          onChange={onChange}
        />
      : null
    }
  </div>
)

const getSelectOptions = combineSelectors(getOptions, getSelect)

export default connect(getSelectOptions)(RelSelect)
