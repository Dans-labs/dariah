import React, { Component } from 'react';
import ContribsContainer from './ContribsContainer.jsx';

const subtract = 100;

class App extends Component {
  getWinHeight() {
    return window.innerHeight - subtract;
  }
  columnStyle(width, kind) {
    return {
      width: width,
      height: this.getWinHeight(),
      overflow: 'auto',
      'WebkitOverflowScrolling': 'touch',
      float: kind || 'left',
      'paddingLeft': !kind ? '1em' : '0em',
      'paddingRight': !kind ? '1em' : '0em',
    };
  }
  render() {
    return (
      <ContribsContainer source="/dariah/data/list_contrib.json" column={this.columnStyle.bind(this)}/>
    );
  }
}
export default App;
