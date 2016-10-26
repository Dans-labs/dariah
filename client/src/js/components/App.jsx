import React, { Component } from 'react'
import  NavLink  from './NavLink.jsx'
import  Login from './Login.jsx'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {user: {}, msgs: []};
  }
  getUser() {
    const { msgs, } = this.state;
    this.setState({...this.state,
      msgs: [...msgs, {kind: 'special', text: 'getting user info ...'}],
    });
    fetch('/whoami')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({...this.state,
        msgs: [...msgs, {kind: 'info', text: 'user info obtained.'}],
        user: (responseData.viewState && responseData.viewState.user) || {},
      });
    })
    .catch((error) => {
      this.setState({...this.state,
        msgs: [...msgs, {kind: 'error', text: 'could not get user info'}],
      });
      console.log('could not get user info', error.toString());
    });
  }
  componentDidMount() {
    this.getUser();
  }
  render() {
    return (
      <div>
        <p className="nav">
          <NavLink to="/home/about">
            <img style={{
                marginBottom: '-1em',
                marginTop: '-1em',
                height: "3em",
              }}
              src="/static/images/inkind_logo_small.png"
              title="information about this site"
            />
            </NavLink>
          <NavLink to="/contrib">Contributions</NavLink>
          <Login
            user={this.state.user}
          />
        </p>
        {this.props.children}
      </div>
    )
  }
}

