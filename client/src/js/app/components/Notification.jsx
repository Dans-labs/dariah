import React, { Component } from 'react'
import { connect } from 'react-redux'

import { emptyS } from 'utils'

import { getNotes, clear, display } from 'notes'

import Tooltip from 'Tooltip'

class Notification extends Component {
  constructor(props) {
    super(props)
    this.dom = {}
  }
  refDom = label => dom => {
    if (dom) {this.dom[label] = dom}
  }
  handleBox = () => {
    const { props: { show, dispatch } } = this
    dispatch(display(!show))
  }
  handleHide = () => {
    const { props: { dispatch } } = this
    dispatch(display(false))
  }
  handleClear = () => {
    const { props: { dispatch } } = this
    dispatch(clear())
  }

    /*
    */

  render() {
    const { props: { messages, lastNote, lastKind, busy, show } } = this

    const highlight = lastNote > -1
    const busyBlocks = new Array(busy < 0 ? 0 : busy).fill(1)
    return (
      <div>
        <Tooltip
          tip={'click circle to show/hide notifications and progress messages'}
          at={'left'}
          fixed={true}
          classTip={'msg-spinner-tip'}
          classArrow={'msg-spinner-arrow'}
        >
          <p className={'msg-spinner'} >
            <span
              className={highlight ? `spin-${lastKind}` : 'spin-ok'}
            >
              {busyBlocks.map((b, i) => <span key={i} className={'msg-dot fa fa-caret-left'} />)}
              <span
                className={`fa fa-${busy === 0 ? 'circle-o' : 'spinner fa-spin'}`}
                onClick={this.handleBox}
              />
            </span>
          </p>
        </Tooltip>
        {
          show
          ? <div
              ref={this.refDom('notbox')}
              className={'msg-box'}
              onClick={this.handleHide}
            >{
              messages.map((msg, i) => (
                <p
                  key={i}
                  ref={this.refDom(`m${i}`)}
                  className={`msg-line ${[msg.kind]}-o ${msg.kind !== 'info' ? 'msg-high' : emptyS}`}
                >{msg.text}</p>
              ))
            }
              <p className={'msg-dismiss'} >{'(click panel to hide)'}</p>
              {
                messages.length > 1
                ? <p className={'msg-trash'} >
                    <a
                      href={'#'}
                      className={'control'}
                      onClick={this.handleClear}
                    ><span className={'control fa fa-trash'} />{' clear messages'}</a>
                  </p>
                : null
              }
            </div>
          : null
        }
      </div>
    )
  }
  componentDidMount() {this.setView()}
  componentDidUpdate() {this.setView()}

  setView() {
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

export default connect(getNotes)(Notification)
