import React, {Component, PropTypes} from 'react'

import MdDoc from './MdDoc.jsx';
import PdfDoc from './PdfDoc.jsx';

const docType = {
  about: MdDoc,
  design: PdfDoc,
  deploy: MdDoc,
}

const Doc = (props) => {
  const docName = props.params.docName;
  const DocClass = docType[docName];
  return <DocClass docName={docName}/>
}

export default Doc
