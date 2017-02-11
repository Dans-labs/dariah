import { lsHas, lsGet, lsSet } from '../helpers/localstorage.js'

/**
 * ## Filters and Facets
 *
 * The big contribution list can be filtered by any number of filters.
 * This module contains helpers to set up the filtering and compute the results.
 *
 * The list of available filters is in {@link Filters}.
 *
 * @module filtering
 */

/**
 * ## Compiling Filters
 *
 * The compile stage inspects all data rows and sets up facets according to 
 * the values that actually occur in the data.
 *
 * The goal is to collect all the information that is needed to display the 
 * filters and give them an initial state.
 *
 * The filter state is represented as follows:
 *
 * * a search string for each fullText filter (initially empty)
 * * for every faceted field:
 *   * a mapping from each of its valueIds to `true`
 *     (representing that every facet of that field is checked)
 *   * to this mapping we add a `-none-` value, with the intention that it matches
 *     those rows that do not have values in this field.
 *
 * @param {Contrib[]} contribs - The list of contribution records as it comes form mongo db
 * @param {Object} fields - Contains the fields that mongo db has supplied for each row. This is 
 * dependent on the permissions of the current user.
 * @param {Array} filterList - The list of available filters, statically imported from the 
 * @returns {Map} `fieldValues` - a mapping of the valueId to the valueRepresentation of all values that have
 * been encountered in the `field` of the `contribs` rows
 * @returns {Map} `filterInit` - a mapping that maps the filterId of each available filter to initial filterSettings
 * for that filter, i.e. the situation that the user has not yet started using the filters
 * {@link Filters} component.
 */

const initf = (tag, key, defaultVal) => {
  const lskey = `flt_${tag}.${key}`;
  return lsHas(lskey)?lsGet(lskey):defaultVal;
}
export const setf = (tag, key, val) => {
  const lskey = `flt_${tag}.${key}`;
  lsSet(lskey, val);
}

export function compileFiltering(contribs, fields, filterList) {
  const presentFilterList = filterList.filter(x => fields[x.field])
  const filterFields = presentFilterList.filter(x => x.name !== 'FullText').map(x => x.field);
  const fieldValues = new Map(filterFields.map(f => [f, new Map([['', '-none-']])]));
  for (const row of contribs) {
    for (const field of filterFields) {
      const fFieldValues = fieldValues.get(field);
      const metaraw = row[field];
      if (metaraw != null && metaraw.length !== 0) {
        for (const {_id: valueId, value: valueRep} of metaraw) {
          if (!fFieldValues.has(valueId)) {fFieldValues.set(valueId, valueRep)}
        }
      }
    }
  }
  const filterInit = new Map(presentFilterList.map((filterSpec, filterId) => [
    filterId,
    /*
    filterSpec.name === 'FullText' ? '' : new Map(
      [...fieldValues.get(filterSpec.field).keys()].map(valueId => [valueId, true]
    ))
    */
    filterSpec.name === 'FullText' ? initf(filterId, '', '') : new Map(
      [...fieldValues.get(filterSpec.field).keys()].map(valueId => [valueId, initf(filterId, valueId, true)]
    ))
  ]));

  return {
    fieldValues,
    filterInit,
  };
}

/**
 * ## Computing Filters
 *
 * @param {Contrib[]} contribs - as in {@link compileFiltering} 
 * @param {Object} fields - Contains the fields that mongo db has supplied for each row. This is 
 * dependent on the permissions of the current user.
 * @param {Array} filterList - as in {@link compileFiltering}
 * @param {Map} fieldValues - as in {@link compileFiltering} 
 * @param {Map} filterSettings - a {@link external:Map|Map} of filters to their current settings
 * @returns {Map} `filteredData` - the sublist of contribs, the rows that pass all filters
 * @returns {Map} `filteredAmountOthers` - a mapping that indicates for each filter how many rows pass all other filters
 * @returns {Map} `amounts` - a mapping like `filteredAmountOthers`, but more specific: it splits the amount per faceted value
 *
 * With filteredData.length, filteredAmountOthers, amounts we have exactly the right numbers to 
 * render the "(nn of mm)" statistics on the user interface next to each filter and facet.
 */
export function computeFiltering(contribs, fields, filterList, fieldValues, filterSettings) {
  const presentFilterList = filterList.filter(x => fields[x.field])
  const filterChecks = new Map(presentFilterList.map((filterSpec, filterId) => (
    [filterId, (filterSpec.name === 'FullText' ? fullTextCheck : facetCheck)(filterSpec.field, filterSettings.get(filterId))]
  )));
  const filteredData = [];
  const otherFilteredData = new Map(presentFilterList.map((filterSpec, filterId) => [filterId, []]));

  /**
   * We determine for every row whether it passes all filters or not.
   * We are also interested in those rows that fail exactly one filter.
   * Because those rows are part of the universe that that one filter is filtering.
   */
  for (const row of contribs) {
    /*
     * Here we record the one filter for which the row fails, if there is such a filter.
     */
    let the_one_fail = null;
    let v = true;
    let discard = false;
    for (const [filterId, filterCheck] of filterChecks) {
      const pass = filterCheck(row);
      if (!pass) {
        v = false;
        if (the_one_fail === null) {
          /*
           * If no other filters fail, this the the one that fails
           */
          the_one_fail = filterId;
        }
        else {
          /*
           * More than one filter has failed, the row is uninteresting
           */
          discard = true;
          break;
        }
      }
    }
    if (!discard) {
      if (v) {
        /*
         * the row has passed all filters
         */
        filteredData.push(row);
        presentFilterList.forEach((filterSpec, filterId) => {
          otherFilteredData.get(filterId).push(row);
        });
      }
      else {
        /*
         * the row has failed exactly one filter,
         * we store it in its `otherFilteredData`.
         */
        otherFilteredData.get(the_one_fail).push(row);
      }
    }
  }
  const amounts = new Map(presentFilterList.map((filterSpec, filterId) => {
    const field = filterSpec.field;
    return [filterId, filterSpec.name === 'FullText' ? null : countFacets(field, fieldValues.get(field), otherFilteredData.get(filterId))];  
  }));
  return {
    filteredData,
    filteredAmountOthers: new Map([...otherFilteredData.entries()].map(([filterId,x]) => [filterId, x.length])),
    amounts,
  }
}

/**
 * ## Updating Filter State
 *
 * The task for this function is to generate a new state,
 * based on the current state and a user event.
 * It is, in the {@link external:Redux|Redux} sense, a *reducer*.
 *
 * We take care that the new state is a shallow copy of the old state,
 * in such a way that every inside object that contains a mutated element
 * is replaced by a shallow copy.
 * So if the old state is
 *
 * ```
 *    state = {
 *      x: { a: [1], b: [2] },
 *      y: { a: [3], b: [4] },
 *    }
 * ```
 *
 * and we want to change
 *
 * ```
 *    state.y.b = [4,5]
 * ```
 *
 * we do not say:
 *
 * ```
 *    state.y.b.push(5)
 * ```
 *
 * Instead, we produce a new state like this
 *
 * ```
 *    newstate = {
 *      x: state.x,           // we reuse this part
 *      y: {
 *        a: state.y.a,       // we also reuse this part
 *        b: [4, 5],          // this is new
 *      },
 *    }
 * ```
 *
 * So, `newstate` is a new object, and so is `newstate.y` and `newstate.b`.
 * We need to do this, so React can compare the old and new state efficiently and
 * make the minimum number of changes to the DOM to reflect the new state.
 *
 * The cases are:
 *
 * * if the filter is FullText:
 *   * `data` is a string: the search string entered
 *
 * * if the filter is a Facet:
 *   * `data` is an object {valueId, boolean}: which value has been checked or unchecked;
 *   * `data` is a boolean: when all values have been checked or unchecked in one go
 *
 * @function
 * @param {Map} filterSettings - as in {@link module:filtering.computeFiltering|computeFiltering} 
 * @param {number} filterId - the id of the filter that fired an event
 * @returns {Map} `freshFilterSettings` - the nature of the event
 */
export const newFilterSettings = (filterSettings, filterId, data) => {
  const freshFilterSettings = new Map([...filterSettings.entries()]);
  switch (typeof data) {
    case 'boolean': {
      const filterSetting = freshFilterSettings.get(filterId);
      freshFilterSettings.set(filterId, new Map([...filterSetting.keys()].map(valueId => [valueId, data])));
      break;
    }
    case 'string': {
      freshFilterSettings.set(filterId, data);
      break;
    }
    default: {
      const [valueId, filterSetting] = data;
      freshFilterSettings.get(filterId).set(valueId, filterSetting);
      break;
    }
  }
  return freshFilterSettings;
}

/**
 * Performs full text lookup in `field` and delivers
 * the result as a {boolean} function of rows. 
 *
 * When the search term is empty, we do not have to inspect the rows:
 * we deliver `x => true`, the *is always true* function.
 *
 * @function
 * @param {string} field - the field name
 * @param {term} term - the search term
 * @returns {function} A truth function characterizing the lookup result
 */
const fullTextCheck = (field, term) => {
  const search = term.toLowerCase()
  if (search == null || search == '') {
    return row => true;
  }
  return row => {
    let val = row[field];
    val = (val != null)?val[0] : val;
    return val != null && val.toLowerCase().indexOf(search) !== -1;
  }
}

/**
 * Performs a facet filter action in `field` and delivers
 * the result as a {boolean} function of rows. 
 *
 * When the none of the facets have been checked, we do not have to inspect the rows:
 * we deliver `x => false`, the "is always false" function.
 *
 * @function
 * @param {string} field - the field name
 * @param {Map} facetValues - the facets as mapping from valueIds to whether they are checked
 * @returns {function} A truth function characterizing the lookup result
 */
const facetCheck = (field, facetValues) => {
  if (facetValues.size === 0) {
    return row => false;
  }
  return row => {
    const fieldVals = row[field];
    if (fieldVals == null || fieldVals.length == 0) {
      return facetValues.get('');
    }
    for (const {_id: valueId} of fieldVals) {
      if (facetValues.get(valueId)) {
        return true;
      }
    }
    return false;
  }
}

/**
 * Performs a facet count for a specific filter,
 * in order to determine how many hits each facet has in a given set of rows.
 *
 * countFacets = (field, fieldValues, rows) => (facetAmounts)
 *
 * @function
 * @param {string} field - the field name
 * @param {Map} fieldValues - the facets as mapping from valueIds to valueRepresentations
 * @param {Array} rows - the data rows to look through
 * @returns {Map} A mapping from valueIds to the number of times they occurred.
 */
function countFacets(field, fieldValues, rows) {
  const facetAmounts = new Map();
  for (const valueId of fieldValues.keys()) {
    facetAmounts.set(valueId, 0);
  }
  for (const row of rows) {
    const fieldVals = row[field];
    if (fieldVals == null || fieldVals.length == 0) {
      facetAmounts.set('', facetAmounts.get('') + 1); 
    }
    else {
      for (const {_id: valueId} of fieldVals) {
        facetAmounts.set(valueId, facetAmounts.get(valueId) + 1); 
      }
    }
  }
  return facetAmounts;
}

/**
 * Places the facets of a field in a table with at most maxCols columns.
 *
 * For example, if you have 20 facets, and want to save space, you can put them
 * in three columns of 7 facets each, with the last column containing only 6.
 *
 * **NB:** if you want to put say 12 facets in 8 columns, the function discovers
 * first that it needs two rows and then that it can place those facets
 * in to 2 rows of only 6 columns. It will do so.
 *
 * Thus, the maxCols parameter specifies an upper limit, but the outcome might
 * be less than so many columns!
 *
 * @function
 * @param {Map} fieldValues - the facets as mapping from valueIds to valueRepresentations
 * @param {number} maxCols - the maximum number of columns in the resulting table
 * @returns {Array} A table (nested array) of facets, ordered by facet value, vertical first.
 */
export function placeFacets(fieldValues, maxCols) {
  if (fieldValues == null) {return []}
  const facets = [...fieldValues.entries()].sort((x,y) => x[1].localeCompare(y[1]));
  if (facets.length == 0) {return []}
  const rows = [];
  const lf = facets.length;
  const nrows = Math.floor(lf / maxCols) + ((lf % maxCols) ? 1 : 0);
  const ncols = Math.floor(lf / nrows) + ((lf % nrows) ? 1 : 0);
  for (let r = 0; r < nrows; r++) {
    const row = [];
    for (let c = 0; c < ncols;  c++) {
      const f = nrows * c + r;
      row.push((f < lf) ? facets[f] : null);
    }
    rows.push(row);
  }
  return rows;
}

/**
 * The facets of a field can be checked and unchecked collectively by a
 * *collective* checkbox. 
 * If not all facets are checked, and not all facets are unchecked,
 * the collective checkbox should be in an indeterminate state.
 *
 * @function
 * @param {Map} filterSettings - a {@link external:Map|Map} of filters to their current settings
 * @returns {Object} Two booleans:
 * * are they all checked?
 * * are they all unchecked?
 */
export function testAllChecks(filterSettings) {
  let allTrue = true;
  let allFalse = true;
  for (const valueId of filterSettings.keys()) {
    if (filterSettings.get(valueId)) {
      allFalse = false;
    }
    else {
      allTrue = false;
    }
  }
  return {allTrue: allTrue, allFalse: allFalse};
}

