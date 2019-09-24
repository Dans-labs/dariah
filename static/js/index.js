/*eslint-env jquery*/

const fetch = (url, destElem, data) => {
  if (data == null) {
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
  else {
    $.ajax({
      type: 'POST',
      headers: { 'Content-Type': 'application/json' },
      url,
      data,
      processData: false,
      contentType: false,
      success: html => {
        destElem.html(html)
        activateActions(destElem)
      },
    })
  }
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

const save = (url, valueEl, parent) => {
  const data = JSON.stringify(valueEl.prop('value'))
  fetch(url, parent, data)
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
    const valueEl = parent.find('[value]')
    if (action == 'save') {
      parent.addClass('edit')
    }
    else if (action == 'edit') {
      parent.removeClass('edit')
    }
    el.off('click').click(() => {
      save(url, valueEl, parent)
    })
    valueEl.off('blur').blur(() => {
      save(url, valueEl, parent)
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
