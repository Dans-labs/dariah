import React from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo'
import { emptyS, emptyO } from 'utils'
import { handle, handlEV } from 'handle'
import { composeAttributes, checkDisabled } from 'fields'

import { getSelect, compileOptions, setSearch, setPopUp, togglePopUp } from 'select'

const RelOption = ({ label, attributes, selected, onHit }) => (
  <p
    {...attributes}
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

const Tags = ({ selectTag, optionLookup, activeItems, inactive, value, onChange, dispatch }) => {
  const makeAttributes = composeAttributes(activeItems, inactive)
  return (
    <div
      className={'tags'}
      onClick={handle(dispatch, togglePopUp, selectTag)}
    >
      {
        (value != null && value.length)
        ? value.map(
            val => {
              const { [val]: lab = val } = optionLookup
              const attributes = makeAttributes(val, 'tag')
              return (
                <span
                  key={val}
                  {...attributes}
                >
                  <span
                    className={`button-tag`}
                    onClick={removeVal(value, onChange, val)}
                  >{'×'}</span>{' '}
                  <span>{lab}</span>
                </span>
              )
            }
          )
        : <span className={'tag empty'}>{'click to enter values'}</span>
      }
    </div>
  )
}

const Head = ({ optionLookup, value, activeItems, inactive, selectTag, dispatch }) => {
  const makeAttributes = composeAttributes(activeItems, inactive)
  let label = emptyS
  const { [value]: lab = value } = optionLookup
  label = lab
  const classes = ['option-head', 'tag']
  if (value == emptyS) {
    label = 'click to enter a value'
    classes.push('new')
  }
  const attributes = makeAttributes(value, classes.join(' '))
  return (
    <span
      {...attributes}
      onClick={handle(dispatch, togglePopUp, selectTag)}
    >{label}</span>
  )
}

const Typing = ({ selectTag, search, dispatch }) => (
  <span className={'option-type'} >
    <input
      className={'invisible'}
      type={'text'}
      placeholder={'filter ...'}
      value={search || emptyS}
      onFocus={handle(dispatch, setPopUp, selectTag, true)}
      onChange={handlEV(dispatch, setSearch, selectTag)}
    />
    {
      search
      ? <span
          className={'button-tag'}
          onClick={handle(dispatch, setSearch, selectTag, emptyS)}
        >{'×'}</span>
      : null
    }
  </span>
)

const Options = ({
  selectTag, optionLookup, options,
  activeItems, inactive,
  multiple, allowNew,
  value, onChange, search, dispatch,
}) => {
  const pat = search.toLowerCase()
  const makeAttributes = composeAttributes(activeItems, inactive)
  const testDisabled = checkDisabled(activeItems, inactive)
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
            className={'new tag'}
            onClick={addVal(optionLookup, multiple, value, onChange, search)}
          >{search}</span>
        : null
      }
      {
        options.map(({ value: val, label: lab }) => {
          if (
            (!multiple || !value.includes(val))
            && (pat == null || pat == emptyS || lab == null || lab.toLowerCase().indexOf(pat) !== -1)
            && !testDisabled(val)
          ) {
            const selected = (multiple && value.includes(val)) || (!multiple && value == val)
            const attributes = makeAttributes(val, `tag option ${selected ? 'selected' : emptyS}`)
            return (
              <RelOption
                key={val}
                label={lab}
                attributes={attributes}
                selected={selected}
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
  tables, table,
  field, selectTag,
  activeItems, inactive,
  input: { value, onChange },
  multiple, allowNew, select, dispatch,
}) => {
  const { [selectTag]: { search, popUp } = emptyO } = select
  const { options, optionLookup } = compileOptions(tables, table, field)
  return (
    <div
      className={`select ${multiple ? 'multiselect' : emptyS}`}
    >
      {
        multiple
        ? <Tags
            optionLookup={optionLookup}
            activeItems={activeItems}
            inactive={inactive}
            value={value}
            selectTag={selectTag}
            dispatch={dispatch}
            onChange={onChange}
          />
        : <Head
            optionLookup={optionLookup}
            activeItems={activeItems}
            inactive={inactive}
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
            options={options}
            activeItems={activeItems}
            inactive={inactive}
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
}

export default connect(getSelect)(RelSelect)
