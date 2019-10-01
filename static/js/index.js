/*eslint-env jquery*/

const SAVE = true
const DEBUG = true
const BLUR = true

const widgets = {
  text: {
    activate() {},
    read(elem) {
      return elem.prop('value')
    },
  },
  markdown: {
    activate() {},
    read(elem) {
      return elem.prop('value')
    },
  },
  bool: {
    activate(table, eid, field, parent, valueEl, targets) {
      targets.each((i, elem) => {
        const el = $(elem)
        const options = el.find('.button, .label')
        el.find('.button').off('click').click(e => {
          options.removeClass('active')
          const me = $(e.target)
          me.addClass('active')
          save(table, eid, field, valueEl, parent)
        })
      })
    },
    read(elem) {
      const el = elem.find('.active')
      return el.hasClass('fa-check')
        ? true
        : el.hasClass('fa-times')
        ? false
        : null
    },
  },
  related: {
    activate(table, eid, field, parent, valueEl, targets) {
      targets.each((i, elem) => {
        const el = $(elem)
        const options = el.find('.button, .tag')
        el.find('.button').off('click').click(e => {
          options.removeClass('active')
          const me = $(e.target)
          me.addClass('active')
          save(table, eid, field, valueEl, parent)
        })
      })
    },
    read(elem) {
      const el = elem.find('.active')
      return (el && el.attr('eid')) || null
    },
    collapseMultiple: true,
  },
}

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
  const valueCarrier = valueEl.find('[wvalue]')
  const wType = valueEl.attr('wtype')
  const { [wType]: { read, collapseMultiple } } = widgets
  const givenValue = multiple && !collapseMultiple
    ? $.makeArray(valueCarrier.map((i, el) => read($(el))))
      .filter(v => v !== '')
    : read(valueCarrier)
  const newValue = JSON.stringify(givenValue)
  const dirty = origValue != newValue

  if (DEBUG) {
    Console.log('SAVE:', {
      valueEl,
      multiple,
      wType,
      origValue,
      givenValue,
      newValue,
      dirty,
    })
  }
  if (dirty) {
    if (SAVE) {
      if (DEBUG) {
        Console.log(`Dirty value in widget ${wType}: save to database`)
      }
      const url = makeFieldUrl(table, eid, field, 'save')
      fetch(url, parent, newValue)
    }
    else {
      if (DEBUG) {
        Console.log('Dirty value: suppress saving to database')
        Console.log(`Dirty value in widget ${wType}: suppress saving`)
      }
      const url = makeFieldUrl(table, eid, field, 'view')
      fetch(url, parent)
    }
  }
  else {
    if (DEBUG) {
      Console.log(`Clean value in widget ${wType}: no save action`)
    }
    const url = makeFieldUrl(table, eid, field, 'view')
    fetch(url, parent)
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
    if (BLUR) {
      focusEl.off('blur').blur(() => {
        saveOrEdit(table, eid, field, valueEl, parent)
      })
    }
    for (const widget of Object.values(widgets)) {
      const widgetTargets = valueEl.find('[wvalue]')
      widget.activate(table, eid, field, parent, valueEl, widgetTargets)
    }
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
