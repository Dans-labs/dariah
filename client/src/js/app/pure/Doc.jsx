import React from 'react'

import DocMd from 'DocMd'
import DocPdf from 'DocPdf'
import DocHtml from 'DocHtml'
import NotFound from 'NotFound'

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
    <NotFound splat={`document ${docPath}`} />
  ) : (
    <DocClass docDir={docDir} docName={docName} docExt={docExt} tag={docName} />
  )
}

export default Doc
