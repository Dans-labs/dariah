import React, {PropTypes} from 'react'
import Markdown from 'react-markdown'
import { Link } from 'react-router'
import mdText from '../helpers/mdText.js'
import Alternatives from '../state/Alternatives.jsx'

const RouterLink = ({ children, href }) => (
  href.match(/^(https?:)?\/\//)
    ? <a href={href}>{children}</a>
    : <Link to={href}>{children}</Link>
)

const MdDoc = ({ docName, globals }) => {
  const text = mdText[docName];
  return (
    <div style={{paddingLeft: '0.5em'}}>
      <Alternatives globals={globals} tag={docName}
        controlPlacement={control => (
          <p style={{float: 'right'}}>{control}</p>
        )}
        controls={[
          (handler => <a ref='toSrc' className='fa fa-hand-o-down' href='#' onClick={handler} title="markdown source"/>),
          (handler => <a ref='toFrm' className='fa fa-file-code-o' href='#' onClick={handler} title="formatted"/>),
        ]}
        alternatives={[
          (<div>
            <Markdown
              source={text}
              renderers={{Link: RouterLink}}
            />
          </div>),
          (<div>
            <pre style={{fontSize: 'large', color: '#0000aa', whiteSpace: 'pre-wrap'}}>{text}</pre>
          </div>),
        ]}
      />
    </div>
  )
}

export default MdDoc
