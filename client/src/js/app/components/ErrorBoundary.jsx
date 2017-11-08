import React, { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  componentDidCatch(error) {
    this.setState({ hasError: true, error: error.message })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={'error-boundary'}>
          {this.state.error}
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
