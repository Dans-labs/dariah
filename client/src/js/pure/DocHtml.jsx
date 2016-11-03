import React, {Component, PropTypes} from 'react'

/**
 * @class
 * @classdesc
 * **purely functional** {@link external:Component|Component}
 */
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
