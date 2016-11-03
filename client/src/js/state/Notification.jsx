import React, { Component, PropTypes } from 'react'
import { withContext, saveState } from '../helpers/hoc.js'

const msgStyle = {
  info: {
    color: '#222222',
  },
  error: {
    color: '#dd0000',
    fontWeight: 'bold',
  },
  warning: {
    color: '#dd8800',
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
  trash: {
    paddingTop: 2,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
    fontSize: 'larger',
    float: 'left',
  },
  dismiss: {
    paddingTop: 2,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
    fontStyle: 'italic',
    fontSize: 'smaller',
    float: 'right',
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

const empty = [];

/**
 * @class
 * @classdesc
 * **stateful** {@link external:Component|Component}
 *
 * Component that receives notifications and displays them in a 
 * little div with fixed position on the screen.
 */
class Notification extends Component {
  constructor(props) {
    super(props);
    props.notification.component = this
    this.msgs = []; // synchronous list of messages
    this.visible = false;
  }
  notify(msg) {
    this.msgs.push(msg); // synchronous addition of msg
    this.setState({msgs: [...(this.msgs)]}); // asynchronous update of the state
  }
  clear() {
    this.msgs = []; // synchronous clearing of msg
    this.setState({msgs: []}); // asynchronous update of the state
  }
  computeProgress() {
    const lastMsg = this.msgs.length -1;
    let lastNote = -1;
    let lastKind = 'info';
    let busy = 0
    this.msgs.forEach((msg, i) => {
      if (msg.kind == 'error') {lastNote = i, lastKind = 'error'}
      else if (msg.kind == 'warning') {
        if (lastKind != 'error') {lastNote = i, lastKind = 'warning'}
      }
      busy += msg.busy || 0;
    })
    if (busy < 0) {
      console.warn(`SHOULD NOT HAPPEN: negative value for busy ${busy}`);
      busy = 0;
    }
    const visible = this.visible || (lastNote > -1);
    return [lastMsg, lastNote, lastKind, busy, visible];
  }
  render() {
    [this.lastMsg, this.lastNote, this.lastKind, this.busy, this.visible] = this.computeProgress();
    const busyBlocks = new Array(this.busy).fill(1);
    return ( 
      <div>
        <p style={msgStyle.spinner}>
          <a
            title="show/hide notifications and progress messages"
            href="#"
            className={this.lastNote > -1 ? `spin-${this.lastKind}` : 'spin-ok'}
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
            (this.msgs || empty).map((msg, index) => (
            <p
              key={index} ref={`m${index}`}
              style={{...msgStyle.line, ...msgStyle[msg.kind]}}
            >{msg.text}</p>
            ))
          }
          <p
            style={msgStyle.dismiss}>(click panel to hide)
          </p>
          <p style={msgStyle.trash}>
            <a href="#" title="clear messages" className="control fa fa-trash"
              onClick={e=>{e.preventDefault(); this.clear()}}
            />
          </p>
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
      if (this.lastNote > -1) {
        this.refs[`m${this.lastNote}`].scrollIntoView();
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
}

export default withContext(saveState(Notification, 'Notification', {msgs: null}))
