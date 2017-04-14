import React, { Component } from 'react'

import { memoBind } from 'memo.js'

const RelOption = ({ rep, selected, onHit }) => (
  <p
    className={`option ${selected}`}
    onClick={onHit}
  >{rep}</p>
)

const togglePopUp = ({ poppedUp }) => ({ poppedUp: !poppedUp })

class RelSelect extends Component {
  constructor(props) {
    super(props)
    const { input: { value }, options } = props
    this.lookup = {}
    options.forEach(([value, rep]) => {this.lookup[value] = rep})
    this.state = {
      poppedUp: false,
      search: '',
      value,
    }
  }

  handlePopUp = () => {
    this.setState(togglePopUp)
  }
  handleSearch = event => {
    const { target: { value } } = event
    this.setState({ search: value })
  }
  changeSel = value => () => {
    const { props: { input: { onChange } } } = this
    this.setState({ poppedUp: false, value })
    onChange(value)
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
      props: { options },
      state: { poppedUp, search, value },
    } = this
    const pat = search.toLowerCase()
    const icon = poppedUp ? 'arrow-up' : 'arrow-down'
    const { lookup: { [value]: repVal } } = this
    return (
      <div className="select" >
        <p className="option-head tag-medium" >
          <span>{repVal}</span>
          <span
            className={`button-small fa fa-${icon}`}
            onClick={this.handlePopUp}
          />
        </p>
        {(poppedUp) ? (
          <div className="option-popup" >
            <p className="option-type" >
              <input
                type="text"
                placeholder="search..."
                value={search}
                onChange={this.handleSearch}
              />
            </p>
            <div
              ref={this.setHeight(options.length)}
              className="options"
            >{
              options.map(([val, rep]) => (
                pat == null || pat == '' || rep == null || rep.toLowerCase().indexOf(pat) !== -1
              ) ? (
                <RelOption
                  key={(val == null) ? 'null' : val}
                  rep={rep}
                  selected={val == value}
                  onHit={memoBind(this, 'changeSel', [val], [val])}
                />
              ) : null)
            }</div>
          </div>) : null
        }
      </div>
    )
  }
}

export default RelSelect
