import React, { Component } from 'react'
import { withContext, saveState } from 'hoc.js'

const empty = [];

/**
 * @class
 * @classdesc
 * **stateful** {@link external:Component|Component}
 *
 * Component that receives notifications and displays them in a 
 * little div with fixed position on the screen.
 *
 * <img src="/api/file/tech/docs/design/design.006.jpeg" width="800"/>
 */
class Notification extends Component {
/**
 * Upon construction this component registers itself as an object in {@link globals}.
 * The state consists of the list of messages.
 */
  constructor(props) {
    super(props);
    props.notification.component = this
    this.msgs = []; // synchronous list of messages
    this.visible = false;
    this.dom = {};
  }
  notify(msg) {
    this.msgs.push(msg); // synchronous addition of msg
    this.setState({msgs: [...(this.msgs)]}); // asynchronous update of the state
  }
  clear() {
    this.msgs = []; // synchronous clearing of msg
    this.setState({msgs: []}); // asynchronous update of the state
  }
/**
 * Collects the parameters to display progress information
 * @method
 * @returns {Array} See the input of {@link Notification#render|render}
*/
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
/**
 * Unobtrusive notification:
 *
 * * if all is well, just a little circle fixed in the upper right corner
 * * if we are waiting for the server: a spinner and a few extra disks for each pending process
 * * clicking on the circle pops up a message panel
 * * if there are errors/warnings, the circle changes color and a message panel pops up automatically
 * * which can be dismissed by clicking on it
 * * and previous messages can be cleared
 *
 * @param {number} lastMsg number of the last message in the panel
 * @param {number} lastNote number of the last error/warning message in the panel
 * @param {number} lastKind kind of the last error/warning message in the panel
 * @param {number} busy: the sum of the individual `busy` attributes of the messages
 * @param {boolean} visible: whether we should show the panel
 * @returns {Fragment}
 */
  refDom(label, dom) {
    if (dom) {this.dom[label] = dom}
  }

  render() {
    [this.lastMsg, this.lastNote, this.lastKind, this.busy, this.visible] = this.computeProgress();
    const busyBlocks = new Array(this.busy).fill(1);
    return ( 
      <div>
        <p className="msg-spinner">
          <span
            title="show/hide notifications and progress messages"
            className={this.lastNote > -1 ? `spin-${this.lastKind}` : 'spin-ok'}
            onClick={e=>{e.preventDefault(); this.setView(!this.visible)}}
          >
            { busyBlocks.map((b, i) => <span key={i} className="msg-dot fa fa-caret-left"></span>) }
            <span className={`fa fa-${this.busy == 0 ? 'circle-o' : 'spinner fa-spin'}`}/>
          </span>
        </p>
        <div
          ref={this.refDom.bind(this, 'notbox')}
          className="msg-box"
          onClick={e=>{e.preventDefault(); this.setView(false)}}
        >
          {
            (this.msgs || empty).map((msg, index) => (
            <p
              key={index}
              ref={this.refDom.bind(this, `m${index}`)}
              className={`msg-line ${[msg.kind]}-o ${(msg.kind != 'info')?'msg-high':''}`}
            >{msg.text}</p>
            ))
          }
          <p
            className="msg-dismiss">(click panel to hide)
          </p>
          <p className="msg-trash">
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
/**
 * Hide/show message panel and scrolls to relevant message.
 *
 * @method
 * @param {boolean} on Whether the message panel should be displayed or not
 * @returns {DOM}
 * Hides or shows the div containing the message panel.
*/
  setView(on) {
    if (on != null) {
      this.visible = on;
    }
    this.dom.notbox.style.display = this.visible ? 'block' : 'none';
    this.setScroll();
  }
  setScroll() {
    if (this.visible) {
      if (this.lastNote > -1) {
        this.dom[`m${this.lastNote}`].scrollIntoView();
      }
      else {
        if (this.lastMsg > -1) {
          this.dom[`m${this.lastMsg}`].scrollIntoView()
        }
      }
    }
  }
}

export default withContext(saveState(Notification, 'Notification', {msgs: null}))
