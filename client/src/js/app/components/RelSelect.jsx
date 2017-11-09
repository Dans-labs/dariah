import React from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo'
import { combineSelectors, emptyS, emptyO } from 'utils'
import { handle, handlEV } from 'handle'
import { composeAttributes, checkDisabled } from 'fields'

import { getSettings } from 'settings'
import { getSelect, compileOptions, setSearch, setPopUp, togglePopUp } from 'select'

const RelOption = ({ label, attributes, selected, onHit }) => (
  <p
    {...attributes}
    data-rh={'select this option'}
    data-rh-at={'bottom'}
    onClick={selected ? null : onHit}
  >{label}</p>
)

const removeVal = (value, onChange, val) => event => {
  event.stopPropagation()
  if (value.includes(val)) {
    const newValue = value.filter(v => v !== val)
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
      data-rh={'click anywhere on this line to hide/show the remaining options'}
      data-rh-at={'top'}
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
                    data-rh={'UNselect this option'}
                    data-rh-at={'bottom'}
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

const Head = ({ optionLookup, value, popUpIfEmpty, activeItems, inactive, selectTag, dispatch }) => {
  const makeAttributes = composeAttributes(activeItems, inactive)
  let label = emptyS
  const { [value]: lab = value } = optionLookup
  label = lab
  const classes = ['option-head', 'tag']
  if (value === emptyS) {
    if (popUpIfEmpty) {
      return null
    }
    else {
      label = 'click to enter a value'
      classes.push('new')
    }
  }
  const attributes = makeAttributes(value, classes.join(' '))
  return (
    <span
      {...attributes}
      data-rh={'click here to see the other options'}
      data-rh-at={'top'}
      onClick={handle(dispatch, togglePopUp, selectTag)}
    >{label}</span>
  )
}

const Typing = ({ selectTag, search, dispatch, placeHolder }) => (
  <span className={'option-type'} >
    {
      search
      ? <span
          className={'button-tag'}
          data-rh={'clear typing'}
          data-rh-at={'bottom'}
          onClick={handle(dispatch, setSearch, selectTag, emptyS)}
        >{'×'}</span>
        : <span>{'\xa0'}</span>
    }
    {'\xa0'}
    <input
      className={'invisible'}
      type={'text'}
      data-rh={placeHolder}
      data-rh-at={'left'}
      placeholder={'type here ...'}
      value={search || emptyS}
      onFocus={handle(dispatch, setPopUp, selectTag, true)}
      onChange={handlEV(dispatch, setSearch, selectTag)}
    />
  </span>
)

const Options = ({
  selectTag, optionLookup, options,
  activeItems, inactive,
  multiple, allowNew,
  value, onChange, search, dispatch,
}) => {
  const pat = (search || emptyS).toLowerCase()
  const makeAttributes = composeAttributes(activeItems, inactive)
  const testDisabled = checkDisabled(activeItems, inactive)
  return (
    <div className={'options'} >
      {
        multiple || value == null || value == emptyS
        ? null
        : <span
            className={'button-tag tag option'}
            data-rh={'do not select any option'}
            data-rh-at={'bottom'}
            onClick={changeSel(selectTag, multiple, null, null, onChange, dispatch)}
          >{'( × )'}</span>
      }
      {
        (
          allowNew
          && search
          && !options.some(({ label }) => label === search)
          && !value.includes(search)
        )
        ? <span
            className={'new tag'}
            data-rh={'add this as a NEW option'}
            data-rh-at={'bottom'}
            onClick={addVal(optionLookup, multiple, value, onChange, search)}
          >{search}</span>
        : null
      }
      {
        options.map(({ value: val, label: lab }) => {
          if (
            (!multiple || !value.includes(val))
            && (pat == null || pat === emptyS || lab == null || lab.toLowerCase().indexOf(pat) !== -1)
            && !testDisabled(val)
          ) {
            const selected = (multiple && value.includes(val)) || (!multiple && value === val)
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
  settings,
  tables, table,
  field, selectTag,
  activeItems, inactive,
  allowed,
  input: { value, onChange },
  multiple, allowNew, popUpIfEmpty, select, dispatch,
  suppressTyping,
}) => {
  const { [selectTag]: { search, popUp } = emptyO } = select
  const { options, optionLookup } = compileOptions(tables, table, allowed, field, settings)
  const realPopUp = popUp
  || (popUpIfEmpty && (value == null || (multiple && value.length == 0) || (!multiple && !value)))
  const itemType = allowNew === true
  ? 'value'
  : allowNew || emptyS
  const addItem = itemType
    ? ` or add a new ${itemType}`
  : emptyS
  const placeHolder = `filter remaining options${addItem}`
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
            popUpIfEmpty={popUpIfEmpty}
            selectTag={selectTag}
            dispatch={dispatch}
          />
      }
      {
        realPopUp && !suppressTyping
        ? <Typing
            selectTag={selectTag}
            search={search}
            dispatch={dispatch}
            placeHolder={placeHolder}
          />
        : null
      }
      {
        realPopUp
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

const getInfo = combineSelectors(getSettings, getSelect)

export default connect(getInfo)(RelSelect)
