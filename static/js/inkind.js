// GLOBALS

var wb // will contain the one and only instance of the Page class

var Request = {
    parameter: function(name) {
        return this.parameters()[name]
    },
    parameters: function(uri) {
        var i, parameter, params, query, result;
        result = {};
        if (!uri) {
            uri = window.location.search;
        }
        if (uri.indexOf("?") === -1) {
            return {};
        }
        query = uri.slice(1);
        params = query.split("&");
        i = 0;
        while (i < params.length) {
            parameter = params[i].split("=");
            result[parameter[0]] = parameter[1];
            i++;
        }
        return result;
    }
}

// TOP LEVEL: PAGE

function Page() { // the one and only page object
    this.msg = new Msg('msg_page')
    this.vs = new ViewState(this.msg)
    History.Adapter.bind(window,'statechange', this.vs.goback)

    this.init = function() { // dress up the skeleton, initialize state variables
        this.material = new Material(this)
        this.sidebars = new Sidebars(this)
    }
    this.apply = function() { // apply the viewstate: hide and show material as prescribed by the viewstate
        this.material.apply()
        this.sidebars.apply()
    }
    this.init()
}

// MATERIAL

function Material(page) { // Object corresponding to everything that controls the material in the main part (not in the side bars)
    var that = this
    this.name = 'material'
    this.container = $('#'+this.name)
    this.page = page
    this.state = this.page.vs.data
    this.specs = this.page.vs.specs
    this.msg = new Msg('msg_'+this.name)
    this.loaded = {}
    for (var ls in this.specs.list.values) {
        this.loaded[ls] = false
    }
    this.apply = function() { // apply viewsettings to current material
        for (var ls in this.specs.list.values) {
            var tb = $('#table_'+ls)
            if (ls == this.state.list) {
                console.log('show '+ls)
                console.log(tb)
                tb.show()
                if (!this.loaded[ls]) {
                    this.fetch()
                }
            }
            else {
                tb.hide()
            }
        }
    }
    this.fetch = function() { // get the material by AJAX if needed, and process the material afterward
        this.msg.msg('fetching data ...')
        var fetch_url = url_tpl.replace(/_c_/, 'data').replace(/_f_/, this.state.list)+'.json'
        $.post(fetch_url, {}, function(json) {
            that.loaded[that.state.list] = true
            that.msg.clear()
            json.msgs.forEach(function(m) {
                that.msg.msg(m)
            })
            if (json.good) {
                that.data = json.data
                that.process()
            }
        }, 'json')
    }
    this.process = function() { // process new material obtained by an AJAX call
        this.genhtml()
    }
    this.genhtml = function() {
        var h = []
        h.push('<table id="table_'+this.state.list+'">')
        if (this.state.list == 'contribs') {
            for (var i in this.data) {
                r = this.data[i]
                rh = '<tr><td class="cc">'+r[2]+'<td><td class="cn">'+r[3]+'<td><td><a href="#" cid="'+r[0]+'">'+r[1]+'</a></td></tr>'
                h.push(rh)
            }
        }
        else if (this.state.list == 'countries') {
            for (var i in this.data) {
                r = this.data[i]
                rh = '<tr><td class="cc">'+r[0]+'<td><td class="cn">'+r[1]+'<td></tr>'
                h.push(rh)
            }
        }
        h.push('</table>')
        this.container.append(h.join(''))
    }
    this.msg.msg('Select something in the left sidebar')
}


// SIDEBARS

function Sidebars(page) { // TOP LEVEL: all four kinds of sidebars
    this.sidebar = {}
    for (var s in {l:1, r:1}) {
        this.sidebar[s] = (s == 'l')?(new Sidebar_l(page)):(new Sidebar_r(page))
    }
    this.apply = function() { // apply viewsettings to current material
        for (var s in {l:1, r:1}) {
            this.sidebar[s].apply()
        }
    }
}

// SPECIFIC sidebars, the side  is frozen into the object

function Sidebar_l(page) { // the left sidebar, meant for selection/navigation
    var that = this
    this.name = 'sidebar_l'
    this.container = $('#'+this.name)
    this.page = page
    this.state = this.page.vs.data
    this.specs = this.page.vs.specs
    this.msg = new Msg('msg_'+this.name)
    this.apply = function() { // apply viewsettings to current material
        var ls = this.state.list
        this.container.find('.radio').removeClass('ison')
        this.container.find('a[ls="'+ls+'"]').addClass('ison')
        this.page.material.apply()
    }
    this.init = function() {
        this.genhtml()
        this.dressup()
    }
    this.genhtml = function() {
        var h = []
        for (var ls in this.specs.list.values) {
            h.push('<a class="ctrl radio" href="#" ls="'+ls+'">'+ls+'</a> ')
        }
        this.container.html(h.join(''))
    }
    this.dressup = function() {
        this.container.find('.radio').each(function() {
            $(this).click(function(e) {e.preventDefault();
                that.state.list = $(this).attr('ls')
                that.apply() 
            })
        })
    }
    this.init()
}

function Sidebar_r(page) { // the right sidebar, meant for item views
    var that = this
    this.name = 'sidebar_r'
    this.container = $('#'+this.name)
    this.page = page
    this.state = this.page.vs.data
    this.msg = new Msg('msg_'+this.name)
    this.loaded = false
    this.apply = function() { // apply viewsettings to current material
        iid = this.state.id
        if (iid == 0) {
            this.container.hide()
        }
        else {
            this.container.show()
            if (!this.loaded) {
                this.fetch()
            }
        }
    }
    this.fetch = function() { // get the material by AJAX if needed, and process the material afterward
        this.msg.msg('fetching data ...')
        var fetch_url = url_tpl.replace(/_c_/, 'data').replace(/_f_/, 'item')+'.json'
        $.post(fetch_url, {}, function(json) {
            that.loaded = true
            that.msg.clear()
            json.msgs.forEach(function(m) {
                that.msg.msg(m)
            })
            if (json.good) {
                that.data = json.data
                that.process()
            }
        }, 'json')
    }
    this.process = function() { // process new material obtained by an AJAX call
        this.genhtml()
    }
    this.genhtml = function() {
    }
}

// MESSAGES

function Msg(destination, on_clear) {
    var that = this
    this.destination = $('#'+destination)
    this.trashc = $('#trash_'+destination)
    this.trashp = this.trashc.closest('p')
    this.clear = function() {
        this.destination.html('')
        if (on_clear != undefined) {
            on_clear()
        }
        this.trashp.hide()
        this.destination.hide()
    }
    this.hide = function() {
        this.destination.hide()
        this.trashp.hide()
    }
    this.show = function() {
        this.destination.show()
        if (this.destination.html() != '') {
            this.trashp.show()
        }
    }
    this.trashc.click(function(e) {e.preventDefault();
        that.clear()
    })
    this.msg = function(text, kind) {
        if (kind == undefined) {
            kind = 'info'
        }
        var mtext = this.destination.html()
        this.destination.html(mtext+'<p class="'+kind+'">'+text+'</p>')
        this.destination.show()
        this.trashp.show()
    }
    this.trashp.hide()
}

// VIEW STATE


function ViewState(page) {
    var that = this
    this.page = page
    this.msg = page.msg
    this.data = {}
    this.from_push = false
    this.specs = {
        list: {type: 'string', values: {contribs: 1, countries: 1}, def: 'contribs'},
        greet: {type: 'string', values: null, def: 'hallo'},
        id: {type: 'integer', values: {min: -1, max: 1000000}, def: 0},
        sort: {type: 'boolean', values: {v: true, x: false}, def: true}, 
    }
    this.validate = function(name, val) {
        var newval, message;
        if (name in this.specs) {
            var s = this.specs[name]
            if (s.type == 'string') {
                if (s.values) {
                    if (val in s.values) {
                        newval = val
                    }
                    else {
                        newval = s.def
                        this.msg.msg('illegal string value for '+name+': "'+val+'" is replaced by "'+s.def+'"', 'warning')
                    }
                }
                else {
                    newval = val
                }
            }
            else if (s.type == 'integer') {
                if (/^(\-|\+)?[0-9]+$/.test(val)) {
                    newval = Number(val)
                }
                else {
                    newval = s.def
                    this.msg.msg('not a number value for '+name+': "'+val+'" is replaced by "'+s.def+'"', 'warning')
                }
            }
            else if (s.type == 'boolean') {
                if (val in s.values) {
                    newval = s.values[val]
                }
                else {
                    newval = s.def
                    this.msg.msg('illegal boolean value for '+name+': "'+val+'" is replaced by "'+s.def+'"', 'warning')
                }
            }
        }
        else {
            newval = null
            this.msg.msg('unknown parameter: '+name+'='+val, 'warning')
        }
        return newval
    }

    this.getinitstate = function() {
        var rvars = Request.parameters()
        var nslvars = $.initNamespaceStorage('req')
        var lvars = nslvars.localStorage
        for (var name in rvars) {
            if (!(name in this.specs)) {
                this.msg.msg('unknown parameter: '+name+'='+val, 'Warning')
            }
        }
        for (var name in this.specs) {
            var val = null
            if (name in rvars) {
                var raw_val = rvars[name]
                val = this.validate(name, raw_val)
                lvars.set(name, val)
            }
            else if (lvars.isSet(name)) {
                val = lvars.get(name)
            }
            else {
                val = this.specs[name].def
                lvars.set(name, val)
            }
            this.data[name] = val
        }
    }
    this.goback = function() {
        var state = History.getState()
        if (!that.from_push && state && state.data) {
            that.apply(state)
        }
    }
    this.addHist = function(title, view_url) {
        that.from_push = true
        History.pushState(that.data, title, view_url)
        that.from_push = false
    }
    this.apply = function(state) {
        if (state.data != undefined) {
            that.data = state.data
        }
        this.page.apply()
    }
    this.getinitstate()
    this.addHist()
}

// GENERIC

var escapeHTML = (function () {
    'use strict';
    var chr = {
        '&': '&amp;', '<': '&lt;',  '>': '&gt;'
    };
    return function (text) {
        return text.replace(/[&<>]/g, function (a) { return chr[a]; });
    };
}());

// START PROCESSING

$(function() {
    wb = new Page();
    wb.sidebars.sidebar['l'].apply()
})

