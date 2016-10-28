import React, { Component } from 'react'
import  Login from '../pure/Login.jsx'
import Notification from './Notification.jsx'
import { getData } from '../helpers/data.js'

const showMe = element => element.style.display = 'block';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.store = props.globals.store;
    this.key = 'App';
    this.store.register(this, this.key, {})
  }
  componentWillUnmount() {
    this.store.save(this.key);
  }
  render() {
    const { globals } = this.props;
    return (
      <div>
        <Notification globals={globals}/>
        <p className="nav" style={{paddingRight: '5em'}}>
          <img style={{
              marginBottom: '-1em',
              marginTop: '-1em',
              height: "3em",
            }}
            src="/static/images/inkind_logo_small.png"
            title="information about this site"
          />
          {this.state.user != undefined ? (
            <Login
              user={this.state.user}
            />
          ) : ''}
        </p>
        {this.props.children}
      </div>
    )
  }
  componentDidMount() {
    getData({
        user: 'user',
      },
      this,
      this.props.globals.notification,
    );
  }
}

