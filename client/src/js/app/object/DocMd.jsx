import React, {Component} from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'
import { Link } from 'react-router'

import { getDoc, needDoc, changedDoc, fetchDoc } from 'docs'

import Alternative from 'Alternative'

const RouterLink = ({ children, href }) => (
  href.match(/^(https?:)?\/\//) ?
    <a href={href} >{children}</a> :
    <Link to={href} >{children}</Link>
)
const renderers = { Link: RouterLink }

const controlPlacement = control => <p style={{float: 'right'}} >{control}</p>
const controls = [
  handler => <a className="control fa fa-hand-o-down" href="#" title="markdown source" onClick={handler} />,
  handler => <a className="control fa fa-file-code-o" href="#" title="formatted" onClick={handler} />,
]

class DocMd extends Component {
  render() {
    const {props: { docName, text } } = this

    if (needDoc({ text })) {return <div>{`No document ${docName}`}</div>}
    return (
      <div style={{paddingLeft: '0.5em'}} >
        <Alternative
          tag={docName}
          controlPlacement={controlPlacement}
          controls={controls}
          alternatives={[(
            <div key="fmt" >
              <Markdown
                source={text}
                renderers={renderers}
              />
            </div>
          ), (
            <div key="src" >
              <pre className="md-source" >{text}</pre>
            </div>
          )]}
        />
      </div>
    )
  }
  componentDidMount() {
    const { props, props: { fetch } } = this
    fetch(props)
  }
  componentDidUpdate(prevProps) {
    const { props, props: { fetch } } = this
    if (changedDoc(props, prevProps)) {
      fetch(props)
    }
  }
}

export default connect(getDoc, { fetch: fetchDoc })(DocMd)
