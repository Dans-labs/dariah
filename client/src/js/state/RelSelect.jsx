import React, { Component } from 'react'

import { withContext, saveState } from '../helpers/hoc.js'

const RelOption = ({ valId, value, classes, onHit }) => (
  <p
    className={`option ${classes}`}
    onClick={event=>onHit(valId, value)}
  >{value}</p> 
)

const initState = ({ initVal, initText }) => ({ 
  poppedUp: false,
  search: '',
  selVal: initVal,
  selText: initText,
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
  changeSel(onChange, selVal, selText) {
    onChange(selVal, selText);
    this.setState({...this.state, poppedUp: false, selVal, selText})
  }

  addVal(onChange, selText) {
    const selVal = -1;
    onChange(-1, selText);
    this.setState({...this.state, poppedUp: false, selVal, selText})
  }

  render() {
    const { isNew, allowNew, valueList, onChange, classNames } = this.props;
    const { poppedUp, search, selVal, selText } = this.state;
    const pat = search.toLowerCase();
    const icon = poppedUp?(isNew?'minus':'arrow-up'):(isNew?'plus':'arrow-down');
    const classes = classNames.join(' ')
    return (
      <div className="select">
        <p className="option-head">
          {(isNew?null:<span className={classes}>{selText}</span>)}
          <span
            className={`xtag fa fa-${icon}`}
            onClick={this.popUp.bind(this)}
          />
        </p>
        {poppedUp? (
          <div>
            <p className="option-type">
              <input type="text"
                placeholder="search..."
                onChange={this.updSearch.bind(this)}
                defaultValue={search}
              />
              {(allowNew && search != '')?(
                <span
                  className={`xtag fa fa-plus-square`}
                  onClick={this.addVal.bind(this, onChange, search)}
                />
              ):null}
            </p>
            <div className="options">{
              valueList.map(([_id, value]) => (pat == null || pat == '' || value.toLowerCase().indexOf(pat) !== -1)?(
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

