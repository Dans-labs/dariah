import React, { Component, PropTypes } from 'react';

export default class ShowHide extends Component {
  constructor(props) {
    super();
    this.show = props.showInit;
  }
  componentDidMount() {
    this.applyShowHide();
  }
  applyShowHide(event) {
    const {
      component,
    } = this.props;
    if (event) {event.preventDefault()}
    this.show = !this.show;
    const showC = this.refs.showControl;
    const hideC = this.refs.hideControl;
    if (this.show) {
      if (component) {component.style.display = 'block'}
      hideC.style.display = 'inline';
      showC.style.display = 'none';
    }
    else {
      if (component) {component.style.display = 'none'}
      hideC.style.display = 'none';
      showC.style.display = 'inline';
    }
  }
  render(){
    return (
    <span>
      <a ref='hideControl' className='fa fa-chevron-down' href='#' onClick={this.applyShowHide.bind(this)}/>
      <a ref='showControl' className='fa fa-chevron-right' href='#' onClick={this.applyShowHide.bind(this)}/>
    </span>
    );
  }
}

ShowHide.propTypes = {
  showInit: PropTypes.bool,
}
