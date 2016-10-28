import React, { Component, PropTypes } from 'react'

const msgStyle = {
  info: {
    color: '#222222',
  },
  error: {
    color: '#bb0000',
    fontWeight: 'bold',
  },
  warning: {
    color: '#886600',
    fontWeight: 'bold',
  },
  good: {
    color: '#00aa00',
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
  dismiss: {
    paddingTop: 2,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
    fontStyle: 'italic',
    fontSize: 'smaller',
    textAlign: 'right',
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
  dot: {
    fontSize: 'small',
  }
}

export default class Notification extends Component {
  constructor(props) {
    super(props);
    props.globals.notification = this
    this.store = props.globals.store;
    this.key = 'Notification';
    this.store.register(this, this.key, {msgs: null})
    this.msgs = []; // synchronous list of messages
    this.visible = false;
  }
  componentWillUnmount() {
    this.store.save(this.key);
  }
  notify(msg) {
    this.msgs.push(msg); // synchronous addition of msg
    this.setState({msgs: [...(this.msgs)]}); // asynchronous update of the state
  }
  computeProgress() {
    const lastMsg = this.msgs.length -1;
    let lastError = -1;
    let busy = 0
    this.msgs.forEach((msg, i) => {
      if (msg.kind == 'error') {lastError = i}
      busy += msg.busy || 0;
    })
    if (busy < 0) {
      console.warn(`SHOULD NOT HAPPEN: negative value for busy ${busy}`);
      busy = 0;
    }
    const visible = this.visible || (lastError > -1);
    return [lastMsg, lastError, busy, visible];
  }
  render() {
    [this.lastMsg, this.lastError, this.busy, this.visible] = this.computeProgress();
    const busyBlocks = new Array(this.busy).fill(1);
    return ( 
      <div>
        <p style={msgStyle.spinner}>
          <a href="#" className={this.lastError > -1 ? 'spin-err' : 'spin-ok'}
            onClick={e=>{e.preventDefault(); this.setView(!this.visible)}}
          >
            { busyBlocks.map((b, i) => <span key={i} style={msgStyle.dot} className="fa fa-circle"></span>) }
            <span className={`fa fa-${this.busy == 0 ? 'circle-o' : 'spinner fa-spin'}`}/>
          </a>
        </p>
        <div ref="notbox" style={msgStyle.box}
          onClick={e=>{e.preventDefault(); this.setView(false)}}
        >
          {
            (this.msgs || []).map((msg, index) => (
            <p
              key={index} ref={`m${index}`}
              style={{...msgStyle.line, ...msgStyle[msg.kind]}}
            >{msg.text}</p>
            ))
          }
          <p style={msgStyle.dismiss}>click to dismiss</p>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.setView();
  }
  componentDidUpdate() {
    this.setView();
  }
  setView(on) {
    if (on !== undefined) {
      this.visible = on;
    }
    this.refs.notbox.style.display = this.visible ? 'block' : 'none';
    this.setScroll();
  }
  setScroll() {
    if (this.visible) {
      if (this.lastError > -1) {
        this.refs[`m${this.lastError}`].scrollIntoView();
      }
      else {
        if (this.lastMsg > -1) {
          this.refs[`m${this.lastMsg}`].scrollIntoView()
        }
      }
    }
  }
}

Notification.propTypes = {
  globals: PropTypes.object.isRequired,
}
