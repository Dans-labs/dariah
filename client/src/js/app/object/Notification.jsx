import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNotifications, clear, display } from 'notify.js'

class Notification extends Component {
  constructor(props) {
    super(props)
    this.dom = {}
  }
  refDom = label => dom => {
    if (dom) {this.dom[label] = dom}
  }

  render() {
    const { props: { notifications, lastMsg, lastNote, lastKind, busy, show, display, clear } } = this
    const highlight = lastNote > -1
    const busyBlocks = new Array((busy < 0) ? 0 : busy).fill(1)
    return (
      <div>
        <p className="msg-spinner" >
          <span
            title="show/hide notifications and progress messages"
            className={highlight ? `spin-${lastKind}` : 'spin-ok'}
          >
            { busyBlocks.map((b, i) => <span key={i} className="msg-dot fa fa-caret-left" />) }
            <span
              className={`fa fa-${busy == 0 ? 'circle-o' : 'spinner fa-spin'}`}
              onClick={() => display(!show)}
            />
          </span>
        </p>
        {show? (
          <div
            ref={this.refDom('notbox')}
            className="msg-box"
            onClick={() => display(false)}
          >{
            (notifications).map((msg, i) => (
              <p
                key={i}
                ref={this.refDom(`m${i}`)}
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
                onClick={() => clear()}
              />
            </p>
          </div>
        ): null}
      </div>
    )
  }
  componentDidMount() {this.setView()}
  componentDidUpdate() {this.setView()}

  setView(on) {
    const { props: { show } } = this
    if (show) {this.setScroll()}
  }
  setScroll() {
    const { props: { show } } = this
    if (show) {
      const { props: { lastMsg, lastNote } } = this
      const highlight = lastNote > -1
      if (highlight) {
        this.dom[`m${lastNote}`].scrollIntoView()
      }
      else {
        if (lastMsg > -1) {
          this.dom[`m${lastMsg}`].scrollIntoView()
        }
      }
    }
  }
}

export default connect(getNotifications, { clear, display })(Notification)
