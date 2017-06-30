import React from 'react'

const DocHtml = ({ docDir, docName, docExt }) => {
  const src = `/api/file${docDir}/${docName}.${docExt}`
  return (
    <iframe
      height={'100%'}
      width={'100%'}
      src={src}
    />
  )
}

export default DocHtml
