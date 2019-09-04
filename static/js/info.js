function selectControl(cid) {
  var value = contribSelection[cid]
  var ctl = $('span[contrib="'+cid+'"].selectctl') 
  ihtml = ''
  ihtml += (value == false)
    ? '<span class="fa fa-times s-focus"/>'
    : '<a href="#" select="-1" class="fa fa-times"/>'
  ihtml += (value == null)
    ? '<span class="fa fa-minus s-focus"/>'
    : '<a href="#" select="0" class="fa fa-minus"/>'
  ihtml += (value == true)
    ? '<span class="fa fa-check s-focus"/>'
    : '<a href="#" select="1" class="fa fa-check"/>'
  ctl.html(ihtml)
  activateSelectControls(ctl, cid)
}

function activateSelectControls(ctl, cid) {
  var selects = ctl.find('a[select]')
  selects.click(function(e) {
    e.preventDefault()
    var value = $(this).attr('select')
    var dbValue = (value == "0")
      ? null
      : (value == "1")
        ? true
        : false
    var jqxhr = $.ajax({
      url: '/api/db/selectc',
      type: 'POST',
      data: JSON.stringify({contrib: cid, select: dbValue}),
      success: function() {},
      dataType: 'json',
      contentType: 'application/json',
      processData: false,
    })
    jqxhr.done(function(data) {
      var good = data.good
      if (good) {
        contribSelection[cid] = dbValue
        selectControl(cid)
      }
      else {
        alert(data.msg)
        console.error('fail', data)
      }
    })
    jqxhr.fail(function(data) {
      alert(data.msg)
      console.error('fail', data)
    })
  })
}

function initSelectControls() {
  var ctls = $('span.selectctl') 
  ctls.each(function() {
    var cid = $(this).attr('contrib')
    selectControl(cid)
  })
}

var xTouched = {}

function openGid(gid) {
  $('tr[gid="'+gid+'"].dd').show()
}
function closeGid(gid) {
  $('tr[gid="'+gid+'"].dd').hide()
}
function closeGidH(gid) {
  closeGid(gid)
  var children = groupRel[gid]
  if (children != null) {
    children.forEach(function(child) {
      closeGidH(child)
    })
  }
}
function openGidH(gid) {
  openGid(gid)
  var children = groupRel[gid]
  if (children != null) {
    children.forEach(function(child) {
      touched = xTouched[child]
      if (touched) {
        openGidH(child)
      }
    })
  }
}

function initExpandControls() {
  $('.dc.fa-chevron-circle-down').click(function(e) {
    e.preventDefault()
    var gid = $(this).attr('gid')
    var other = $('a[gid="'+gid+'"].dc.fa-chevron-circle-up')
    $(this).hide()
    xTouched[gid] = true
    openGidH(gid)
    other.show()
  })
  $('.dc.fa-chevron-circle-up').click(function(e) {
    e.preventDefault()
    var gid = $(this).attr('gid')
    var other = $('a[gid="'+gid+'"].dc.fa-chevron-circle-down')
    $(this).hide()
    xTouched[gid] = false
    closeGidH(gid)
    other.show()
  })
  $('.dca.fa-angle-double-down').click(function(e) {
    e.preventDefault()
    var gn = $(this).attr('gn')
    $('.c-'+gn+' a.dc.fa-chevron-circle-down').each(function() {
      var isOpen = $(this).css('display') == 'none'
      var gid = $(this).attr('gid')
      if (!isOpen) {
        var other = $('a[gid="'+gid+'"].dc.fa-chevron-circle-up')
        $(this).hide()
        xTouched[gid] = true
        openGidH(gid)
        other.show()
      }
    })
  })
  $('.dca.fa-angle-double-up').click(function(e) {
    e.preventDefault()
    var gn = $(this).attr('gn')
    $('.c-'+gn+' a.dc.fa-chevron-circle-up').each(function() {
      var isClosed = $(this).css('display') == 'none'
      var gid = $(this).attr('gid')
      if (!isClosed) {
        var other = $('a[gid="'+gid+'"].dc.fa-chevron-circle-down')
        $(this).hide()
        xTouched[gid] = false
        closeGidH(gid)
        other.show()
      }
    })
  })
}

$(function(){
  initSelectControls()
  initExpandControls()
})
