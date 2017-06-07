import React from 'react'
import { connect } from 'react-redux'
import { combineSelectors, memoize, handle, handlEV } from 'utils'

import { getSelect, setSearch, setPopUp, togglePopUp } from 'select'
import { getOptions } from 'tables'

const RelOption = ({ label, xClass, selected, onHit }) => (
  <p
    className={`option tag ${xClass} ${selected ? 'selected' : ''}`}
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
const changeSel = memoize((tag, multiple, value, val, onChange, dispatch) => () => {
  if (multiple) {
    if (!value.includes(val)) {
      const newValue = [...value, val]
      onChange(newValue)
    }
  }
  else {
    onChange(val)
    dispatch(setPopUp(tag, false))
  }
})

const Tags = ({ tag, optionLookup, optionStyle, value, onChange, dispatch }) => (
  <div
    className="tags"
    onClick={handle(dispatch, togglePopUp, tag)}
  >{
    (value != null && value.length) ?
      value.map(val => {
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
      }) :
      <span className="tag empty">{'click to enter values'}</span>
  }
  </div>
)

const Head = ({ optionLookup, optionStyle, value, tag, dispatch }) => {
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
      onClick={handle(dispatch, togglePopUp, tag)}
    >{label}</span>
  )
}

const Typing = ({ tag, search, dispatch }) => (
  <span className="option-type" >
    <input
      className="invisible"
      type="text"
      placeholder={'filter ...'}
      value={search || ''}
      onFocus={handle(dispatch, setPopUp, tag, true)}
      onChange={handlEV(dispatch, setSearch, tag)}
    />
    {search ?
      <span
        className="button-tag"
        onClick={handle(dispatch, setSearch, tag, '')}
      >{'×'}</span> : null
    }
  </span>
)

const Options = ({ tag, optionLookup, optionStyle, multiple, allowNew, options, value, onChange, search, dispatch }) => {
  const pat = search.toLowerCase()
  return (
    <div className={'options'} >
      {(
        allowNew &&
        search &&
        !options.some(({ label }) => label == search) &&
        !value.includes(search)
      ) ? (
        <span
          className="new tag"
          onClick={addVal(optionLookup, multiple, value, onChange, search)}
        >{search}</span>
      ) : null}
      {
        options.map(({ value: val, label: lab }) => {
          if (
            (!multiple || !value.includes(val)) &&
            (pat == null || pat == '' || lab == null || lab.toLowerCase().indexOf(pat) !== -1)
          ) {
            const { [val]: xClass = '' } = optionStyle
            return (
              <RelOption
                key={val}
                label={lab}
                xClass={xClass}
                selected={(multiple && value.includes(val)) || (!multiple && value == val)}
                onHit={changeSel(tag, multiple, value, val, onChange, dispatch)}
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
  tag, options, optionLookup, optionStyle = {},
  input: { value, onChange },
  multiple, allowNew, popUp, search, dispatch,
}) => (
  <div
    className={`select ${multiple ? 'multiselect' : ''}`}
  >
    {multiple ?
      <Tags
        optionLookup={optionLookup}
        optionStyle={optionStyle}
        value={value}
        tag={tag}
        dispatch={dispatch}
        onChange={onChange}
      /> :
      <Head
        optionLookup={optionLookup}
        optionStyle={optionStyle}
        value={value}
        popUp={popUp}
        tag={tag}
        dispatch={dispatch}
      />
    }
    {popUp ?
      <Typing
        tag={tag}
        search={search}
        dispatch={dispatch}
      /> : null
    }
    {popUp ?
      <Options
        tag={tag}
        optionLookup={optionLookup}
        optionStyle={optionStyle}
        options={options}
        multiple={multiple}
        allowNew={allowNew}
        value={value}
        search={search}
        dispatch={dispatch}
        onChange={onChange}
      /> : null
    }
  </div>
)

const getSelectOptions = combineSelectors(getOptions, getSelect)

export default connect(getSelectOptions)(RelSelect)
