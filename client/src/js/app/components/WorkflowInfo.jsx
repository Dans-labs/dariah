import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { emptyO } from 'utils'

import { fetchWorkflow, resetWorkflow, getWorkflow } from 'workflow'

import ErrorBoundary from 'ErrorBoundary'

class WorkflowInfo extends Component {
  handleReset = () => {
    const { props: { dispatch } } = this
    dispatch(resetWorkflow)
  }

  render() {
    const { props: { workflow: { resets, stats, total } = emptyO } } = this
    if (total == null) {
      return <div>{'No workflow reset information'}</div>
    }
    return (
      <ErrorBoundary>
        <div>
          <h3>{'Workflow information'}</h3>
          <h4>{'Current workflow attribute usage'}</h4>
          <p>{`Number of records with workflow information (all tables): ${total}`}</p>
          {Object.entries(stats).map(([attribute, tableInfo]) => (
          <Fragment key={attribute}>
            <p><b>{attribute}</b></p>
            <ul>
            {Object.entries(tableInfo).map(([table, count]) => (
            <li key={table}>{`${table}: ${count} x`}</li>
            ))}
          </ul>
          </Fragment>
          ))
          }
          <div
            className={'workflow large button info'}
            onClick={this.handleReset}
          >
            {'Reset now'}
          </div>
          <h4>{'Previous resets'}</h4>
          {resets.map(({ dateReset, affected }) => (
            <div key={dateReset}>
              <p>
                <b>{`Reset performed on ${dateReset}:`}</b>
              </p>
              {affected.map((line, i) => <p key={i}>{line}</p>)}
            </div>
          ))}
        </div>
      </ErrorBoundary>
    )
  }
  fetchData() {
    const { props: { workflow, dispatch } } = this
    if (!(workflow && workflow.total)) {
      dispatch(fetchWorkflow)
    }
  }
  componentDidMount() {
    this.fetchData()
  }
  componentDidUpdate() {
    this.fetchData()
  }
}

export default connect(getWorkflow)(WorkflowInfo)
