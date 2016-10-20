import React, {Component, PropTypes} from 'react'
import { render } from 'react-dom'
import Markdown from 'react-markdown'
import mdText from '../helpers/mdText.js'

export default class MDText extends Component {
  render() {
    const textSource = this.props.params.text;
    const text = mdText[textSource];
    return (
      <div style={{paddingLeft: '0.5em'}}>
        <Markdown source={text}/>
      </div>
    )
  }
}

