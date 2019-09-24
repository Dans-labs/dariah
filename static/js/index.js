/*eslint-env jquery*/

const fetch = (url, destElem) => {
  $.ajax({
    type: 'GET',
    url,
    processData: false,
    contentType: false,
    success: html => {
      destElem.html(html)
      activateActions(destElem)
    },
  })
}

const activateFetch = () => {
  $('[fetchurl]').each((i, elem) => {
    const parent = elem.closest('details')
    const el = $(elem)
    $(parent).on('toggle', () => {
      if (parent.open) {
        fetch(el.attr('fetchurl'), el)
      }
      else {
        el.html('...')
      }
    })
  })
}

const activateActions = destElem => {
  const targets = destElem ? destElem.find('[action]') : $('[action]')
  targets.each((i, elem) => {
    const parent = $(elem.closest('div'))
    const el = $(elem)
    const table = el.attr('table')
    const eid = el.attr('eid')
    const field = el.attr('field')
    const action = el.attr('action')
    const url = `/${table}/item/${eid}/${action}/${field}`
    el.off('click').click(() => {
      fetch(url, parent)
    })
  })
}

/* main
 *
 */

$(() => {
  activateFetch()
  activateActions()
})
