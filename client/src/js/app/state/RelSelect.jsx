import React, { Component } from 'react'

import { withContext, saveState } from 'hoc.js'

const RelOption = ({ valId, value, selected, onHit }) => (
  <p
    className={`option ${selected}`}
    onClick={event=>onHit(valId, value.full, value.text)}
  >{value.long || value.full}</p> 
)

const initState = ({ initVal, initFull, initText }) => ({ 
  poppedUp: false,
  search: '',
  selVal: initVal,
  selFull: initFull,
  selText: initText,
})

class RelSelect extends Component {
  popUp() {
    let { poppedUp } = this.state;
    poppedUp = !poppedUp;
    this.setState({ poppedUp })
  }
  updSearch(event) {
    const search = event.target.value;
    this.setState({ search })
  }
  changeSel(onChange, selVal, selFull, selText) {
    this.setState({poppedUp: false, selVal, selFull, selText});
    onChange(selVal, selFull, selText);
  }

  addVal(onChange, selText) {
    const selVal = null;
    this.setState({poppedUp: false, selVal, selFull: selText, selText})
    onChange(null, selText);
  }
  setHeight(n, domElem) {
    if (domElem != null) {
      const height = Math.max(1, Math.min(n, 25))*1.7;
      domElem.style.height = `${height}em`;
      domElem.scrollIntoView();
    }
  }

  render() {
    const { isNew, allowNew, valid, valueList, onChange, extraClasses } = this.props;
    const { poppedUp, search, selVal, selFull, selText } = this.state;
    const pat = search.toLowerCase();
    const icon = poppedUp?(isNew?'minus':'arrow-up'):(isNew?'plus':'arrow-down');
    const xclasses = extraClasses.join(' ');
    return (
      <div className="select">
        <p className="option-head tag-medium">
          {(isNew?null:<span className={xclasses} title={selFull}>{selText}</span>)}
          <span
            className={`button-small fa fa-${icon}`}
            onClick={this.popUp.bind(this)}
          />
        </p>
        {(poppedUp || !valid)? (
          <div className="option-popup">
            <p className="option-type">
              <input type="text"
                placeholder="search..."
                onChange={this.updSearch.bind(this)}
                value={search}
                className={xclasses}
              />
              {(allowNew && search != '')?(
                <span
                  className="button-small fa fa-plus-square"
                  onClick={this.addVal.bind(this, onChange, search)}
                />
              ):null}
            </p>
            <div
              ref={this.setHeight.bind(this, valueList.length)}
              className="options"
            >{
              valueList.map(([_id, value]) => (
                pat == null || pat == '' || value == null || value.full == null || value.full.toLowerCase().indexOf(pat) !== -1)?(
                <RelOption
                  key={(_id == null)?'null':_id}
                  valId={_id}
                  value={value}
                  selected={_id == selVal}
                  onHit={this.changeSel.bind(this, onChange)}
                />
              ):null)
            }</div>
          </div>):null
        }
      </div>
    );
  }
}

export default withContext(saveState(RelSelect, 'RelSelect', initState))
