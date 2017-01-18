import React, { Component } from 'react'

import { getData } from '../helpers/data.js'
import { withContext, saveState } from '../helpers/hoc.js'

const asLink = (txt, asUrl, i) => asUrl?(
    <a key={`v${i}`} target="_blank" href={txt}>{txt}</a>
    ):(
      <span key={`v${i}`}>{txt}</span>
    )

const getValues = function(row, perm, fields, fieldName, fieldLabel, withId, asUrl, style) {
  if (!fields[fieldName]) {return null}
  const infoRaw = row[fieldName]
  let info;
  switch (typeof infoRaw) {
    case 'string': {
      info = [{value: infoRaw}];
      break;
    }
    default: {
      if (Array.isArray(infoRaw)) {
        info = (infoRaw == undefined)? [] : infoRaw;
      }
      else {
        info = (infoRaw == undefined)? [] : [infoRaw];
      }
      break;
    }
  }
  return (
    <tr>
      <td className="label">{fieldLabel}</td>
      <td>{perm.upd[fieldName]? <a href="#" className="fa fa-pencil"/> : ''}</td>
      <td className={`value ${style}`}>
        {info.map((d,i) => asLink(`${(!withId || d._id == undefined)?'':(d._id+' ')}${d.value}`, asUrl, i))}
      </td>
    </tr>
  )
}

/**
 * @class
 * @classdesc
 *
 * **stateful** {@link external:Component|Component}
 *
 * ## A single contribution record
 *
 * Displays all fields that the user is entitled to read.
 * With a control to edit the record.
 *
 */
class ContribItem extends Component {
/**
 *
 * @method
 * @param {Contrib[]} contribdata (from *state*) The list of contribution records as it comes form mongo db,
 * plus a list of fields that is provided for each row (dependent on user permissions)
 * @param {Map} countries (from *state*) The country information as fetched from the database on the server.
 * Organized as a {Map} keyed by Two-letter country codes.
 * @returns {Fragment}
*/
  render() {
    const { fielddata } = this.state;
    if (fielddata == null) {
      return <div/>
    }
    const { row, fields, perm } = fielddata;
    return (
        <table>
          <tbody>
            {getValues(row, perm, fields, 'year', 'Year:', false, false, 'controlled')}
            {getValues(row, perm, fields, 'country', 'Country(ies):', true, false, 'controlled')}
            {getValues(row, perm, fields, 'disciplines', 'Disciplines:', false, false, 'controlled')}
            {getValues(row, perm, fields, 'keywords', 'Keywords:', false, false, 'controlled')}
            {getValues(row, perm, fields, 'typeContribution', 'Type:', false, false, 'controlled')}
            {getValues(row, perm, fields, 'tadirahObjects', 'Object(s):', false, false, 'controlled')}
            {getValues(row, perm, fields, 'tadirahActivities', 'Activity(ies):', false, false, 'controlled')}
            {getValues(row, perm, fields, 'tadirahTechniques', 'Technique(s):', false, false, 'controlled')}
            {getValues(row, perm, fields, 'urlContribution', 'Contribution url:', false, true, '')}
            {getValues(row, perm, fields, 'urlAcademic', 'Academic url:', false, true, '')}
            {getValues(row, perm, fields, 'description', 'Description:', false, false, 'free fixed')}
          </tbody>
        </table>
      )
  }
/**
 * @method
 * @param {Contrib[]} contribs (from *state*) The list of contribution records as it comes form mongo db
 * @param {Map} countries (from *state*) The country information as fetched from the database on the server.
 * Organized as a {Map} keyed by Two-letter country codes.
 * @returns {Object} The data fetched from the server.
*/
  componentDidMount() {
    const { fielddata } = this.state;
    const { row } = this.props;
    if (fielddata == null) {
      getData([
          {
            type: 'db',
            path: `/item_contrib?id=${row._id}`,
            branch: 'fielddata',
          },
        ],
        this,
        this.props.notification.component
      );
    }
  }
}

export default withContext(saveState(ContribItem, 'ContribItem', {row: null, fields: null}))

