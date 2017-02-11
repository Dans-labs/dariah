import React, { Component } from 'react'

import { withContext, saveState } from '../helpers/hoc.js'

const RelOption = ({ valId, value, classes, onHit }) => (
  <p
    className={`option ${classes}`}
    onClick={event=>onHit(valId, value.text, value.full)}
  >{value.text}</p> 
)

const initState = ({ initVal, initText, initFull }) => ({ 
  poppedUp: false,
  search: '',
  selVal: initVal,
  selText: initText,
  selFull: initFull,
})

class RelSelect extends Component {
  popUp() {
    let { poppedUp } = this.state;
    poppedUp = !poppedUp;
    this.setState({...this.state, poppedUp })
  }
  updSearch(event) {
    const search = event.target.value;
    this.setState({...this.state, search})
  }
  changeSel(onChange, selVal, selText, selFull) {
    this.setState({...this.state, poppedUp: false, selVal, selText, selFull});
    onChange(selVal, selText, selFull);
  }

  addVal(onChange, selText) {
    const selVal = -1;
    this.setState({...this.state, poppedUp: false, selVal, selText, selText})
    onChange(-1, selText);
  }

  render() {
    const { isNew, allowNew, valid, valueList, onChange, classNames, extraClasses } = this.props;
    const { poppedUp, search, selVal, selText, selFull } = this.state;
    const pat = search.toLowerCase();
    const icon = poppedUp?(isNew?'minus':'arrow-up'):(isNew?'plus':'arrow-down');
    const classes = classNames.join(' ')
    const aclasses = classNames.concat(extraClasses).join(' ')
    const xclasses = extraClasses.join(' ');
    return (
      <div className="select">
        <p className="option-head">
          {(isNew?null:<span className={aclasses} title={selFull}>{selText}</span>)}
          <span
            className={`xtag fa fa-${icon}`}
            onClick={this.popUp.bind(this)}
          />
        </p>
        {(poppedUp || !valid)? (
          <div>
            <p className="option-type">
              <input type="text"
                placeholder="search..."
                onChange={this.updSearch.bind(this)}
                value={search}
                className={xclasses}
              />
              {(allowNew && search != '')?(
                <span
                  className={`xtag fa fa-plus-square`}
                  onClick={this.addVal.bind(this, onChange, search)}
                />
              ):null}
            </p>
            <div className="options">{
              valueList.map(([_id, value]) => (pat == null || pat == '' || value.full.toLowerCase().indexOf(pat) !== -1)?(
                <RelOption
                  key={_id}
                  valId={_id}
                  value={value}
                  classes={(_id == selVal)?classes:''}
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
