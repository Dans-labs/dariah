import React, { Component } from 'react'
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'

import { getData } from '../helpers/data.js'
import { withContext, saveState } from '../helpers/hoc.js'

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
class ContribField extends Component {
/**
 *
 * @method
 * @param {Contrib[]} contribdata (from *state*) The list of contribution records as it comes form mongo db,
 * plus a list of fields that is provided for each row (dependent on user permissions)
 * @returns {Fragment}
*/
  constructor(props) {
    super(props);
    this.state = {};
  }

  saveCallback(newState) {
    this.setState(newState);
  }

  isStringAcceptable(string) {
    return (string.length >= 1);  // Minimum 1 letter long
  }

  repField(infoRaw, hasValueList, convert) {
    if (infoRaw == undefined) {return ''}
    if (hasValueList) {
      if (!Array.isArray(infoRaw)) {infoRaw = [infoRaw]}
      return infoRaw.map(x => this.repValue(x, convert)).join(' | ');
    }
    return this.repValue({value: infoRaw}, convert)
  }


  repValue(valRaw, convert) {
    let result;
    let val = valRaw.value;
    switch (convert) {
      case 'user': {
        const { usersMap } = this.props;
        const valId = valRaw._id;
        let valRep;
        if (!usersMap.has(valId)) {
          valRep = 'UNKNOWN';
        }
        else {
          const userData = usersMap.get(valId);
          const fname = userData.firstName || '';
          const lname = userData.lastName || '';
          const email = userData.email || '';
          const eppn = userData.eppn || '';
          const authority = userData.authority || '';
          const mayLogin = userData.mayLogin?'yes':'no';
          let linkText = [fname, lname].filter(x => x).join(' '); 
          if (!linkText) {linkText = email}
          const namePart = (linkText && email)? (
            `[${linkText}](mailto:${email})`
          ) : (
            linkText+email
          );
          const eppnPart = eppn?` eppn=${eppn} `:'';
          const authorityPart = authority?` authenticated by=${authority} `:'';
          const mayLoginPart = mayLogin?` active=${mayLogin} `:'';
          valRep = [namePart, eppnPart, authorityPart, mayLoginPart].filter(x => x).join('; ');
        }
        result = valRep;
        break;
      }
      case 'datetime': {
        const valRep = (new Date(val['$date'])).toISOString();
        result = valRep;
        break;
      }
      case 'url': {
        result = val;
        break;
      }
      default: {
        result = val;
        break;
      }
    }
    return result;
  }

  render() {
    const { currentValue, valueList } = this.state;
    const { initValue, rowId, fieldSpec } = this.props;
    const { name, hasValueList, multiple, allowNew, validation, widget, convert } = fieldSpec;
    const fieldRep = (currentValue == null)?this.repField(initValue, hasValueList, convert):currentValue;
    return (
      <RIEInput
        value={fieldRep}
        change={this.saveCallback.bind(this)}
        propName={name}
        className="editable"
        validate={this.isStringAcceptable}
        classLoading="loading"
        classInvalid="invalid"
      />
    )
  }
/**
 * @method
 * @param {Contrib[]} contribs (from *state*) The list of contribution records as it comes form mongo db
 * @returns {Object} The data fetched from the server.
*/
  componentDidMount() {
    const { valueList } = this.state;
    const { fieldName, hasValueList } = this.props;
    if (hasValueList) {
      if (valueList == null) {
        const path = ((typeof valueList) == 'string')? valueList : `/value_list?list=${fieldName}`;
        getData([
            {
              type: 'db',
              path: path,
              branch: 'valueList'
            },
          ],
          this,
          this.props.notification.component
        );
      }
    }
  }
}

export default withContext(saveState(ContribField, 'ContribField', {currentValue: null, valueList: null}))
