import React, { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, stack: null }
  }

  componentDidCatch(error, info) {
    console.error({ error, info })
    this.setState({ hasError: true, error: error.message, stack: info.componentStack })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={'error-boundary'}>
          <details open={true}>
            <summary>{this.state.error}</summary>
            <div><pre>{this.state.stack}</pre></div>
          </details>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
