import React, { Component } from 'react'
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'

import { getData } from '../helpers/data.js'
import { withContext, saveState } from '../helpers/hoc.js'

const asLink = (txt, asUrl, i) => asUrl?(
    <a key={`v${i}`} target="_blank" href={txt}>{txt}</a>
    ):(
      <span key={`v${i}`}>{txt}</span>
    )

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
 * For the actual editing I intend to use
 * {@link https://github.com/kaivi/riek|React Inline Edit Kit}
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
  constructor(props) {
    super(props);
    this.state = {
    simulateXHR: false,
    XHRDelay: 450,
    highlight: false,
    showSource: false
    };
  }

  getValues(row, perm, fields, valueSpecs) {
    const frags = []
    for ([fieldName, fieldLabel, withId, asUrl, valueStyle] of valueSpecs) {
      if (!fields[fieldName]) {return null}
      const editable = !!perm.upd[fieldName];
      const infoRaw = row[fieldName]
      const newState = {}
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
      if (editable) {
        newState[fieldName] = info.join(', ')
      }

      frags.push(
        <tr key={fieldName}>
          <td className="label">{fieldLabel}</td>
          <td>{editable ? (
            <RIEInput
              value={this.state[fieldName]}
              change={this.virtualServerCallback}
              propName={fieldName}
              className={this.state.highlight ? "editable" : ""}
              validate={this.isStringAcceptable}
              classLoading="loading"
              classInvalid="invalid" />
            />
          ) : (
            <p className={`value ${valueStyle}`}>
              {info.map((d,i) => asLink(`${(!withId || d._id == undefined)?'':(d._id+' ')}${d.value}`, asUrl, i))}
            </p>
          )}</td>
        </tr>
      )
    }
    return frags
  }


  render() {
    const { fielddata } = this.state;
    if (fielddata == null) {
      return <div/>
    }
    const { row, fields, perm } = fielddata;
    return (
        <table>
          <tbody>
            {getValues(row, perm, fields, [
              ['year', 'Year:', false, false, 'controlled'],
              ['country', 'Country(ies):', true, false, 'controlled'],
              ['disciplines', 'Disciplines:', false, false, 'controlled'],
              ['keywords', 'Keywords:', false, false, 'controlled'],
              ['typeContribution', 'Type:', false, false, 'controlled'],
              ['tadirahObjects', 'Object(s):', false, false, 'controlled'],
              ['tadirahActivities', 'Activity(ies):', false, false, 'controlled'],
              ['tadirahTechniques', 'Technique(s):', false, false, 'controlled'],
              ['urlContribution', 'Contribution url:', false, true, ''],
              ['urlAcademic', 'Academic url:', false, true, ''],
              ['description', 'Description:', false, false, 'free fixed'],
            ])}
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

