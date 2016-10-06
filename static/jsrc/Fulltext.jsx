import React, { Component, PropTypes } from 'react';
import Stats from './Stats.jsx';

export default class Fulltext extends Component {
  constructor(props) {
    super(props);
    this.searchTerm = '';
  }
  handleChange(event) {
    event.preventDefault();
    this.searchTerm = event.target.value;
    this.props.updateFilter(this.props.id, this.filter());
  }
  filter() {
    const thefield = this.props.field;
    const thesearch = this.searchTerm.toLowerCase()
    if (!thesearch) {
      return row => true;
    }
    return row => (row[thefield] != undefined) && (row[thefield].toLowerCase().indexOf(thesearch) != -1);
  }
  render () {
    return (
      <div>
        <p><input
            type="search"
            placeholder={`search in ${this.props.field}`}
            value={this.searchTerm}
            onChange={this.handleChange.bind(this)}
        />{' '}
          <Stats thisamount={this.props.filteredData.length} total={this.props.otherFilteredData.length}/>
        </p>
      </div>
    )
  }
}

Fulltext.propTypes = {
  field: PropTypes.string.isRequired,
  filteredData: PropTypes.array.isRequired,
  otherFilteredData: PropTypes.array.isRequired,
}
