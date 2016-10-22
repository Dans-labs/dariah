import React, {Component, PropTypes} from 'react'
import { render } from 'react-dom'
import Markdown from 'react-markdown'
import mdText from '../helpers/mdText.js'

const MdDoc = (props) => {
  const textSource = props.docName;
  const text = mdText[textSource];
  return (
    <div style={{paddingLeft: '0.5em'}}>
      <Markdown source={text}/>
    </div>
  )
}

export default MdDoc
