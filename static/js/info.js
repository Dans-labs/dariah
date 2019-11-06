/*eslint-env jquery*/

let groupRel

const xTouched = {}

const openGid = gid => {
  $(`tr[gid="${gid}"].dd`).show()
}

const closeGid = gid => {
  $(`tr[gid="${gid}"].dd`).hide()
}
const closeGidH = gid => {
  closeGid(gid)
  const children = groupRel[gid]
  if (children != null) {
    children.forEach(child => {
      closeGidH(child)
    })
  }
}
const openGidH = gid => {
  openGid(gid)
  const children = groupRel[gid]
  if (children != null) {
    children.forEach(child => {
      const touched = xTouched[child]
      if (touched) {
        openGidH(child)
      }
    })
  }
}

const initExpandControls = () => {
  $('.dc.fa-chevron-circle-down').click(e => {
    e.preventDefault()
    const gid = $(this).attr('gid')
    const other = $(`a[gid="${gid}"].dc.fa-chevron-circle-up`)
    $(this).hide()
    xTouched[gid] = true
    openGidH(gid)
    other.show()
  })
  $('.dc.fa-chevron-circle-up').click(e => {
    e.preventDefault()
    const gid = $(this).attr('gid')
    const other = $(`a[gid="${gid}"].dc.fa-chevron-circle-down`)
    $(this).hide()
    xTouched[gid] = false
    closeGidH(gid)
    other.show()
  })
  $('.dca.fa-angle-double-down').click(e => {
    e.preventDefault()
    const gn = $(this).attr('gn')
    $(`.c-${gn} a.dc.fa-chevron-circle-down`).each(() => {
      const isOpen = $(this).css('display') == 'none'
      const gid = $(this).attr('gid')
      if (!isOpen) {
        const other = $(`a[gid="${gid}"].dc.fa-chevron-circle-up`)
        $(this).hide()
        xTouched[gid] = true
        openGidH(gid)
        other.show()
      }
    })
  })
  $('.dca.fa-angle-double-up').click(e => {
    e.preventDefault()
    const gn = $(this).attr('gn')
    $(`.c-${gn} a.dc.fa-chevron-circle-up`).each(() => {
      const isClosed = $(this).css('display') == 'none'
      const gid = $(this).attr('gid')
      if (!isClosed) {
        const other = $(`a[gid="${gid}"].dc.fa-chevron-circle-down`)
        $(this).hide()
        xTouched[gid] = false
        closeGidH(gid)
        other.show()
      }
    })
  })
}

$(() => {
  initExpandControls()
})
