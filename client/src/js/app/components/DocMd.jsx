import React, { Component } from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'
import { Link } from 'react-router'

import { combineSelectors } from 'utils'

import { getDoc, needDoc, changedDoc, fetchDoc } from 'docs'
import { getAltSection, compileAlternatives } from 'alter'

import Tooltip from 'Tooltip'
import ErrorBoundary from 'ErrorBoundary'

const RouterLink = ({ children, href }) =>
  href.match(/^(https?:)?\/\//) ? (
    <a href={href}>{children}</a>
  ) : (
    <Link to={href}>{children}</Link>
  )
const renderers = { Link: RouterLink }

class DocMd extends Component {
  render() {
    const { props: { alter, alterSection, text, docName, dispatch } } = this

    if (needDoc({ text })) {
      return `No document ${docName}`
    }

    const { getAlt, nextAlt } = compileAlternatives(
      alterSection,
      2,
      0,
      dispatch,
    )('format')
    const alt = getAlt(alter)

    return (
      <ErrorBoundary>
        <div style={{ paddingLeft: '0.5em' }}>
          <p style={{ float: 'right' }}>
            <Tooltip
              tip={`${alt === 0 ? 'markdown source' : 'formatted'}`}
              at={'right'}
            >
              <a
                href={'#'}
                className={`control fa fa-${
                  alt === 0 ? 'hand-o-down' : 'file-code-o'
                }`}
                onClick={nextAlt}
              />
            </Tooltip>
          </p>
          {alt === 0 ? (
            <Markdown source={text} renderers={renderers} />
          ) : (
            <pre className={'md-source'}>{text}</pre>
          )}
        </div>
      </ErrorBoundary>
    )
  }
  componentDidMount() {
    const { props, props: { dispatch } } = this
    dispatch(fetchDoc(props))
  }
  componentDidUpdate(prevProps) {
    const { props, props: { dispatch } } = this
    if (changedDoc(props, prevProps)) {
      dispatch(fetchDoc(props))
    }
  }
}

const getInfo = combineSelectors(getDoc, getAltSection)

export default connect(getInfo)(DocMd)
