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
 * - ºshow(ºvar): inspect the current state and determine whether the subcomponent should be shown or hidden
 * - ºwire(ºvar): after the data has been fetched, wrap the data into the desired HTML content of the subcomponent
 *   and add the wiring (click events, change events)
 * In turn, the ºspecific functions can access their associated generic components by this.ºcomponent
 */

/* GENERIC COMPONENT
 * Here is the generic functionality of each component
 */

function ºComponent(ºname, ºspecs, ºpage) {
    this.ºname = ºname;
    this.ºpage = ºpage;
    this.ºspecs = ºspecs;
    this.ºvariants = ºspecs.ºvariants;
    this.º_stage = {};
    for (var ºvar in this.ºvariants) {
        this.º_stage[ºvar] = {};
        for (var ºst in this.ºpage.ºstages) {
            this.º_stage[ºvar][ºst] = true;
        }
    }
    this.ºmsg = {};
    this.ºcontainer = {};
    this.ºstate = this.ºpage.ºstate;
    this.ºdata = {};
    this.ºrelated_values = {};
    this.ºimplementation = new ºspecs.ºspecific(this);
};

ºComponent.prototype = {
    /* ºneed, ºdeed, ºensure are wrappers around the promise mechanism.
     * The ºstage is a stage in processing the component, such as fetch, ºwire, ºwork.
     * There should be a method method which does the ºwork and which is expected to return a promise.
     * If it does not, we detect it, and yield a promise that is resolved with the original return value.
     * ºensure takes care that the function of an action is promised to be execute once, by registering it
     * as a promise for that stage.
     * If there is already a fulfilled or pending promise for that action at that stage, no new promise will be made.
     * Ensure returns a function with no arguments. If it is called, the promise will be made.
     * So the ºresult of ºensure can be put inside the .then() of an other promise.
     * Now is a function that calls a function and returns the ºresult as promise.
     */
    ºneed: function(ºvar, ºstage) { // check whether there is a promise and whether it has been fulfilled
        return !this.º_stage[ºvar][ºstage].state || (this.º_stage[ºvar][ºstage].state() == `rejected`);
    },
    º_deed: function(ºvar, ºstage, ºmethod) { // register a promise to perform the method associated with ºstage by entering it in the book keeping of stages
            /* we want to pass a method call to a .then() later on.
             * If we pass it straight, like this.method, .then() will call this function and supplies its own promise object as the this.
             * That is not our purpose: we want to call the method with the current component object as the this.
             * Hence we use bind() in order to supply the right this.
             * Whoever calls this new function ºmethodCall, will perform a true method call of method ºmethod on object that.
             * This is crucial, otherwise all the careful time logic gets mangled, because the promises are stored in the component object.
             */
        var ºmethodCall = this[ºmethod].bind(this, ºvar);
        var ºtiming = this.ºpage.ºgetBefore(this.ºname, ºstage);
        var ºpromises = [];
        ºtiming.forEach(function(ºtask) {
            var ºprev_name = ºtask[0];
            var ºprev_stage = ºtask[1];
            var ºprev_component = this.ºpage.ºgetComponent(ºprev_name);
            if (ºprev_component.ºhasVariant(ºvar)) {
                ºpromises.push(ºprev_component.º_stage[ºvar][ºprev_stage]);
            }
        }, this);
        this.º_stage[ºvar][ºstage] = $.when.apply($, ºpromises).then(ºmethodCall);
    },
    ºensure: function(ºvar, ºstage, ºmethod) {
        /* function to promise that method ºfun will be executed once and once only or multiple times,
         * but only if the before actions have been completed
         */
        if (ºstage in this.ºpage.ºstages) {
            if (!this.ºpage.ºstages[ºstage] || this.ºneed(ºvar, ºstage)) {
                this.º_deed(ºvar, ºstage, ºmethod);
            }
        }
    },
    /* here are the implementations of the functions that are to be wrapped as promises
     * They can focus on the ºwork, may or may not yield a promise
     */    
    ºhasVariant: function(ºvar) {
        return (ºvar in this.ºvariants);
    },
    º_visibility: function(ºvar, ºon) {
        if (this.ºhasVariant(ºvar)) {
            if (ºvar in this.ºcontainer) {
                if (ºon) {
                    this.ºcontainer[ºvar].show();
                }
                else {
                    this.ºcontainer[ºvar].hide();
                }
            }
        }
    },
    º_fetch: function(ºvar) { // get the material by AJAX if needed
        var ºfetch_url = url_tpl.replace(/_c_/, `data`).replace(/_f_/, `${this.ºspecs.ºfetch_url}_${ºvar}`)+`.json`;
        this.ºmsg[ºvar].ºmsg(`fetching data ...`);
        var ºpostFetch = this.º_postFetch.bind(this, ºvar);
        return $.ajax({
            type: `POST`,
            url: ºfetch_url,
            contentType: `application/json; charset=utf-8`,
            dataType: `json`,
        }).then(function(ºjson) {
            ºpostFetch(ºjson);
        });
    },
    º_postFetch: function(ºvar, ºjson) { // receive material after AJAX call
        this.ºmsg[ºvar].ºclear();
        ºjson.msgs.forEach(function(ºm) {
            this.ºmsg[ºvar].ºmsg(ºm);
        }, this);
        if (ºjson.good) {
            this.ºdata[ºvar] = ºjson.data;
            if (`relvals` in ºjson) {
                this.ºrelated_values[ºvar] = ºjson.relvals;
            }
        }
        this.ºimplementation.ºweld(ºvar);
        console.log(`_WELD END ${this.ºname}-${ºvar}`);
    },
    º_weld: function(ºvar) {
        console.log(`_WELD BEGIN ${this.ºname}-${ºvar}`);
        this.º_dst = this.ºpage.ºgetContainer(this.ºspecs.ºdest, this.ºvariants);
        this.ºcontainer[ºvar] = $(`#${this.ºname}_${ºvar}`);
        if (this.ºcontainer[ºvar].length == 0) {
            var ºdestination = this.º_dst[ºvar];
            ºdestination.append(`<div id="msg_${this.ºname}_${ºvar}"></div>`);
            ºdestination.append(`<div id="${this.ºname}_${ºvar}"></div>`);
            this.ºcontainer[ºvar] = $(`#${this.ºname}_${ºvar}`);
        }
        this.ºmsg[ºvar] = new ºMsg(`msg_${this.ºname}_${ºvar}`);
        if (this.ºspecs.ºfetch_url != null) {
            return this.º_fetch(ºvar);
        }
        else {
            this.ºimplementation.ºweld(ºvar);
            console.log(`_WELD END ${this.ºname}-${ºvar}`);
        }
    },
    º_wire: function(ºvar) {
        console.log(`_WIRE ${this.ºname}-${ºvar}`);
        this.ºimplementation.ºwire(ºvar); // perform ºwire actions that are ºspecific to this component
    },
    º_work: function(ºvar) {
        console.log(`_WORK ${this.ºname}-${ºvar}`);
        this.º_visibility(ºvar, true);
        this.ºimplementation.ºwork(ºvar); // perform ºwork actions that are ºspecific to this component
    },
    ºwork: function(ºvar) { // ºwork (changed) state to current material
        if (this.ºhasVariant(ºvar) && this.ºimplementation.ºshow(ºvar)) { // ºshow/hide depending on the ºspecific condition
            this.ºensure(ºvar, `ºweld`, `º_weld`);
            this.ºensure(ºvar, `ºwire`, `º_wire`);
            this.ºensure(ºvar, `ºwork`, `º_work`);
        }
        else {
            this.º_visibility(ºvar, false);
        }
    },
    ºweld: function(ºvar) {
        if (this.ºhasVariant(ºvar) && this.ºimplementation.ºshow(ºvar)) {
            this.ºensure(ºvar, `ºweld`, `º_weld`);
        }
    },
    ºwire: function(ºvar) {
        if (this.ºhasVariant(ºvar) && this.ºimplementation.ºshow(ºvar)) {
            this.ºensure(ºvar, `ºwire`, `º_wire`);
        }
    },
    ºwork: function(ºvar) { // ºwork (changed) state to current material
        if (this.ºhasVariant(ºvar) && this.ºimplementation.ºshow(ºvar)) { // ºshow/hide depending on the ºspecific condition
            this.ºensure(ºvar, `ºwork`, `º_work`);
        }
        else {
            this.º_visibility(ºvar, false);
        }
    },
};
