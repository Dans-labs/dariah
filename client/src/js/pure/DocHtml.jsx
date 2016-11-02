import React, {Component, PropTypes} from 'react'

const DocHtml = ({ docDir, docName, docExt }) => {
  const src = `/api/file${docDir}/${docName}.${docExt}`;
  return (
    <iframe
      height="100%" width="100%"
      src={src}
    >
    </iframe>
  )
}

DocHtml.propTypes = {
  docDir: PropTypes.string.isRequired,
  docName: PropTypes.string.isRequired,
  docExt: PropTypes.string.isRequired,
}

export default DocHtml
