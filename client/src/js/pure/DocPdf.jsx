import React from 'react'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * Displays a PDF document by linking to it in an OBJECT.
 *
 * **NB:** On iOS this does not work well, only the first page of the PDF gets shown,
 * we work around it by just displaying a link to open the PDF in a new tab.
 * We only do that when we detect an iOS browser.
 *
 * @class
 * @param {string} docDir the directory part of the location of the document
 * @param {string} docName the name part (without extension) of the location of the document
 * @param {string} docExt the extension the document
 * @returns {Fragment}
 */
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

export default DocPdf
