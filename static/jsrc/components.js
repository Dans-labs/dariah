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

/* GENERIC COMPONENT
 * Here is the generic functionality of each component
 */

function ºComponent(ºname, ºcomp_info, ºpage) {
    this.ºname = ºname;
    this.ºpage = ºpage;
    this.ºcomp_info = ºcomp_info;
    this.ºsubcomps = ºcomp_info.ºsubcomps;
    this.º_stage = {};
    for (var ºsc in this.ºsubcomps) {
        this.º_stage[ºsc] = {};
        for (var ºst in this.ºpage.ºstages) {
            this.º_stage[ºsc][ºst] = true;
        }
    }
    this.ºmsg = {};
    this.ºcontainer = {};
    this.ºstate = this.ºpage.ºstate;
    this.ºdata = {};
    this.ºrelvals = {};
    this.ºdelg = new ºcomp_info.ºspecific(this);
};

ºComponent.prototype = {
    /* ºneed, ºdeed, ºensure are wrappers around the promise mechanism.
     * The ºstage is a stage in processing the component, such as fetch, ºwire, ºwork.
     * There should be a method mth which does the ºwork and which is expected to return a promise.
     * If it does not, we detect it, and yield a promise that is resolved with the original return value.
     * ºensure takes care that the function of an action is promised to be execute once, by registering it
     * as a promise for that stage.
     * If there is already a fulfilled or pending promise for that action at that stage, no new promise will be made.
     * Ensure returns a function with no arguments. If it is called, the promise will be made.
     * So the ºresult of ºensure can be put inside the .then() of an other promise.
     * Now is a function that calls a function and returns the ºresult as promise.
     */
    ºneed: function(ºsc, ºstage) { // check whether there is a promise and whether it has been fulfilled
        return !this.º_stage[ºsc][ºstage].state || (this.º_stage[ºsc][ºstage].state() == `rejected`);
    },
    º_deed: function(ºsc, ºstage, ºmth) { // register a promise to perform the method associated with ºstage by entering it in the book keeping of stages
            /* we want to pass a method call to a .then() later on.
             * If we pass it straight, like this.method, .then() will call this function and supplies its own promise object as the this.
             * That is not our purpose: we want to call the method with the current component object as the this.
             * Hence we use bind() in order to supply the right this.
             * Whoever calls this new function ºmethod_call, will perform a true method call of method ºmth on object that.
             * This is crucial, otherwise all the careful time logic gets mangled, because the promises are stored in the component object.
             */
        var ºmethod_call = this[ºmth].bind(this, ºsc);
        var ºtiming = this.ºpage.ºget_before(this.ºname, ºstage);
        var ºpromises = [];
        ºtiming.forEach(function(ºtask) {
            var ºprev_name = ºtask[0];
            var ºprev_stage = ºtask[1];
            ºpromises.push(this.ºpage.ºget_component(ºprev_name).º_stage[ºsc][ºprev_stage]);
        }, this);
        this.º_stage[ºsc][ºstage] = $.when.apply($, ºpromises).then(ºmethod_call);
    },
    ºensure: function(ºsc, ºstage, ºmth) {
        /* function to promise that method ºfun will be executed once and once only or multiple times,
         * but only if the before actions have been completed
         */
        if (ºstage in this.ºpage.ºstages) {
            if (!this.ºpage.ºstages[ºstage] || this.ºneed(ºsc, ºstage)) {
                this.º_deed(ºsc, ºstage, ºmth);
            }
        }
    },
    /* here are the implementations of the functions that are to be wrapped as promises
     * They can focus on the ºwork, may or may not yield a promise
     */    
    ºhas_scomp: function(ºsc) {
        return (ºsc in this.ºsubcomps);
    },
    º_visibility: function(ºsc, ºon) {
        if (this.ºhas_scomp(ºsc)) {
            if (ºsc in this.ºcontainer) {
                if (ºon) {
                    this.ºcontainer[ºsc].show();
                }
                else {
                    this.ºcontainer[ºsc].hide();
                }
            }
        }
    },
    º_fetch: function(ºsc) { // get the material by AJAX if needed
        var ºfetch_url = url_tpl.replace(/_c_/, `data`).replace(/_f_/, `${this.ºcomp_info.ºfetch_url}_${ºsc}`)+`.json`;
        this.ºmsg[ºsc].ºmsg(`fetching data ...`);
        var ºpost_fetch = this.º_post_fetch.bind(this, ºsc);
        return $.ajax({
            type: `POST`,
            url: ºfetch_url,
            contentType: `application/json; charset=utf-8`,
            dataType: `json`,
        }).then(function(ºjson) {
            ºpost_fetch(ºjson);
        });
    },
    º_post_fetch: function(ºsc, ºjson) { // receive material after AJAX call
        this.ºmsg[ºsc].ºclear();
        ºjson.msgs.forEach(function(ºm) {
            this.ºmsg[ºsc].ºmsg(ºm);
        }, this);
        if (ºjson.good) {
            this.ºdata[ºsc] = ºjson.data;
            if (`relvals` in ºjson) {
                this.ºrelvals[ºsc] = ºjson.relvals;
            }
        }
        this.ºdelg.ºweld(ºsc);
        console.log(`_WELD END ${this.ºname}-${ºsc}`);
    },
    º_weld: function(ºsc) {
        console.log(`_WELD BEGIN ${this.ºname}-${ºsc}`);
        this.º_dst = this.ºpage.ºget_container(this.ºcomp_info.ºdest, this.ºsubcomps);
        this.ºcontainer[ºsc] = $(`#${this.ºname}_${ºsc}`);
        if (this.ºcontainer[ºsc].length == 0) {
            var ºd = this.º_dst[ºsc];
            ºd.append(`<div id="msg_${this.ºname}_${ºsc}"></div>`);
            ºd.append(`<div id="${this.ºname}_${ºsc}"></div>`);
            this.ºcontainer[ºsc] = $(`#${this.ºname}_${ºsc}`);
        }
        this.ºmsg[ºsc] = new ºMsg(`msg_${this.ºname}_${ºsc}`);
        if (this.ºcomp_info.ºfetch_url != null) {
            return this.º_fetch(ºsc);
        }
        else {
            this.ºdelg.ºweld(ºsc);
            console.log(`_WELD END ${this.ºname}-${ºsc}`);
        }
    },
    º_wire: function(ºsc) {
        console.log(`_WIRE ${this.ºname}-${ºsc}`);
        this.ºdelg.ºwire(ºsc); // perform ºwire actions that are ºspecific to this component
    },
    º_work: function(ºsc) {
        console.log(`_WORK ${this.ºname}-${ºsc}`);
        this.º_visibility(ºsc, true);
        this.ºdelg.ºwork(ºsc); // perform ºwork actions that are ºspecific to this component
    },
    ºwork: function(ºsc) { // ºwork (changed) state to current material
        if (this.ºhas_scomp(ºsc) && this.ºdelg.ºshow(ºsc)) { // ºshow/hide depending on the ºspecific condition
            this.ºensure(ºsc, `ºweld`, `º_weld`);
            this.ºensure(ºsc, `ºwire`, `º_wire`);
            this.ºensure(ºsc, `ºwork`, `º_work`);
        }
        else {
            this.º_visibility(ºsc, false);
        }
    },
    ºweld: function(ºsc) {
        if (this.ºhas_scomp(ºsc) && this.ºdelg.ºshow(ºsc)) {
            this.ºensure(ºsc, `ºweld`, `º_weld`);
        }
    },
    ºwire: function(ºsc) {
        if (this.ºhas_scomp(ºsc) && this.ºdelg.ºshow(ºsc)) {
            this.ºensure(ºsc, `ºwire`, `º_wire`);
        }
    },
    ºwork: function(ºsc) { // ºwork (changed) state to current material
        if (this.ºhas_scomp(ºsc) && this.ºdelg.ºshow(ºsc)) { // ºshow/hide depending on the ºspecific condition
            this.ºensure(ºsc, `ºwork`, `º_work`);
        }
        else {
            this.º_visibility(ºsc, false);
        }
    },
};
