import React, {Component, PropTypes} from 'react'

const DocPdf = ({ docDir, docName, docExt }) => {
  const href = `/api/file${docDir}/${docName}.${docExt}`;
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  return iOS ? (
      <p>
        <a target="_blank" href={href}>{docName}</a> (open pdf in a new tab)
      </p>
    ) : (
      <object
        height="100%" width="100%"
        data={href} type="application/pdf"
      >
        alt : <a target="_blank" href={href}>{docName}</a> (open pdf in a new tab)
      </object>
  )
}

DocPdf.propTypes = {
  docDir: PropTypes.string.isRequired,
  docName: PropTypes.string.isRequired,
  docExt: PropTypes.string.isRequired,
}

export default DocPdf
