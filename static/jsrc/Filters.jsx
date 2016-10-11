import React, { Component, PropTypes } from 'react';
import Fulltext from './Fulltext.jsx';
import Bymeta from './Bymeta.jsx';
import EUMap from './EUMap.jsx';

const filterlist = [
  [Fulltext, 'Fulltext', {field: 'title'}],
  [EUMap,    'EUmap',    {field: 'country',             maxcols: 3}],
  [Bymeta,   'Bymeta',   {field: 'typeContribution',    maxcols: 2}],
  [Bymeta,   'Bymeta',   {field: 'tadirahObjects',      maxcols: 2}],
  [Bymeta,   'Bymeta',   {field: 'tadirahTechniques',   maxcols: 1}],
];

function getFilterId(fName, params) {
  return `${fName}.${params.field}`;
}

export default class Filters extends Component {
  constructor(props) {
    super(props);
    this.filter = new Map();
    this.filteredData = new Map();
    this.otherFilteredData = new Map();
    for (const [Fclass, Fname, params] of filterlist) {
      const fid = getFilterId(Fname, params);
      this.filter.set(fid, row => true);
      this.filteredData.set(fid, props.data);
      this.otherFilteredData.set(fid, props.data);
    }
  }
  compute() {
    const filteredIds = new Set();
    const filteredData = new Map();
    const otherFilteredData = new Map();
    for (const [fid, vf] of this.filter) {
      filteredData.set(fid, []);
      otherFilteredData.set(fid, []);
    }
    for (const row of this.props.data) {
      let the_one_fail = null;
      let v = true;
      let discard = false;
      for (const [fid, vf] of this.filter) {
        const pass = vf(row);
        if (!pass) {
          v = false;
          if (the_one_fail == null) {
            the_one_fail = fid;
          }
          else {
            discard = true;
            break;
          }
        }
      }
      if (!discard) {
        if (v) {
          filteredIds.add(row._id);
          for (const [fid, vf] of this.filter) {
            filteredData.get(fid).push(row);
            otherFilteredData.get(fid).push(row);
          }
        }
        else {
          otherFilteredData.get(the_one_fail).push(row);
        }
      }
    }
    this.filteredIds = filteredIds;
    this.filteredData = filteredData;
    this.otherFilteredData = otherFilteredData;
    this.props.afterCompute(new Set(this.filteredIds));
  }
  updateFilter(fid, vf) {
      this.filter.set(fid, vf);
      this.compute();
  }
  render() {
    for (const [Fclass, Fname, params] of filterlist) {console.log(Fclass)}
    return (
      <div>
        {filterlist.map(([Fclass, Fname, params]) => (
          <Fclass
            key={getFilterId(Fname, params)}
            id={getFilterId(Fname, params)}
            updateFilter={this.updateFilter.bind(this)}
            data={this.props.data}
            filteredData={this.filteredData.get(getFilterId(Fname, params))}
            otherFilteredData={this.otherFilteredData.get(getFilterId(Fname, params))}
            {...params}
          />))}
      </div>
    )
  }
}
Filters.propTypes = {
  data: PropTypes.array.isRequired,
}
