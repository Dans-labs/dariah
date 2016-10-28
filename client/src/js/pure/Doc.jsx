import React, {Component, PropTypes} from 'react'

import MdDoc from './MdDoc.jsx';
import PdfDoc from './PdfDoc.jsx';
import NotFound from './NotFound.jsx';

const docType = {
  about: MdDoc,
  design: PdfDoc,
  deploy: MdDoc,
}

const Doc = ({ params, globals }) => {
  const docName = params.docName;
  const DocClass = docType[docName];
  return DocClass == undefined ? (
    <NotFound params={{splat: `document ${docName}`}}/>
  ) : (
    <DocClass globals={globals} docName={docName}/>
  )
}

export default Doc
