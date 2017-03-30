import React, {Component} from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'
import { Link } from 'react-router'
import Alternative from 'Alternative.jsx'
import { fetchData } from 'server.js'
import { getDoc } from 'doc.js'

const RouterLink = ({ children, href }) => (
  href.match(/^(https?:)?\/\//)
    ? <a href={href} >{children}</a>
    : <Link to={href} >{children}</Link>
)

class DocMd extends Component {
  render() {
    const {props: { docName, data } } = this
    const controlPlacement = control => <p style={{float: 'right'}} >{control}</p>
    const control1 = handler => <a className="control fa fa-hand-o-down" href="#" title="markdown source" onClick={handler} />
    const control2 = handler => <a className="control fa fa-file-code-o" href="#" title="formatted" onClick={handler} />

    if (data == null) {
      return <div>{`No document ${docName}`}</div>
    }
    return (
      <div style={{paddingLeft: '0.5em'}} >
        <Alternative
          tag={docName}
          controlPlacement={controlPlacement}
          controls={[control1, control2]}
          alternatives={[(
            <div key="fmt" >
              <Markdown
                source={data}
                renderers={{Link: RouterLink}}
              />
            </div>
          ), (
            <div key="src" >
              <pre className="md-source" >{data}</pre>
            </div>
          )]}
        />
      </div>
    )
  }
  componentDidMount() {
    const {props: { docDir, docName, docExt, fetch } } = this
    const path = `${docDir}/${docName}.${docExt}`
    fetch({ type: 'fetchDoc', contentType: 'json', path, desc: `document ${docName}` })
  }
}

export default connect(getDoc, { fetch: fetchData })(DocMd)
