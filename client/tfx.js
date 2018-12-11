
const switchMode = m => {
  const mode = $('#mode')
  const pageNav = $('#navigation')
  const pages = $('#pages')
  const passages = $('#passages')
  const sectionsTable = $('#sectionsTable')
  const tuplesTable = $('#tuplesTable')
  const queryTable = $('#queryTable')
  const passageTable = $('#passageTable')

  mode.val(m)
  if (m == 'passage') {
    pageNav.hide()
    pages.hide()
    passages.show()
    sectionsTable.hide()
    tuplesTable.hide()
    queryTable.hide()
    passageTable.show()
  }
  else if (m == 'results') {
    pageNav.show()
    pages.show()
    passages.hide()
    sectionsTable.show()
    tuplesTable.show()
    queryTable.show()
    passageTable.hide()
  }
}

const modes = () => {
  const mode = $('#mode')
  const m = mode.val()
  const passageTable = $('#passageTable')

  $('#moderesults').click(e => {
    e.preventDefault()
    storeForm()
    switchMode('results')

  })
  $('#modepassage').click(e => {
    e.preventDefault()
    storeForm()
    switchMode('passage')
  })
  if (mode.val() == 'passage') {
    ensureLoaded('passage', 'passages', m)
  }
  else if (mode.val() == 'results') {
    ensureLoaded('sections', null, m)
    ensureLoaded('tuples', null, m)
    ensureLoaded('query', 'pages', m)
  }
}

const ensureLoaded = (kind, subkind, m) => {
  const table = $('#'+kind+'Table')
  if (!table.html()) {
    getTable(kind, subkind, m)
  }
  else {
    switchMode(m)
  }
}

const getTable = (kind, subkind, m) => {
  const url = '/'+kind;
  const dest = $('#'+kind+'Table');
  const destSub = $('#'+subkind)
  const go = document.querySelector("form");
  const formData = new FormData(go);
  const mode = $('#mode').val()
  $.ajax({
    type: 'POST',
    url: url,
    data: formData,
    processData: false,
    contentType: false,
    success: data => {
      const table = data.table || ''
      const messages = data.messages || ''
      dest.html(table + messages)
      if (subkind != null) {
        const subs = data[subkind]
        if (subs) {
          destSub.html(subs)
          subLinks(kind, subkind, m)
        }
      }
      const features = data.features;
      if (features != null) {
        $('#features').val(features)
      }
      switchPassage()
      details(kind)
      sections()
      tuples()
      nodes()
      switchMode(m)
      storeForm()
    },
  })
}

const activateTables = (kind, subkind, m) => {
  const button = $('#'+kind+'Go');
  button.click(e => {
    e.preventDefault()
    storeForm()
    const m = $('#mode').val()
    if (kind == 'passage' && m != 'passage') {
      m = 'passage'
    }
    else if (kind != 'passage' && m != 'results') {
      m = 'results'
    }
    getTable(kind, subkind, m)
  })
  detailc(kind, subkind)
  xpa = adjustOpened(kind)
  detailSet(kind, xpa)
}

const switchPassage = () => {
  $('.pq').click(e => {
    e.preventDefault()
    const seq = $(this).closest('details').attr('seq')
    $('#mode').val('passages')
    $('#sec0').val($(this).attr('sec0'))
    $('#sec1').val($(this).attr('sec1'))
    $('#sec2').val($(this).attr('sec2'))
    $('#pos').val(seq)
    storeForm()
    getTable('passage', 'passages', 'passage')
  })
}

const subLinks = (kind, subkind, m) => {
  if (subkind == 'pages') {
    $('.pnav').click(e => {
      e.preventDefault()
      $('#pos').val($(this).html())
      storeForm()
      getTable(kind, subkind, m)
    })
  }
  else if (subkind == 'passages') {
    opKey = kind+'Op'
    $('.s0nav').click(e => {
      e.preventDefault()
      $('#sec0').val($(this).html())
      $('#sec1').val('1')
      $('#sec2').val('')
      $('#'+opKey).val('')
      storeForm()
      getTable(kind, subkind, m)
    })
    $('.s1nav').click(e => {
      e.preventDefault()
      $('#sec1').val($(this).html())
      $('#sec2').val('')
      $('#'+opKey).val('')
      storeForm()
      getTable(kind, subkind, m)
    })
  }
}

const detailc = (kind, subkind) => {
  $('#'+kind+'Expac').click(e => {
    e.preventDefault()
    const expa = $('#'+kind+'Expa')
    const xpa = expa.val()
    const newXpa;
    if (xpa == "1") {newXpa = "-1"}
    else if (xpa == "-1") {newXpa = "1"}
    else if (xpa == "0") {newXpa = "-1"}
    else {newXpa = "-1"}
    detailSet(kind, newXpa)
    const m = $('#mode').val()
    const dPretty = $('#'+kind+'Table details.pretty')
    if (newXpa == "-1") {
      dPretty.each(() => {
        if ($(this).prop('open')) {
          $(this).prop('open', false)
        }
      })
    }
    else if (newXpa == "1") {
      dPretty.each(() => {
        if (!$(this).prop('open')) {
          $(this).prop('open', true)
        }
      })
    }
  })
}

const detailSet = (kind, xpa) => {
  const expac = $('#'+kind+'Expac')
  const expa = $('#'+kind+'Expa')
  const curVal = (xpa == null) ? expa.val() : xpa;
  if (curVal == "-1") {
    expa.val("-1")
    expac.prop('checked', false)
    expac.prop('indeterminate', false)
  }
  else if (curVal == "1") {
    expa.val("1")
    expac.prop('checked', true)
    expac.prop('indeterminate', false)
  }
  else if (curVal == "0") {
    expa.val("0")
    expac.prop('checked', false)
    expac.prop('indeterminate', true)
  }
  else {
    expa.val("-1")
    expac.prop('checked', false)
    expac.prop('indeterminate', false)
  }
  const op = $('#'+kind+'Op')
  if (curVal == "-1") {
    op.val('')
  }
  else if (curVal == "1") {
    const dPretty = $('#'+kind+'Table details.pretty')
    const allNumbers = dPretty.map(
      () => {return $(this).attr('seq')}
    ).get()
    op.val(allNumbers.join(','))
  }
  storeForm()
}

const adjustOpened = kind => {
  const openedElem = $('#'+kind+'Op')
  const dPretty = $('#'+kind+'Table details.pretty')
  const openedDetails = dPretty.filter(
    index => {return this.open}
  )
  const closedDetails = dPretty.filter(
    index => {return !this.open}
  )
  const openedNumbers = openedDetails.map(
    () => {return $(this).attr('seq')}
  ).get()
  const closedNumbers = closedDetails.map(
    () => {return $(this).attr('seq')}
  ).get() 
  
  currentOpenedStr = openedElem.val()
  currentOpened = (currentOpenedStr == '')?[]:currentOpenedStr.split(',');
  reduceOpened = currentOpened.filter(n => {
    return ((closedNumbers.indexOf(n) < 0) && (openedNumbers.indexOf(n) < 0))
  })
  newOpened = reduceOpened.concat(openedNumbers)
  openedElem.val(newOpened.join(','))
  const nOpen = openedDetails.length
  const nClosed = closedDetails.length
  const xpa = (nOpen == 0) ? "-1" : (nClosed == 0) ? "1" : "0";
  return xpa
}

const details = kind => {
  const details = $('#'+kind+'Table details.pretty')
  details.on('toggle', () => {
    xpa = adjustOpened(kind)
    detailSet(kind, xpa)
    if ($(this).prop('open') && !$(this).find('div.pretty').html()) {
      getOpen(kind, $(this))
    }
  })
}

const getOpen = (kind, elem) => {
  const seq = elem.attr('seq')
  const url = '/'+kind+'/'+seq;
  const dest = elem.find('div.pretty')
  const go = document.querySelector("form");
  const formData = new FormData(go);
  $.ajax({
    type: 'POST',
    url: url,
    data: formData,
    processData: false,
    contentType: false,
    success: data => {
      const table = data.table
      dest.html(table)
    },
  })
}

const reactive = () => {
  $('.r').change(e => {
    storeForm()
    const mode = $('#mode')
    const m = mode.val()
    getTable('sections', null, m)
    getTable('tuples', null, m)
    getTable('query', 'pages', m)
    getTable('passage', 'passages', m)
  })
  $('.sectionsR').change(e => {
    const mode = $('#mode')
    const m = mode.val()
    getTable('sections', null, m)
  })
  $('.tuplesR').change(e => {
    const mode = $('#mode')
    const m = mode.val()
    getTable('tuples', null, m)
  })
  $('.queryR').change(e => {
    const mode = $('#mode')
    const m = mode.val()
    getTable('query', 'pages', m)
  })
  $('.passageR').change(e => {
    const mode = $('#mode')
    const m = mode.val()
    getTable('passage', 'passages', m)
  })
}

const cradios = () => {
  $('.cradio').change(e => {
    $('#cond').prop('checked', true)
    storeForm()
  })
}

const sidebar = () => {
  const side = $('#side')
  const part = side.val()
  const headers = $('#sidebar div').filter(() => {
    const stat = $(this).attr('status')
    return (stat != 'help' && stat != 'about')
  })
  const bodies = $('#sidebarcont div').filter(() => {
    const stat = $(this).attr('status')
    return (stat != 'help' && stat != 'about')
  })
  if (part) {
    const header = $('#sidebar div[status="'+part+'"]')
    const body = $('#sidebarcont div[status="'+part+'"]')
    headers.removeClass('active')
    bodies.removeClass('active')
    header.addClass('active')
    body.addClass('active')
  }
  $('#sidebar a').click(e => {
    e.preventDefault()
    const header = $(this).closest('div')
    const part = header.attr('status')
    const side = $('#side')
    const body = $('#sidebarcont div[status="'+part+'"]')
    const isActive = header.hasClass('active')
    if (part != 'help') {
      headers.removeClass('active')
      bodies.removeClass('active')
    }
    if (isActive) {
      header.removeClass('active')
      body.removeClass('active')
      side.val('')
    }
    else {
      header.addClass('active')
      body.addClass('active')
      side.val(part)
    }
  })
}

const help = () => {
  const help = $('#help')
  const expandedStr = help.val()
  const helpOpened = (expandedStr == '')?[]:expandedStr.split(',');
  helpOpened.forEach(helpId => {
    helpDetails = $('#'+helpId)
    helpDetails.prop('open', true)
  })
  $('details.help').on('toggle', e => {
    const dHelp = $('details.help')
    const op = $('#help')
    const go = $('#go')
    const thisHelp = $(this)
    const thisId = thisHelp.attr('id')
    const thisOpen = thisHelp.prop('open')
    const expandedDetails = dHelp.filter(
      () => {return ($(this).prop('open') && $(this).attr('id') != thisId)}
    ).map(() => {return $(this).attr('id')}).get()
    if (thisOpen) {
      expandedDetails.push(thisId)
    }
    op.val(expandedDetails.join(','))
  })
}

const sections = () => {
  const secs = $('#sections') 
  $('.rwh').click(e => {
    e.preventDefault()
    e.stopPropagation()
    const sec = $(this).attr('sec')
    const orig = secs.val()
    secs.val(orig + '\n' + sec)
  })
}
const tuples = () => {
  const tups = $('#tuples') 
  $('.sq').click(e => {
    e.preventDefault()
    e.stopPropagation()
    const tup = $(this).attr('tup')
    const orig = tups.val()
    tups.val(orig + '\n' + tup)
  })
}
const nodes = () => {
  const tups = $('#tuples') 
  $('.nd').click(e => {
    e.preventDefault()
    e.stopPropagation()
    const nd = $(this).html()
    const orig = tups.val()
    tups.val(orig + '\n' + nd)
  })
}

const jobs = () => {
  const jobsc = $('#jobsc')
  const jobc = $('#job')
  const jobh = $('#jobh')
  const currentJob = jobc.val()
  const html = ''
  getJobs().forEach(job => {
    const selected = (job == currentJob) ? ' selected' : ''
    html += '<option value="'+job+'"'+selected+'>'+job+'</option>'
    jobsc.html(html)
  })
  jobsc.change(e => {
    jobc.val(e.target.value)
  })
}

const jobControls = () => {
  const jRename = $('#rename')
  const jDuplicate = $('#duplicate')
  const jobc = $('#job')
  const jobh = $('#jobh')
  jRename.click(e => {
    e.preventDefault()
    const oldName = jobh.val()
    const newName = jobc.val()
    if (oldName != newName) {
      jobh.val(newName)
      storeForm()
      deleteForm(oldName)
    }
  })
  jDuplicate.click(e => {
    e.preventDefault()
    const oldName = jobh.val()
    const newName = jobc.val()
    if (oldName == newName) {
      newName = oldName+'_x'
      jobh.val(newName)
      storeForm()
      deleteForm(oldName)
    }
  })
}

const deleteForm = jobNamew => {
  const formKey = 'tf/'+appName+'/'+jobName
  localStorage.removeItem(formKey)
}


const storeForm = () => {
  const go = document.querySelector("form");
  const jobc = $('#job')
  const formData = new FormData(go);
  const formObj = {};
  formData.forEach((value, key) =>{formObj[key] = value})
  const formStr = JSON.stringify(formObj)
  const appName = formData.get('appName')
  const jobName = formData.get('jobName')
  const formKey = 'tf/'+appName+'/'+jobName
  localStorage.setItem(formKey, formStr)
}


const readForm = () => {
  const go = document.querySelector("form");
  const formData = new FormData(go);
  const appName = formData.get('appName')
  const jobName = formData.get('jobName')
  const formKey = 'tf/'+appName+'/'+jobName
  const formStr = localStorage.getItem(formKey)
  const formObj = JSON.parse(formstr)
  formObj.forEach((value, key) => {
    formData.set(key, value)
  })
}


const getJobs = () => {
  const go = document.querySelector("form");
  const formData = new FormData(go);
  const appName = formData.get('appName')
  const tfPrefix = 'tf/'+appName+'/'
  const tfLength = tfPrefix.length
  return Object.keys(localStorage).
    filter(key => {return key.startsWith(tfPrefix)}).
    map(key => {return key.substring(tfLength)})
}


$(() =>{
  sidebar()
  jobs()
  modes()
  const m = $('#mode').val()
  activateTables('sections', null, m)
  activateTables('tuples', null, m)
  activateTables('query', 'pages', m)
  cradios()
  help()
  reactive()
  const rTarget = $('details.focus')
  if (rTarget != null && rTarget[0] != null) {
    rTarget[0].scrollIntoView(false)
  }
  storeForm()
})

