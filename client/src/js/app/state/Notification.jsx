import React, { Component } from 'react'
import memoBind from 'memoBind.js'

const empty = []

class Notification extends Component {
  constructor(props) {
    super(props)
    this.msgs = [] // synchronous list of messages
    this.visible = false
    this.dom = {}
  }
  notify(msg) {
    this.msgs.push(msg) // synchronous addition of msg
    this.setState({msgs: [...(this.msgs)]}) // asynchronous update of the state
  }
  clear() {
    this.msgs = [] // synchronous clearing of msg
    this.setState({msgs: []}) // asynchronous update of the state
  }
  computeProgress() {
    const lastMsg = this.msgs.length - 1
    let lastNote = -1
    let lastKind = 'info'
    let busy = 0
    this.msgs.forEach((msg, i) => {
      if (msg.kind == 'error') {lastNote = i; lastKind = 'error'}
      else if (msg.kind == 'warning') {
        if (lastKind != 'error') {lastNote = i; lastKind = 'warning'}
      }
      busy += msg.busy || 0
    })
    if (busy < 0) {
      //warn(`SHOULD NOT HAPPEN: negative value for busy ${busy}`)
      busy = 0
    }
    const visible = this.visible || (lastNote > -1)
    return [lastMsg, lastNote, lastKind, busy, visible]
  }
  refDom = label => dom => {
    if (dom) {this.dom[label] = dom}
  }

  notificationHandler = action => event => {
    event.preventDefault()
    if (action == null) {
      this.clear()
    }
    else {
      this.setView(action)
    }
  }

  render() {
    [this.lastMsg, this.lastNote, this.lastKind, this.busy, this.visible] = this.computeProgress()
    const busyBlocks = new Array(this.busy).fill(1)
    return (
      <div>
        <p className="msg-spinner" >
          <span
            title="show/hide notifications and progress messages"
            className={this.lastNote > -1 ? `spin-${this.lastKind}` : 'spin-ok'}
          >
            { busyBlocks.map((b, i) => <span key={i} className="msg-dot fa fa-caret-left" />) }
            <span
              className={`fa fa-${this.busy == 0 ? 'circle-o' : 'spinner fa-spin'}`}
              onClick={memoBind(this, 'notificationHandler', [!this.visible])}
            />
          </span>
        </p>
        <div
          ref={memoBind(this, 'refDom', ['notbox'])}
          className="msg-box"
          onClick={memoBind(this, 'notificationHandler', [false])}
        >{
          (this.msgs || empty).map((msg, index) => (
            <p
              title={msg.cause}
              key={index}
              ref={memoBind(this, 'refDom', [`m${index}`])}
              className={`msg-line ${[msg.kind]}-o ${(msg.kind != 'info') ? 'msg-high' : ''}`}
            >{msg.text}</p>
          ))
        }
          <p className="msg-dismiss" >{'(click panel to hide)'}</p>
          <p className="msg-trash" >
            <a
              href="#"
              title="clear messages"
              className="control fa fa-trash"
              onClick={memoBind(this, 'notificationHandler', [null])}
            />
          </p>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.setView()
  }
  componentDidUpdate() {
    this.setView()
  }
  setView(on) {
    if (on != null) {
      this.visible = on
    }
    this.dom.notbox.style.display = this.visible ? 'block' : 'none'
    this.setScroll()
  }
  setScroll() {
    if (this.visible) {
      if (this.lastNote > -1) {
        this.dom[`m${this.lastNote}`].scrollIntoView()
      }
      else {
        if (this.lastMsg > -1) {
          this.dom[`m${this.lastMsg}`].scrollIntoView()
        }
      }
    }
  }
}

export default Notification
