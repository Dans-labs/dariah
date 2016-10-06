import React, { Component, PropTypes } from 'react';
import 'whatwg-fetch';
import Contribs from './Contribs.jsx';
import Messages from './Messages.jsx';
import Filters from './Filters.jsx';

export default class ContribsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      filtered: new Set(),
      server_ok: true,
      msgs: [{info: 'loading'}],
    };
  }
  componentDidMount() {
    fetch(this.props.source)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        data: responseData.data,
        filtered: new Set(responseData.data.map(row => row._id)),
        msgs: responseData.msgs,
        server_ok: responseData.good,
      });
    })
    .catch((error) => {
      this.setState({
        data: null,
        msgs: [{kind: 'error', text: `${error}`}],
        server_ok: false,
      });
      console.log('Error fetching data', error);
    });
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  afterCompute(fset) {
    this.setState({filtered: fset});
  }
  
  render() {
    const filteredData = this.state.data == null ? null : this.state.data.filter((row) => this.state.filtered.has(row._id));
    return filteredData == null ? (
      <div>
        <div style={this.props.column('40%', 'left')}>
        </div>
        <div style={this.props.column('60%')}>
          <Messages data={this.state.msgs}/>
          {this.state.server_ok ? '' : <p>There were errors</p>}
        </div>
      </div>
    ) : (
      <div>
        <div style={this.props.column('40%', 'left')}>
          <p
            style={{fontWeight: 'bold', backgroundColor: '#eeeeff'}}
          >Showing {filteredData.length} of {this.state.data.length}</p>
          <Filters data={this.state.data} afterCompute={this.afterCompute.bind(this)}/>
        </div>
        <div style={this.props.column('60%')}>
          <Messages data={this.state.msgs}/>
          <Contribs data={filteredData}/>
        </div>
      </div>
    )
  }
}

ContribsContainer.propTypes = {
  source: PropTypes.string.isRequired,
}


