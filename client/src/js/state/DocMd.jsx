import React, {Component, PropTypes} from 'react'
import Markdown from 'react-markdown'
import { Link } from 'react-router'
import Alternatives from '../state/Alternatives.jsx'

import { getData } from '../helpers/data.js'
import { withContext, saveState } from '../helpers/hoc.js'

const RouterLink = ({ children, href }) => (
  href.match(/^(https?:)?\/\//)
    ? <a href={href}>{children}</a>
    : <Link to={href}>{children}</Link>
)

class DocMd extends Component {
  render() {
    const { docName } = this.props;
    const text = this.state[docName];
    if (text == null ) {
      return <div/>
    }
    return (
      <div style={{paddingLeft: '0.5em'}}>
        <Alternatives tag={docName}
          controlPlacement={control => (
            <p style={{float: 'right'}}>{control}</p>
          )}
          controls={[
            (handler => <a ref='toSrc' className='control fa fa-hand-o-down' href='#' onClick={handler} title="markdown source"/>),
            (handler => <a ref='toFrm' className='control fa fa-file-code-o' href='#' onClick={handler} title="formatted"/>),
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
  fetchText() {
    const { docDir, docName, docExt } = this.props;
    if (this.state[docName] == null ) {
      getData(
        [ { type: 'json', path: `${docDir}/${docName}.${docExt}`, branch: docName } ],
        this,
        this.props.notification.component
      );
    }
  }
  componentDidMount() {
    this.fetchText();
  }
  componentDidUpdate() {
    this.fetchText();
  }
}

DocMd.propTypes = {
  docDir: PropTypes.string.isRequired,
  docName: PropTypes.string.isRequired,
  docExt: PropTypes.string.isRequired,
};

export default withContext(saveState(DocMd, 'DocMd', {}))
