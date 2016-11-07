import React from 'react'

/**
 * **purely functional** {@link external:Component|Component}
 * 
 * Displays an HTML document by linking to it in an IFRAME.
 *
 * @constructor
 * @param {string} docDir the directory part of the location of the document
 * @param {string} docName the name part (without extension) of the location of the document
 * @param {string} docExt the extension the document
 * @returns {Fragment}
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

export default DocHtml
