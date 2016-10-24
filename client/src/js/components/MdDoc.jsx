import React, {PropTypes} from 'react'
import Markdown from 'react-markdown'
import { Link } from 'react-router'
import mdText from '../helpers/mdText.js'
import AlternativesContainer from './AlternativesContainer.jsx'

const RouterLink = (props) => (
  props.href.match(/^(https?:)?\/\//)
    ? <a href={props.href}>{props.children}</a>
    : <Link to={props.href}>{props.children}</Link>
)

const MdDoc = ({ docName }) => {
  const text = mdText[docName];
  return (
    <div style={{paddingLeft: '0.5em'}}>
      <AlternativesContainer
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
            <pre>{text}</pre>
          </div>),
        ]}
      />
    </div>
  )
}

export default MdDoc
