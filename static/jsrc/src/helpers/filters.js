export function compileFiltering(contribs, filterList) {
  const fields = filterList.filter(x => x.name != 'Fulltext').map(x => x.field);
  const fieldValues = new Map(fields.map(f => [f, new Map([['', '-none-']])]));
  for (const row of contribs) {
    const rid = row._id;
    for (const field of fields) {
      const fFieldValues = fieldValues.get(field);
      const metaraw = row[field];
      if (metaraw != undefined && metaraw.length != 0) {
        for (const {_id: valueId, value: valueRep} of metaraw) {
          if (!fFieldValues.has(valueId)) {fFieldValues.set(valueId, valueRep)}
        }
      }
    }
  }
  const filterInit = new Map(filterList.map((filterSpec, filterId) => [
    filterId,
    filterSpec.name == 'Fulltext' ? '' : new Map([...fieldValues.get(filterSpec.field).keys()].map(valueId => [valueId, true]))
  ]));

  return {
    fieldValues,
    filterInit,
  };
}

export function computeFiltering(contribs, filterList, fieldValues, filterSettings) {
  const fullTextCheck = (field, term) => {
    const search = term.toLowerCase()
    if (!search) {
      return row => true;
    }
    return row => {
      const val = row[field]
      return val != undefined && val.toLowerCase().indexOf(search) != -1;
    }
  }

  const facetCheck = (field, facetValues) => {
    if (facetValues.size == 0) {
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

  const filterChecks = new Map(filterList.map((filterSpec, filterId) => (
    [filterId, (filterSpec.name == 'Fulltext' ? fullTextCheck : facetCheck)(filterSpec.field, filterSettings.get(filterId))]
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
        if (the_one_fail == null) {
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
    return [filterId, filterSpec.name == 'Fulltext' ? null : countFacets(field, fieldValues.get(field), otherFilteredData.get(filterId))];  
  }));
  return {
    filteredData,
    filteredAmountOthers: new Map([...otherFilteredData.entries()].map(([filterId,x]) => [filterId, x.length])),
    amounts,
  }
}

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

