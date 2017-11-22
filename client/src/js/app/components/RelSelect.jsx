import React from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo'
import { combineSelectors, emptyS, emptyO } from 'utils'
import { handle, handlEV } from 'handle'
import { composeAttributes, checkDisabled, makeSubmitTime } from 'fields'

import { getSettings } from 'settings'
import { getSelect, compileOptions, setSearch, setPopUp, togglePopUp } from 'select'

import Tooltip from 'Tooltip'

const RelOption = ({ label, attributes, selected, multiple, onHit }) => (
  <Tooltip
    tip={
      selected
      ? `${label} is currently selected`
      : multiple
        ? `add ${label}`
        : `select ${label}`
    }
    at={'bottom'}
  >
    <p
      {...attributes}
      onClick={selected ? null : onHit}
    >{label}</p>
  </Tooltip>
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

const Head = ({
  optionLookup, value,
  popUp, popUpIfEmpty,
  activeItems, inactive,
  selectTag, dispatch,
}) => {
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
  const dir = popUp ? 'up' : 'down'
  return (
    <Tooltip
      tip={`click here to ${popUp ? 'hide' : 'show'} the other options`}
      at={'right'}
    >
      <span
        {...attributes}
        onClick={handle(dispatch, togglePopUp, selectTag)}
      >
        {label}
        {' '}
        <span className={`fa fa-arrow-${dir} ${dir}`} />
      </span>
    </Tooltip>
  )
}

const Tags = ({
  selectTag,
  optionLookup,
  popUp, popUpIfEmpty,
  activeItems, inactive,
  value,
  onChange, dispatch,
}) => {
  const makeAttributes = composeAttributes(activeItems, inactive)
  const dir = popUp ? 'up' : 'down'
  return (
    <Tooltip
      tip={`click on this line to ${popUp ? 'hide' : 'show'} the remaining options`}
      at={'top'}
    >
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
                    <Tooltip
                      tip={`remove ${lab}`}
                      at={'bottom'}
                    >
                      <span
                        className={`button-tag`}
                        onClick={removeVal(value, onChange, val)}
                      >{'×'}</span>{' '}
                    </Tooltip>
                    <span>{lab}</span>
                  </span>
                )
              }
            )
          : popUpIfEmpty
            ? null
            : <span className={'tag empty'}>{'click to enter values'}</span>
        }
        <span className={`fa fa-arrow-${dir} ${dir}`} />
      </div>
    </Tooltip>
  )
}

const Typing = ({ selectTag, search, dispatch, placeHolder }) => (
  <span className={'option-type'} >
    {
      search
      ? <Tooltip
          tip={'clear typing'}
          at={'bottom'}
        >
          <span
            className={'button-tag'}
            onClick={handle(dispatch, setSearch, selectTag, emptyS)}
          >{'×'}</span>
        </Tooltip>
      : <span>{'\xa0'}</span>
    }
    {'\xa0'}
    <Tooltip
      tip={placeHolder}
      at={'left'}
    >
      <input
        className={'typing'}
        type={'text'}
        placeholder={'type here ...'}
        value={search || emptyS}
        onFocus={handle(dispatch, setPopUp, selectTag, true)}
        onChange={handlEV(dispatch, setSearch, selectTag)}
      />
    </Tooltip>
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
  const oLen = options.length
  const sizeClass = oLen >= 20
  ? 'o-large'
  : 'o-small'

  return (
    <div className={`options ${sizeClass}`} >
      {
        multiple || value == null || value == emptyS
        ? null
        : <Tooltip
            tip={'clear selection'}
            at={'bottom'}
          >
            <span
              className={'button-tag tag option'}
              onClick={changeSel(selectTag, multiple, null, null, onChange, dispatch)}
            >{'( × )'}</span>
          </Tooltip>
      }
      {
        (
          allowNew
          && search
          && !options.some(({ label }) => label === search)
          && !value.includes(search)
        )
        ? <Tooltip
            tip={`add ${search} as a NEW option`}
            at={'bottom'}
          >
            <span
              className={'new tag'}
              onClick={addVal(optionLookup, multiple, value, onChange, search)}
            >{search}</span>
          </Tooltip>
        : null
      }
      {
        options.map(({ value: val, label: lab }) => {
          if (
            (!multiple || !value.includes(val))
            && (pat == null || pat === emptyS || lab == null || lab.toString().toLowerCase().indexOf(pat) !== -1)
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
                multiple={multiple}
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
  tables, table, eId,
  field, selectTag,
  activeItems, inactive,
  allowed,
  input: { name, value, onChange },
  multiple, allowNew, popUpIfEmpty, select, dispatch,
  suppressTyping,
  submitValues,
}) => {
  const submitTime = makeSubmitTime(submitValues)
  const onChangeSave = val => {onChange(val); submitTime()}
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
            table={table}
            eId={eId}
            name={name}
            value={value}
            selectTag={selectTag}
            popUp={realPopUp}
            popUpIfEmpty={popUpIfEmpty}
            dispatch={dispatch}
            onChange={onChangeSave}
          />
        : <Head
            optionLookup={optionLookup}
            activeItems={activeItems}
            inactive={inactive}
            table={table}
            eId={eId}
            name={name}
            value={value}
            popUp={realPopUp}
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
            onChange={onChangeSave}
          />
        : null
      }
    </div>
  )
}

const getInfo = combineSelectors(getSettings, getSelect)

export default connect(getInfo)(RelSelect)
