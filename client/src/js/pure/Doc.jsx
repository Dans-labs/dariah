import React, {Component, PropTypes} from 'react'

import DocMd from '../state/DocMd.jsx';
import DocPdf from './DocPdf.jsx';
import DocHtml from './DocHtml.jsx';
import NotFound from './NotFound.jsx';

const docType = {
  md: DocMd,
  pdf: DocPdf,
  html: DocHtml,
}

/**
 * @class
 * @classdesc
 * **purely functional** {@link external:Component|Component}
 */
const Doc = ({ params, route }) => {
  const docPath = route.path.replace(':docFile', params.docFile);
  const [x, docDir, docFile] = /^(.*)\/([^/]+)$/g.exec(docPath);
  const [y, docName, docExt] = /^(.*)\.([^.]+)$/g.exec(docFile);
  const DocClass = docType[docExt];
  return DocClass == undefined ? (
    <NotFound params={{splat: `document ${docPath}`}}/>
  ) : (
    <DocClass docDir={docDir} docName={docName} docExt={docExt}/>
  )
}

export default Doc
