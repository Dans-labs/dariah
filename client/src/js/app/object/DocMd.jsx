import React, {Component} from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'
import { Link } from 'react-router'

import { combineSelectors } from 'utils'

import { getDoc, needDoc, changedDoc, fetchDoc } from 'docs'
import { getAlts, makeAlt } from 'alter'

const RouterLink = ({ children, href }) => (
  href.match(/^(https?:)?\/\//)
  ? <a href={href} >{children}</a>
  : <Link to={href} >{children}</Link>
)
const renderers = { Link: RouterLink }

class DocMd extends Component {
  render() {
    const {props, props: { docName, text } } = this
    if (needDoc({ text })) {return <div>{`No document ${docName}`}</div>}

    const { alt, nextAlt } = makeAlt(props, {
      alterTag: docName,
      nAlts: 2,
      initial: 0,
    })
    return (
      <div style={{paddingLeft: '0.5em'}} >
        <p style={{float: 'right'}} >
          <a
            href="#"
            className={`control fa fa-${alt == 0 ? 'hand-o-down' : 'file-code-o'}`}
            title={`${alt == 0 ? 'markdown source' : 'formatted'}`}
            onClick={nextAlt}
          />
        </p>
        {
          alt == 0
          ? <div>
              <Markdown
                source={text}
                renderers={renderers}
              />
            </div>
          : <div>
              <pre className="md-source" >{text}</pre>
            </div>
        }
      </div>
    )
  }
  componentDidMount() {
    const { props, props: {dispatch } } = this
    dispatch(fetchDoc(props))
  }
  componentDidUpdate(prevProps) {
    const { props, props: {dispatch } } = this
    if (changedDoc(props, prevProps)) {
      dispatch(fetchDoc(props))
    }
  }
}

const getInfo = combineSelectors(getDoc, getAlts)

export default connect(getInfo)(DocMd)
