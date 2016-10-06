import React, { Component, PropTypes } from 'react';
import Contrib from './Contrib.jsx';

export default class Contribs extends Component {
  render() {
    return (
      <div style={{height: '100%', overflow: 'auto'}}>
        <table>
          <tbody>{
          this.props.data.map((item) => (
              <Contrib key={item._id} data={item} />
          ))
          }</tbody>
        </table>
      </div>
    );
  }
}

Contribs.propTypes = {
  data: PropTypes.array.isRequired,
}
