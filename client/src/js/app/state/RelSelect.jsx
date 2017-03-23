import React, { Component } from 'react'

import { withContext, saveState } from 'hoc.js'
import memoBind from 'memoBind.js'

const RelOption = ({ value, selected, onHit }) => (
  <p
    className={`option ${selected}`}
    onClick={onHit}
  >{value.long || value.full}</p>
)

const initState = ({ initVal, initFull, initText }) => ({
  poppedUp: false,
  search: '',
  selVal: initVal,
  selFull: initFull,
  selText: initText,
})

const togglePopUp = ({ poppedUp }) => ({ poppedUp: !poppedUp })

class RelSelect extends Component {
  handlePopUp = () => {
    this.setState(togglePopUp)
  }
  handleSearch = event => {
    const { target: { value } } = event
    this.setState({ value })
  }
  changeSel = (selVal, selFull, selText) => () => {
    const { props: { onChange } } = this
    this.setState({poppedUp: false, selVal, selFull, selText})
    onChange(selVal, selFull, selText)
  }

  addVal = selText => () => {
    const { props: { onChange } } = this
    const selVal = null
    this.setState({poppedUp: false, selVal, selFull: selText, selText})
    onChange(null, selText)
  }
  setHeight = n => domElem => {
    if (domElem != null) {
      const height = Math.max(1, Math.min(n, 25)) * 1.7
      domElem.style.height = `${height}em`
      domElem.scrollIntoView()
    }
  }

  render() {
    const {
      props: { isNew, allowNew, valid, valueList, extraClasses },
      state: { poppedUp, search, selVal, selFull, selText },
    } = this
    const pat = search.toLowerCase()
    const icon = poppedUp ? (isNew ? 'minus' : 'arrow-up') : (isNew ? 'plus' : 'arrow-down')
    const xclasses = extraClasses.join(' ')
    return (
      <div className="select" >
        <p className="option-head tag-medium" >
          {(isNew ? null : <span className={xclasses} title={selFull} >{selText}</span>)}
          <span
            className={`button-small fa fa-${icon}`}
            onClick={this.handlePopUp}
          />
        </p>
        {(poppedUp || !valid) ? (
          <div className="option-popup" >
            <p className="option-type" >
              <input
                type="text"
                placeholder="search..."
                value={search}
                className={xclasses}
                onChange={this.handleSearch}
              />
              {(allowNew && search != '') ? (
                <span
                  className="button-small fa fa-plus-square"
                  onClick={memoBind(this, 'addVal', [search])}
                />
              ) : null}
            </p>
            <div
              ref={this.setHeight(valueList.length)}
              className="options"
            >{
              valueList.map(([_id, value]) => (
                pat == null || pat == '' || value == null || value.full == null || value.full.toLowerCase().indexOf(pat) !== -1
              ) ? (
                <RelOption
                  key={(_id == null) ? 'null' : _id}
                  value={value}
                  selected={_id == selVal}
                  onHit={memoBind(this, 'changeSel', [_id], [value.full, value.text])}
                />
              ) : null)
            }</div>
          </div>) : null
        }
      </div>
    )
  }
}

export default withContext(saveState(RelSelect, 'RelSelect', initState))
