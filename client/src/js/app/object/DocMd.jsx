import React, {Component} from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'
import { Link } from 'react-router'
import Alternative from 'Alternative.jsx'
import { getDoc, needDoc, changedDoc, fetchDoc } from 'doc.js'

const RouterLink = ({ children, href }) => (
  href.match(/^(https?:)?\/\//)
    ? <a href={href} >{children}</a>
    : <Link to={href} >{children}</Link>
)

class DocMd extends Component {
  render() {
    const {props: { docName, text } } = this
    const controlPlacement = control => <p style={{float: 'right'}} >{control}</p>
    const control1 = handler => <a className="control fa fa-hand-o-down" href="#" title="markdown source" onClick={handler} />
    const control2 = handler => <a className="control fa fa-file-code-o" href="#" title="formatted" onClick={handler} />

    if (needDoc({ text })) {return <div>{`No document ${docName}`}</div>}
    return (
      <div style={{paddingLeft: '0.5em'}} >
        <Alternative
          tag={docName}
          controlPlacement={controlPlacement}
          controls={[control1, control2]}
          alternatives={[(
            <div key="fmt" >
              <Markdown
                source={text}
                renderers={{Link: RouterLink}}
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
