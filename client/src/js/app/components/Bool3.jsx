import React, { Component } from 'react'

import { emptyS } from 'utils'
import { makeSubmitTime, editClass } from 'edit'
import { normalization } from 'datatypes'

import EditHelp from 'EditHelp'
import Tooltip from 'Tooltip'

const transition = {
  [true]: false,
  [false]: null,
  [null]: true,
}

class Bool3 extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.input.value === this.props.input.value) {
      return
    }
    const { props: { input: { value } } } = this
    this.dom.indeterminate = value === emptyS
  }
  handleCheck = () => {
    const {
      props: {
        input: { value, onChange },
        submitValues,
      },
    } = this
    const normVal = normalization.bool3(value)
    const newVal = transition[normVal]
    onChange(newVal)
    makeSubmitTime(submitValues)()
  }
  setIndeterminate = domElem => {
    const { props: { input: { value } } } = this
    if (domElem) {
      this.dom = domElem
      domElem.indeterminate = value === emptyS
    }
  }
  render() {
    const {
      props: {
        meta: { dirty, invalid, error },
        input: { value },
      },
    } = this
    return (
      <div>
        <Tooltip
          tip={<EditHelp type={'text'} dirty={dirty} />}
          at={'top'}
          focusOnly={true}
        >
          <input
            ref={this.setIndeterminate}
            type={'checkbox'}
            className={editClass(dirty, invalid)}
            checked={value}
            onChange={this.handleCheck}
          />
        </Tooltip>
        {error && <span className={'invalid diag'}>{error}</span>}
      </div>
    )
  }
}

export default Bool3
