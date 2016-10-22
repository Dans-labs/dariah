import React, {Component, PropTypes} from 'react'
import { render } from 'react-dom'
import Markdown from 'react-markdown'
import { Link } from 'react-router'
import mdText from '../helpers/mdText.js'

const RouterLink = (props) => (
  props.href.match(/^(https?:)?\/\//)
    ? <a href={props.href}>{props.children}</a>
    : <Link to={props.href}>{props.children}</Link>
)

const MdDoc = (props) => {
  const textSource = props.docName;
  const text = mdText[textSource];
  return (
    <div style={{paddingLeft: '0.5em'}}>
      <Markdown
        source={text}
        renderers={{Link: RouterLink}}
      />
    </div>
  )
}

export default MdDoc
