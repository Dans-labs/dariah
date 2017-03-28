import React from 'react'

import DocMd from 'DocMd.jsx'
import DocPdf from 'DocPdf.jsx'
import DocHtml from 'DocHtml.jsx'
import NotFound from 'NotFound.jsx'

const docType = {
  md: DocMd,
  pdf: DocPdf,
  html: DocHtml,
}

const Doc = ({ location: { pathname: docPath } }) => {
  const [docDir, docFile] = /^(.*)\/([^/]+)$/g.exec(docPath).slice(1)
  const [docName, docExt] = /^(.*)\.([^.]+)$/g.exec(docFile).slice(1)
  const { [docExt]: DocClass } = docType
  return DocClass == null ? (
    <NotFound params={{splat: `document ${docPath}`}} />
  ) : (
    <DocClass docDir={docDir} docName={docName} docExt={docExt} tag={docName} />
  )
}

export default Doc
