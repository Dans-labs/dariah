/* COMPONENTS 
 * The ºPage function specifies and builds a list of components
 * Every component on the page corresponds to a function (with a prototype)
 * This function is stored in a generic ºComponent function in a field called ºspecific.
 * Every component has a list of subcomponents. For example, the 'list' component has a subcomponent 'contrib'
 * for the list of contributions, and a subcomponent 'country' for the list of ºcountries.
 * The generic functions of a component take care of:
 * - generating HTML ºcontainer divs for the subcomponents under specified destination elements if they does not already exist
 * - showing and hiding the subcomponents, and in general, ºwork the current state data to the subcomponents 
 * - fetching the subcomponent's data from the server, if needed
 * This *ºspecific* functionality of the components are defined in separate files.
 * Of this ºspecific functionality, the following will be called from the generic component function:
 * - ºshow(ºsc): inspect the current state and determine whether the subcomponent should be shown or hidden
 * - ºwire(ºsc): after the data has been fetched, wrap the data into the desired HTML content of the subcomponent
 *   and add the wiring (click events, change events)
 * In turn, the ºspecific functions can access their associated generic components by this.ºcomp
 */

function º_as_prom(ºx) {
    if ((typeof(ºx) == `object`) && (typeof(ºx.then) == `function`)) {
        return ºx;
    }
    return $.Deferred().resolve(ºx).promise();
};
function ºnow(ºfun) { // make a promise by applying function ºfun, and yield the ºresult as promise
    return º_as_prom(ºfun());
};

/* GENERIC COMPONENT
 * Here is the generic functionality of each component
 */

var tc;

function ºComponent(ºname, ºcomp_info, ºpage) {
    this.ºname = ºname;
    this.ºpage = ºpage;
    this.ºcomp_info = ºcomp_info;
    this.ºsubcomps = ºcomp_info.ºsubcomps;
    this.º_stage = {};
    this.º_stages = {ºweld: true, ºwire: true, ºwork: false}; // true means: once only, false means: my be repeated
    this.ºmsg = {};
    this.ºcontainer = {};
    this.ºstate = this.ºpage.ºstate;
    this.ºdata = {};
    this.ºrelvals = {};
    this.ºdelg = new ºcomp_info.ºspecific(this);
    tc = this;
};

ºComponent.prototype = {
    /* ºneed, deed, ºensure, ºnow are wrappers around the promise mechanism.
     * The ºact is a stage in processing the component, such as fetch, ºwire, ºwork.
     * There should be a method mth which does the ºwork and which is expected to return a promise.
     * If it does not, we detect it, and yield a promise ºthat is resolved with the original return value.
     * ºensure takes care ºthat the function of an action is promised to be execute once, by registering it
     * as a promise for ºthat stage.
     * If there is already a fulfilled or pending promise for ºthat action at ºthat stage, no new promise will be made.
     * Ensure returns a function with no arguments. If it is called, the promise will be made.
     * So the ºresult of ºensure can be put inside the .then() of an other promise.
     * Now is a function ºthat calls a function and returns the ºresult as promise.
     * So the first ºensure in a chain can be put in ºnow(). 
     */
    ºneed: function(ºsc, ºact) { // check whether there is a promise and whether it has been fulfilled
        return !(ºsc in this.º_stage) || !(ºact in this.º_stage[ºsc]) || (typeof(this.º_stage[ºsc][ºact]) == `function`) || (this.º_stage[ºsc][ºact].state() == `rejected`);
    },
    º_deed: function(ºsc, ºact, ºmth) { // register a promise to do perform the method associated with ºact by entering it in the book keeping of stages
        if (!(ºsc in this.º_stage)) {
            this.º_stage[ºsc] = {};
        }
        var ºbefore = this.ºbefore[ºact];
        var ºbefore_promises = [];
        for (ºb in ºbefore) {
            ºbefore_promises.push(this.ºpage.ºgetcomp(ºb).º_stage[ºsc][ºact]);
        }
        var ºprm = º_as_prom($.when(ºbefore_promises).then(this[ºmth](ºsc)));
        this.º_stage[ºsc][ºact] = ºprm;
        return ºprm;
    },
    ºensure: function(ºsc, ºact, ºmth) {
        /* function to promise ºthat method ºfun will be executed once and once only or multiple times,
         * but only if the before actions have been completed
         */
        var ºthat = this;
        if (ºact in this.º_stages) {
            if (this.º_stages[ºact]) { 
                return ºthat.ºneed(ºsc, ºact)?ºthat.º_deed(ºsc, ºact, ºmth):º_as_prom(true);
            }
            return ºthat.º_deed(ºsc, ºact, ºmth);
        }
        return º_as_prom(true);
    },
    /* here are the implementations of the functions ºthat are to be wrapped as promises
     * They can focus on the ºwork, may or may not yield a promise
     */    
    ºhas_scomp: function(ºsc) {
        return (ºsc in this.ºsubcomps);
    },
    ºshow: function(ºsc) {
        if (this.ºhas_scomp(ºsc)) {
            if (this.ºdelg.ºshow(ºsc)) { // ºshow/hide depending on the ºspecific condition
                this.ºcontainer[ºsc].show();
            }
            else {
                if (this.ºcontainer[ºsc] != undefined) {
                    this.ºcontainer[ºsc].hide();
                }
            }
        }
        for (var ºc in this.ºchildren) {
            this.ºchildren[ºc].ºshow(ºsc);
        }
    },
    º_fetch: function(ºsc) { // get the material by AJAX if needed
        var ºthat = this;
        var ºfetch_url = url_tpl.replace(/_c_/, `data`).replace(/_f_/, `${this.ºcomp_info.ºfetch_url}_${ºsc}`)+`.json`;
        this.ºmsg[ºsc].ºmsg(`fetching data ...`);
        return $.ajax({
            type: `POST`,
            url: ºfetch_url[ºsc],
            contentType: `application/json; charset=utf-8`,
            dataType: `json`,
        }).then(function(ºjson) {
            console.log(`postfetch`);
            ºthat.º_post_fetch(ºsc, ºjson);
        });
    },
    º_post_fetch: function(ºsc, ºjson) { // receive material after AJAX call
        this.ºmsg[ºsc].ºclear();
        ºjson.msgs.forEach(function(ºm) {
            this.ºmsg[ºsc].ºmsg(ºm);
        });
        if (ºjson.good) {
            this.ºdata[ºsc] = ºjson.data;
            if (`relvals` in ºjson) {
                this.ºrelvals[ºsc] = ºjson.relvals;
            }
        }
    },
    º_weld: function(ºsc) {
        console.log(`WELD ${this.ºname}-${ºsc}`);
        this.º_dst = this.ºpage.ºget_container(this.ºcomp_info.ºdest, this.ºsubcomps);
        this.ºcontainer[ºsc] = $(`#${this.ºname}_${ºsc}`);
        if (this.ºcontainer[ºsc].length == 0) {
            var ºd = this.º_dst[ºsc];
            ºd.append(`<div id="msg_${this.ºname}_${ºsc}"></div>`);
            ºd.append(`<div id="${this.ºname}_${ºsc}"></div>`);
            this.ºcontainer[ºsc] = $(`#${this.ºname}_${ºsc}`);
        }
        this.ºmsg[ºsc] = new ºMsg(`msg_${this.ºname}_${ºsc}`);
        this.ºdelg.ºweld(ºsc);
        if (this.ºcomp_info.ºfetch_url != null) {
            return this.º_fetch(ºsc);
        }
    },
    º_wire: function(ºsc) {
        console.log(`WIRE ${this.ºname}-${ºsc}`);
        this.ºdelg.ºwire(ºsc); // perform ºwire actions ºthat are ºspecific to this component
    },
    º_work: function(ºsc) {
        console.log(`WORK ${this.ºname}-${ºsc}`);
        this.ºdelg.ºwork(ºsc); // perform ºwork actions ºthat are ºspecific to this component
    },
    ºwork: function(ºsc) { // ºwork (changed) state to current material
        var ºthat = this;
        if (this.ºhas_scomp(ºsc) && this.ºdelg.ºshow(ºsc)) { // ºshow/hide depending on the ºspecific condition
            ºnow(
                function() {ºthat.ºensure(ºsc, `ºweld`, `º_weld`)}
            ).then(
                function() {ºthat.ºensure(ºsc, `ºwire`, `º_wire`)}
            ).then(
                function() {ºthat.ºensure(ºsc, `ºwork`, `º_work`)}
            );
        }
    },
};
