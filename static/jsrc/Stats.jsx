import React, { Component, PropTypes } from 'react';

export default class Stats extends Component {
  render(){
    const thisrep = this.props.thisamount == null? '' :`${this.props.thisamount}`;
    const totalrep = this.props.total == null?'':`${this.props.total}`;
    const ofrep = (this.props.total == null || this.props.thisamount == null)? '' : ' of ';
    return (
      <span style={{color: '#0000dd', fontSize: 'small', fontWeight: 'normal'}}>
        ({thisrep+ofrep}<span style={{fontWeight: 'bold'}}>{totalrep}</span>)
      </span>
    );
  }
}

Stats.propTypes = {
  thisamount: PropTypes.number,
  total: PropTypes.number,
}
