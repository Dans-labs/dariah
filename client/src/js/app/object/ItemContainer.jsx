import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getTables, needValues, fetchItem } from 'tables'

import ItemForm from 'ItemForm'
import ListGrid from 'ListGrid'
import ListPlain from 'ListPlain'
import ListFilter from 'ListFilter'

class ItemContainer extends Component {
  render() {
    const { props: { tables, table, eId } } = this
    if (needValues({ tables, table, eId })) {return <div />}

    const { [table]: { fields, details, entities: { [eId]: entity } } } = tables
    const { values: initialValues, perm } = entity
    const detailTables = Object.entries(details || {}).map(([name, { label, table: detailTable, linkField, mode }]) => {
      const {
        [detailTable]: {
          title: detailTitle,
          perm: detailPerm,
          entities: detailEntities,
          allIds: detailAllIds,
        },
      } = tables
      const detailListIds = detailAllIds.filter(_id => detailEntities[_id].values[linkField] == eId)
      return (
        <div key={`${name}-${eId}`} >
          {
            mode == 'list' ?
              <ListPlain
                heading={label}
                table={detailTable}
                listIds={detailListIds}
                perm={detailPerm}
                title={detailTitle}
                inplace={true}
                masterId={eId}
                linkField={linkField}
              /> :
            mode == 'grid' ?
              <ListGrid
                heading={label}
                table={detailTable}
                listIds={detailListIds}
                perm={detailPerm}
                tag={`${table}-${name}-${eId}`}
                masterId={eId}
                linkField={linkField}
              /> :
            mode == 'filter' ?
              <ListFilter
                heading={label}
                table={detailTable}
                masterId={eId}
                linkField={linkField}
              /> :
              <span>{`unknown display mode "${mode}" for item list`}</span>
          }
        </div>
      )
    })
    return (
      <div>
        <ItemForm
          table={table}
          eId={eId}
          initialValues={initialValues}
          perm={perm}
          fields={fields}
          form={`${table}-${eId}`}
          key={`${table}-${eId}`}
        />
        {detailTables}
      </div>
    )
    /* Note the key prop passed to ItemForm.
     * If you do not pass it, you get bugs caused by the mounting and unmounting of this component
     * due to react-router navigation.
     * In essence, the callback onChange that redux-form passes to input components, becomes bound to the wrong form!
     * This workaround is documented here: https://github.com/erikras/redux-form/issues/2886
    */
  }
  componentDidMount() {
    const { props: { tables, table, eId, fetch } } = this
    if (needValues({ tables, table, eId })) {fetch(table, eId)}
  }
  componentDidUpdate() {
    const { props: { tables, table, eId, fetch } } = this
    if (needValues({ tables, table, eId })) {fetch(table, eId)}
  }
}

export default connect(getTables, { fetch: fetchItem })(ItemContainer)

