import React, {Component} from 'react'
import Markdown from 'react-markdown'
import { Link } from 'react-router'
import Alternatives from 'Alternatives.jsx'

import { getData } from 'data.js'
import { withContext, saveState } from 'hoc.js'

/**
 * @module DocMd
 */

/**
 * A handler for links in the MarkDown source.
 * It makes it possible to write MarkDown documents with
 * internal links to this application.
 *
 * A full link (with protocol `http`(`s`) is translated to a 
 * plain HTML `a` element, so it will leave this application.
 *
 * Other links are translated to Link elements for the 
 * {@link external:Routing|router}.
*/
const RouterLink = ({ children, href }) => (
  href.match(/^(https?:)?\/\//)
    ? <a href={href}>{children}</a>
    : <Link to={href}>{children}</Link>
)

/**
 * @class
 * @classdesc
 * **stateful** {@link external:Component|Component}
 *
 * Component to show MarkDown text, coming from files on the server.
 * The conversion to HTML is done client side,
 * and the user gets a control to switch between MarkDown source and
 * formatted HTML.
 */
class DocMd extends Component {
/**
 * @method
 * @param {string} docName the name part (without extension) of the location of the document
 * @returns {Fragment}
 */
  render() {
    const { docName } = this.props;
    const text = this.state.md;
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
/**
 * Fetches a markdown document from the server, packaged as string in a JSON object.
 *
 * @method
 * @param {string} docDir the directory part of the location of the document
 * @param {string} docName the name part (without extension) of the location of the document
 * @param {string} docExt the extension the document
 */
  fetchText() {
    const { docDir, docName, docExt } = this.props;
    if (this.state.md == null ) {
      getData(
        [ { type: 'json', path: `${docDir}/${docName}.${docExt}`, branch: 'md' } ],
        this,
        this.props.notification.component
      );
    }
  }
  componentDidMount()  {this.fetchText()}
  componentDidUpdate() {this.fetchText()}
}

export default withContext(saveState(DocMd, 'DocMd', {md: null}))
