/* INDIVIDUAL COMPONENT: EUmap
 * This manages a clickable map of the EU countries
 */

function EUmap(comp) {
    this.comp = comp;
    this.facet = this.comp.page.getcomp(`facet`).delg;
    this.enabled = {contrib: 1};
    this.data = {};
    this._all_countries = { // the boolean tells whether the country is in DARIAH
        AT: [`eu3`, `Austria`, true],
        BE: [`eu5`, `Belgium`, true],
        HR: [`eu8`, `Croatia`, true],
        CY: [`eu9`, `Cyprus`, true],
        CZ: [`eu10`, `Czech Republic`, true],
        DK: [`eu11`, `Denmark`, true],
        EE: [`eu12`, `Estonia`, true],
        FR: [`eu13`, `France`, true],
        DE: [`eu16`, `Germany`, true],
        GR: [`eu17`, `Greece`, true],
        HU: [`eu18`, `Hungary`, true],
        IE: [`eu20`, `Ireland`, true],
        IT: [`eu22`, `Italy`, true],
        LV: [`eu24`, `Latvia`, true],
        LT: [`eu26`, `Lithuania`, true],
        LU: [`eu27`, `Luxembourg`, true],
        MT: [`eu29`, `Malta`, true],
        NL: [`eu33`, `Netherlands`, true],
        PL: [`eu35`, `Poland`, true],
        PT: [`eu36`, `Portugal`, true],
        RS: [`eu39`, `Serbia`, true],
        SK: [`eu40`, `Slovakia`, true],
        SI: [`eu41`, `Slovenia`, true],
        CH: [`eu44`, `Switzerland`, true],
        GB: [`eu47`, `United Kingdom`, true],
        AL: [`eu1`, `Albania`, false],
        AD: [`eu2`, `Andorra`, false],
        BY: [`eu4`, `Belarus`, false],
        BA: [`eu6`, `Bosnia and Herzegovina`, false],
        BG: [`eu7`, `Bulgaria`, false],
        FI: [`eu14`, `Finland`, false],
        GE: [`eu15`, `Georgia`, false],
        IS: [`eu19`, `Iceland`, false],
        SM: [`eu21`, `San Marino`, false],
        KS: [`eu23`, `Kosovo`, false],
        LI: [`eu25`, `Liechtenstein`, false],
        MK: [`eu28`, `Macedonia`, false],
        MD: [`eu30`, `Moldova`, false],
        MC: [`eu31`, `Monaco`, false],
        ME: [`eu32`, `Montenegro`, false],
        NO: [`eu34`, `Norway`, false],
        RO: [`eu37`, `Romania`, false],
        RU: [`eu38`, `Russian Federation`, false],
        ES: [`eu42`, `Spain`, false],
        SE: [`eu43`, `Sweden`, false],
        TR: [`eu45`, `Turkey`, false],
        UA: [`eu46`, `Ukraine`, false],
    };
    this.countries = [];
    this.country = {};
    for (var cd in this._all_countries) {
        var cprop = this._all_countries[cd];
        if (cprop[2]) {
            this.countries.push(cd);
            this.country[cd] = [cprop[0], cprop[1]];
        }
    }
    this.countries.sort();
};

EUmap.prototype = {
    _html: function(sc) {
        var h = ``;
        h += `<div id="map-europe_${sc}"><ul class="europe">`;
        for (var i in this.countries) {
            var cd = this.countries[i];
            var cprop = this.country[cd];
            h += `<li class="${cprop[0]}"><a href="#${cd}">${cd} - ${cprop[1]}</a></li>`;
        }
        h += `</ul></div><input id="eu_sel_${sc}"/></p>`;
        this.comp.container[sc].html(h);
    },
    _dressup: function(sc) {
        var that = this;
        $(`#map-europe_${sc}`).CSSMap({
            mapStyle: `default`,
            size: 320,
            cities: true,
            tooltips: `floating-top-center`,
            responsive: `auto`,
            fitHeight: false,
            mobileSupport: true,
            activateOnLoad: [`eu33`, `eu20`, `eu17`],
            visibleList: {
                enable: true,
                columns: 2,
            },
            multipleClick: {
                enable: true,
                hideSearchLink: false,
                separator: `,`,
            },
            formSupport: {
                enable: true,
                inputId: `#eu_sel_${sc}`,
                value: `slug`,
            },
        });
        $(`span`).click(function() {
            that._adapt_flt(sc, $(`#eu_sel_${sc}`).val().split(`,`));
            that.facet.adapt_flt(sc);
        });
    },
    _adapt_flt: function(sc, sel) {
        console.log(sel);
    },
    v: function(sc, i) {
        return true;
    },
    stats: function(sc) {
    },
    show: function(sc) {
        return this.comp.state.getstate(`list`) == sc && sc in this.enabled;
    },
    init: function(sc) {
        if (sc in this.enabled) {
            this.facet.add_facet(sc, this);
            this._html(sc);
            this._dressup(sc);
        }
    },
    process: function(sc) {
    },
    apply: function(sc) {
        if (this.show(sc)) {
            this.comp.container[sc].show();
        }
        else {
            this.comp.container[sc].hide();
        }
    }
};
