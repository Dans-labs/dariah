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
        openCloseItems(destElem)
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
        openCloseItems(destElem)
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
        const url = el.attr('fetchurl')
        fetch(url, el)
      }
      else {
        el.html('...')
      }
    })
  })
}

const openCloseItems = destElem => {
  const targets = destElem ? destElem.find('details[itemkey]') : $('details[itemkey]')
  targets.each((i, elem) => {
    const el = $(elem)
    const itemKey = el.attr('itemkey')
    const forceOpen = el.attr('forceopen')
    const curOpen = el.prop('open')
    const prevOpen = localStorage.getItem(itemKey)
    const mustBeOpen = prevOpen || forceOpen
    if (curOpen) {
      if (!mustBeOpen) {
        el.prop('open', false)
      }
    }
    else if (!curOpen) {
      if (mustBeOpen) {
        el.prop('open', true)
      }
    }
    el.on('toggle', () => {
      if (elem.open) {
        localStorage.setItem(itemKey, 'open')
      }
      else {
        localStorage.setItem(itemKey, '')
      }
    })
  })
}

const Console = console

const makeFieldUrl = (table, eid, field, action) =>
  `/${table}/item/${eid}/${action}/${field}`

const view = (table, eid, field, valueEl, parent) => {
  const url = makeFieldUrl(table, eid, field, 'view')
  Console.log(`Viewing: ${url}`)
  fetch(url, parent)
}

const edit = (table, eid, field, valueEl, parent) => {
  const url = makeFieldUrl(table, eid, field, 'edit')
  fetch(url, parent)
}

const save = (table, eid, field, valueEl, parent) => {
  const origValue = atob(valueEl.attr('orig'))
  const multiple = valueEl.attr('multiple')
  const valueCarrier = valueEl.find('[value]')
  const givenValue = multiple
    ? $.makeArray(valueCarrier.map((i, el) => $(el).prop('value')))
      .filter(v => v !== '')
    : valueCarrier.prop('value')
  console.log({ valueCarrier })
  const newValue = JSON.stringify(givenValue)
  console.log('valueEl', valueEl)
  console.log('multiple', multiple)
  console.log('given', givenValue)
  console.log('orig:', origValue)
  console.log('new:', newValue)
  console.log('equal?', origValue == newValue)
  if (newValue == origValue) {
    Console.log('Saving: no change')
    const url = makeFieldUrl(table, eid, field, 'view')
    fetch(url, parent)
  }
  else {
    const debug = false
    if (debug) {
      Console.log('Saving: suppress')
      const url = makeFieldUrl(table, eid, field, 'view')
      fetch(url, parent)
    }
    else {
      Console.log('Saving: send to database')
      const url = makeFieldUrl(table, eid, field, 'save')
      fetch(url, parent, newValue)
    }
  }
}

const activateActions = destElem => {
  const targets = destElem ? destElem.find('[action]') : $('[action]')
  targets.each((i, elem) => {
    const el = $(elem)
    const action = el.attr('action')
    const table = el.attr('table')
    const eid = el.attr('eid')
    const field = el.attr('field')
    const parent = $(elem.closest('div'))
    const valueEl = parent.find('[orig]')
    const focusEl = parent.find('input,textarea')
    const focusElFirst = focusEl.get(0)
    if (focusElFirst) {
      focusElFirst.focus()
    }
    let saveOrEdit
    if (action == 'save') {
      parent.addClass('edit')
      saveOrEdit = save
    }
    else if (action == 'edit') {
      parent.removeClass('edit')
      saveOrEdit = edit
    }
    else if (action == 'view') {
      parent.removeClass('edit')
      saveOrEdit = view
    }
    el.off('click').click(() => {
      saveOrEdit(table, eid, field, valueEl, parent)
    })
    focusEl.off('blur').blur(() => {
      saveOrEdit(table, eid, field, valueEl, parent)
    })
  })
}

/* main
 *
 */

$(() => {
  activateFetch()
  activateActions()
  openCloseItems()
})
