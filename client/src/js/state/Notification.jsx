import React, { Component, PropTypes } from 'react'

const msgStyle = {
  info: {
    color: '#880000',
  },
  error: {
    color: '#ff0000',
    fontWeight: 'bold',
  },
  warning: {
    color: '#aaff00',
    fontWeight: 'bold',
  },
  good: {
    color: '#00ff00',
    fontWeight: 'bold',
  },
  special: {
    color: '#000000',
    fontWeight: 'bold',
  },
  line: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  box: {
    position: 'fixed',
    top: 40,
    right: 10,
    width: 200,
    height: 100,
    overflow: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 2000,
    opacity: 0.9,
    verticalAlign: 'middle',
    cursor: 'pointer',
    backgroundColor: '#eeeeee',
    border: '2px solid #aaaaaa',
    borderRadius: 8,
    fontSize: 'small',
  },
  spinner: {
    position: 'fixed',
    top: '0.05em',
    right: '1em',
    width: '5em',
    height: '2em',
    textAlign: 'right',
    paddingLeft: 0,
    paddingRight: 0,
    zIndex: 2000,
    opacity: 0.9,
    verticalAlign: 'middle',
    cursor: 'pointer',
    fontSize: 'medium',
  },
}

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.store = props.globals.store;
    this.sKey = this.constructor.name;
    if (!this.store.has(this.sKey)) {
      this.state = {msgs: null};
    }
    else {
      this.state = this.store.get(this.sKey);
    }
    props.globals.notification = this
  }
  componentWillUnmount() {
    this.store.set(this.sKey, this.state);
  }
  componentDidMount() {
    this.focusLast();
  }
  componentDidUpdate() {
    this.focusLast();
  }
  focusLast() {
    const lastMsg = (this.state && this.state.msgs)? this.state.msgs.length : 0;
    if (lastMsg) {
      this.refs[`m${lastMsg-1}`].scrollIntoView();
    }
  }
  notify(msg) {
    if (!this.state) {
        /* This component has not been mounted.
         * We add the message to the saved state in the store
         */
      if (!this.store.has(this.sKey)) { // saved store is empty too
        this.store.set(this.sKey, {msgs: [msg]})
      }
      else {
        const savedState = this.store.get(this.sKey);
        if (savedState.msgs == null) {
          savedState.msgs = [msg]
        }
        else {
          savedState.msgs.push(msg)
        }
      }
    }
    else {
      this.setState({msgs: [...(this.state.msgs || []), msg]})
    }
  }
  visible(on) {
    this.refs.notbox.style.display = on?'block':'none'
  }
  render() {
    const {msgs} = this.state;
    return ( 
      <div>
        <p style={msgStyle.spinner}>
          <a href="#" className="control fa fa-spinner"
            onClick={e=>{e.preventDefault(); this.visible(true)}}
          />
        </p>
        {(msgs != null && msgs.length != 0) ? ( 
          <div ref="notbox" style={msgStyle.box}>
            {
              msgs.map((msg, index) => (
              <p
                key={index} ref={`m${index}`}
                style={{...msgStyle.line, ...msgStyle[msg.kind]}}
              >{msg.text}</p>
              ))
            }
            <a href="#" className="control fa fa-close"
              onClick={e=>{e.preventDefault(); this.visible(false)}}
            />
          </div>
          ) : null
        }
      </div>
    )
  }
}

Notification.propTypes = {
  globals: PropTypes.object.isRequired,
}
