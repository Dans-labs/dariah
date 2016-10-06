import React, { Component, PropTypes } from 'react';
import Facet from './Facet.jsx';
import CheckboxI from './CheckboxI.jsx';
import Stats from './Stats.jsx';
import ShowHide from './ShowHide.jsx';

export default class Bymeta extends Component {
  constructor(props) {
    super(props);
    this.rows = null;
    this.facet = new Map();
    this.state = {dirty: false};
    this.showHide = false;
  }
  componentDidMount() {
    this.setState({dirty: false});
  }
  componentWillReceiveProps() {
    this.setState({dirty: false});
  }
  componentWillMount() {
    this.compileFacets();
  }
  compileFacets() {
    const facet = new Map();
    const fieldIndex = new Map();
    const fieldValues = new Map();
    fieldValues.set('', '-none-');
    fieldIndex.set('', new Set());
    const field = this.props.field;
    for (const row of this.props.data) {
      const rid = row._id;
      const metaraw = row[field];
      if (metaraw != undefined && metaraw.length != 0) {
        for (const {_id: mid, value: meta} of metaraw) {
          if (!fieldIndex.has(mid)) {fieldIndex.set(mid, new Set([rid]))}
          else {fieldIndex.get(mid).add(rid)}
          if (!fieldValues.has(mid)) {fieldValues.set(mid, meta)}
        }
      }
      else {
        fieldIndex.get('').add(rid);
      }
    }
    for (const mid of fieldValues.keys()) {
      facet.set(mid, true);
    }
    this.facet = facet;
    this.index = fieldIndex;
    this.values = fieldValues;
    const maxcols = this.props.maxcols;
    const facets = [...this.values.entries()].sort((x,y) => x[1].localeCompare(y[1]));
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
    this.rows = rows;
  }
  filter() {
    const thefield = this.props.field;
    const facetValues = new Set([...this.facet.entries()].filter(x => x[1]).map(x => x[0])); 
    if (facetValues.size == 0) {
      return row => false;
    }
    return row => {
      const fieldVals = row[thefield];
      if (!fieldVals) {
        return facetValues.has('');
      }
      for (const {_id: mid} of fieldVals) {
        if (facetValues.has(mid)) {
          return true;
        }
      }
      return false;
    }
  }
  countFacets() {
    const thefield = this.props.field;
    const facetAmounts = new Map();
    for (const mid of this.values.keys()) {
      facetAmounts.set(mid, 0);
    }
    for (const row of this.props.otherFilteredData) {
      const fieldVals = row[thefield];
      if (!fieldVals) {
        facetAmounts.set('', facetAmounts.get('') + 1); 
      }
      else {
        for (const {_id: mid} of fieldVals) {
          facetAmounts.set(mid, facetAmounts.get(mid) + 1); 
        }
      }
    }
    this.amounts = facetAmounts;
  }
  updateFacet(mid, v) {
    if (mid == null) {
      for (const m of this.facet.keys()) {
        this.facet.set(m, v);
      }
      this.props.updateFilter(this.props.id, row => v);
    }
    else {
      this.facet.set(mid, v);
      this.props.updateFilter(this.props.id, this.filter());
    }
    this.setState({dirty: true});
  }
  getAllCheckState() {
    let allTrue = true;
    let allFalse = true;
    for (const v of this.facet.values()) {
      if (v) {
        allFalse = false;
      }
      else {
        allTrue = false;
      }
    }
    return {allTrue: allTrue, allFalse: allFalse};
  }
  render () {
    this.countFacets();
    const statStyle = {align: 'right'}
    return (
      <div>
        <p style={{fontWeight: 'bold', marginTop: '1em', marginBottom: '0.2em', borderTop: '1px solid black'}}>
          <CheckboxI
            states={this.getAllCheckState()}
            updateFacet={this.updateFacet.bind(this)}
          /> By {this.props.field}{' '}
          <Stats thisamount={this.props.filteredData.length} total={this.props.otherFilteredData.length}/>{' '}
          <ShowHide showinit={true} component={this.refs.table}/>
        </p>
        {this.rows != null ? (
        <table ref='table'>
          <tbody>
            {this.rows.map((row, i) => (
              <tr key={i}>
                {row.map((f, j) => {
                  return [
                    <td
                      key={j}
                      style={j > 0 ? {paddingLeft: '0.5em'} : {}}
                    >
                      {f == null ? '': <Facet
                        key={f[0]}
                        mid={f[0]}
                        meta={f[1]}
                        checked={this.facet.get(f[0])}
                        updateFacet={this.updateFacet.bind(this)}
                      />}
                    </td>,
                    <td
                      style={{textAlign: 'right', paddingLeft: '0.5em'}}
                    >
                      {f == null ? '': <Stats thisamount={this.amounts.get(f[0])}/>}
                    </td>,
                  ]})}
              </tr>
            ))}
          </tbody>
        </table>
        ) : ''}
      </div>
    )
  }
}

Bymeta.propTypes = {
  field: PropTypes.string.isRequired,
  maxcols: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  filteredData: PropTypes.array.isRequired,
  otherFilteredData: PropTypes.array.isRequired,
}

