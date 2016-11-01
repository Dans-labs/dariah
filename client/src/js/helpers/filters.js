/* FILTERS AND FACETS
 * The big contribution list can be filtered by any number of filters.
 * This module contains helpers to set up the filtering and compute the results.
 *
 * The list of filters is specified in the Filters component.
 *
 * TOC:
 *
 * COMPILING FILTERS
 * COMPUTING FILTERS
 * UPDATING FILTER STATE
 * PLACING FACETS in COLUMNS
 * COLLECTIVE CHECKBOXES
 *
 */

/*
 * COMPILING FILTERS
 *
 * compileFiltering =
 *  (contribs, filterList) =>
 *  (fieldValues, filterInit)
 *
 * This is a one time computation once the big list of contributions has been fetched.
 * The values of fields that are subject to faceted browsing are collected.
 * We assume that these values are themselves objects with an _id and a concrete 
 * representation.
 * For each field we collect a mapping _id => representation
 * of the {_id, representation} that occur in at least one of the contrib rows.
 *
 * We also construct the initial filterSettings, which corresponds to:
 * - a fullText search string that is empty
 * - for every faceted field:
 *   - a mapping from each of its value ids to true
 *     (representing that every facet of that field is checked)
 *   - to this mapping we add a -none- value, with the intention that it matches
 *     those rows that lack this field.
 *
 * With both the properties fieldValues and filterInit it is possible
 * for a component to render the complete user interface for filtering.
 */

export function compileFiltering(contribs, filterList) {
  const fields = filterList.filter(x => x.name !== 'FullText').map(x => x.field);
  const fieldValues = new Map(fields.map(f => [f, new Map([['', '-none-']])]));
  for (const row of contribs) {
    for (const field of fields) {
      const fFieldValues = fieldValues.get(field);
      const metaraw = row[field];
      if (metaraw != undefined && metaraw.length !== 0) {
        for (const {_id: valueId, value: valueRep} of metaraw) {
          if (!fFieldValues.has(valueId)) {fFieldValues.set(valueId, valueRep)}
        }
      }
    }
  }
  const filterInit = new Map(filterList.map((filterSpec, filterId) => [
    filterId,
    filterSpec.name === 'FullText' ? '' : new Map([...fieldValues.get(filterSpec.field).keys()].map(valueId => [valueId, true]))
  ]));

  return {
    fieldValues,
    filterInit,
  };
}

/* COMPUTING FILTERS
 *
 * computeFiltering =
 *  (contribs, filterList, fieldValues, filterSettings) => 
 *  (filteredData, filteredAmountOthers, amounts)                  
 *
 * This is the input for the filter computation:
 * - filterList, filterValues: specify the filters that we have to reckon with
 * - filterSettings: the state that the filters have as result of user interaction
 * - contribs: the list to be filtered
 *
 * The outcomes are:
 * - filteredData: the sublist of contribs, the rows that pass all filters
 * - filteredAmountOthers: a mapping that indicates for each filter (id) how many rows pass all other filters
 * - amounts: a mapping like filteredAmountOthers, but more specific: it indicates per faceted value
 *   how many results there are left if all the other filters are active
 *
 * With filteredData.length, filteredAmountOthers, amounts we have exactly the right numbers to 
 * render the "(nn of mm)" statistics on the user interface next to each filter and facet.
 *
 */
export function computeFiltering(contribs, filterList, fieldValues, filterSettings) {

  const filterChecks = new Map(filterList.map((filterSpec, filterId) => (
    [filterId, (filterSpec.name === 'FullText' ? fullTextCheck : facetCheck)(filterSpec.field, filterSettings.get(filterId))]
  )));
  const filteredData = [];
  const otherFilteredData = new Map(filterList.map((filterSpec, filterId) => [filterId, []]));

  for (const row of contribs) {
    let the_one_fail = null;
    let v = true;
    let discard = false;
    for (const [filterId, filterCheck] of filterChecks) {
      const pass = filterCheck(row);
      if (!pass) {
        v = false;
        if (the_one_fail === null) {
          the_one_fail = filterId;
        }
        else {
          discard = true;
          break;
        }
      }
    }
    if (!discard) {
      if (v) {
        filteredData.push(row);
        filterList.forEach((filterSpec, filterId) => {
          otherFilteredData.get(filterId).push(row);
        });
      }
      else {
        otherFilteredData.get(the_one_fail).push(row);
      }
    }
  }
  const amounts = new Map(filterList.map((filterSpec, filterId) => {
    const field = filterSpec.field;
    return [filterId, filterSpec.name === 'FullText' ? null : countFacets(field, fieldValues.get(field), otherFilteredData.get(filterId))];  
  }));
  return {
    filteredData,
    filteredAmountOthers: new Map([...otherFilteredData.entries()].map(([filterId,x]) => [filterId, x.length])),
    amounts,
  }
}

/* UPDATING FILTER STATE
 *
 * newFilterSettings =
 *  (filterSettings, filterId, data) =>
 *  (freshFilterSettings)
 *
 * The task for this function is to generate a new state,
 * based on the current state and a user event.
 * It is, in the redux sense, a reducer.
 *
 * We take care that the new state is a shallow copy of the old state,
 * in such a way that every inside object that contains a mutated element
 * is replaced by a shallow copy.
 * So if the old state is
 *
 *    state = {
 *      x: { a: [1], b: [2] },
 *      y: { a: [3], b: [4] },
 *    }
 *
 * and we want to change
 *
 *    state.y.b = [4,5]
 *
 * we do not say:
 *
 *    statey.b.push(5)
 *
 * Instead, we produce a new state like this
 *
 *    newstate = {
 *      x: state.x,           // we reuse this part
 *      y: {
 *        a: state.y.a,       // we also reuse this part
 *        b: [4, 5],          // this is new
 *      },
 *    }
 *
 * So, newstate is a new object, and so is newstate.y and newstate.b
 * We need to do this, so React can compare the old and new state efficiently and
 * make the minimum number of changes to the DOM to reflect the new state.
 *
 * Back to this function:
 * - filterSettings represents the old state
 * - filterId and data specify what has happened:
 *   - filterId: which filter has been touched?
 *   - data: what has happened to that filter?
 * 
 * The cases are:
 *
 * - if the filter is FullText:
 *   - data is a string: the search string entered
 *
 * - if the filter is a Facet:
 *   - data is an object {valueId, boolean}: which value has been checked or unchecked;
 *   - data is a boolean: when all values have been checked or unchecked in one go
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

/* performs a full text filter action
 *
 * fullTextCheck = (field, term) => (truth function)
 *
 * Given a field and a search term, a function is returned which,
 * given a row, tells whether the search term occurs in the specified field of that row.
 *
 * When the search term is empty, we do not have to inspect the rows:
 * we deliver the "is always true" function.
 */
const fullTextCheck = (field, term) => {
  const search = term.toLowerCase()
  if (!search) {
    return row => true;
  }
  return row => {
    const val = row[field];
    return val != undefined && val.toLowerCase().indexOf(search) !== -1;
  }
}

/* performs a facet filter action
 *
 * facetCheck = (field, facetValues) => (truth function)
 *
 * Given a field and a map that tell which facet values have been checked,
 * a function is returned which,
 * given a row, tells whether that row contains at least one value
 * that has been checked in a facet.
 *
 * When the none of the facets have been checked, we do not have to inspect the rows:
 * we deliver the "is always false" function.
 */
const facetCheck = (field, facetValues) => {
  if (facetValues.size === 0) {
    return row => false;
  }
  return row => {
    const fieldVals = row[field];
    if (!fieldVals) {
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

/* performs a filter count
 *
 * countFacets = (field, fieldValues, rows) => (facetAmounts)
 *
 * Given a list of rows, a field, and the possible values for that field,
 * we count how many rows contain each value in that field.
 */
function countFacets(field, fieldValues, rows) {
  const facetAmounts = new Map();
  for (const valueId of fieldValues.keys()) {
    facetAmounts.set(valueId, 0);
  }
  for (const row of rows) {
    const fieldVals = row[field];
    if (!fieldVals) {
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

/* PLACING FACETS IN COLUMNS
 *
 * Places the facets of a field in a table with at most maxcols columns.
 *
 * For example, if you have 20 facets, and want to save space, you can put them
 * in three columns of 7 facets each, with the last column containing only 6.
 *
 * NB: if you want to put say 12 facets in 8 columns, the function discovers
 * first that it needs two rows and then that it can place those facets
 * in to 2 rows of only 6 columns. It will do so.
 *
 * Thus, the maxcols parameter specifies an upper limit, but the outcome might
 * be less than so many columns!
 */
export function placeFacets(field, fieldValues, maxcols) {
  const facets = [...fieldValues.entries()].sort((x,y) => x[1].localeCompare(y[1]));
  const rows = [];
  const lf = facets.length;
  const nrows = Math.floor(lf / maxcols) + ((lf % maxcols) ? 1 : 0);
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

/* COLLECTIVE CHECKBOXES
 * The facets of a field can be checked and unchecked collectively by a
 * "collective" checkbox. 
 * If not all facets are checked, and not all facets are unchecked,
 * the collective checkbox should be in an indeterminate state.
 *
 * testAllChecks (filterSettings) => (allTrue, allFalse)
 *
 * This function inspects all relevant facets and returns two booleans:
 * - are they all checked?
 * - are they all unchecked?
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

