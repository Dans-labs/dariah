import React, { Fragment } from 'react'

import { emptyA, emptyO } from 'utils'
import { itemReadField /*, itemEditField */ } from 'fields'
import { getItem, isReviewerType, reviewerRole } from 'workflow'

//import Expand from 'Expand'
//import Tooltip from 'Tooltip'

const rField = (field, l, f, key) =>
  itemReadField(field, l(field), f(field), key)
//const eField = (field, l, fe, m, key) => itemEditField(field, l(field), fe(field), m(field), key)

const myReview = (me, w) =>
  me._id && ((w('reviews') || emptyO).items || emptyA).find(x => x == me._id)

const templates = {
  main({ l, f }) {
    return (
      <div className={'grid fragments'}>
        {rField('title', l, f)}
        {rField('reviewType', l, f)}
        {rField('assessment', l, f)}
      </div>
    )
  },
  mainAction({ me, w }) {
    const { reviewerE, reviewerF } = getItem(w('reviewers'))
    const myType = isReviewerType(me, reviewerE, reviewerF)
    return (
      <span className={`label large workflow ${myType ? 'info' : 'warning'}`}>
        {`Your reviewer role is: ${reviewerRole[myType]}`}
      </span>
    )
  },
  insert: {
    assessment({ v, w, me, onInsert }) {
      const myType = isReviewerType(me, v('reviewerE'), v('reviewerF'))
      const mine = myReview(me, w)
      const mineLink = `/data/review/mylist/item/${mine}`
      return myType ? (
        <Fragment>
          <span className={`label large workflow ${myType ? 'info' : 'error'}`}>
            {`Your reviewer role is: ${reviewerRole[myType]}`}
          </span>
          {mine ? (
            <a className={`button large workflow info`} href={mineLink}>
              {`Continue reviewing`}
            </a>
          ) : (
            <span className={`button large workflow info`} onClick={onInsert}>
              {`Start review`}
            </span>
          )}
        </Fragment>
      ) : (
        emptyA
      ) // null will cause the default button to appear, but we want to suppress that
    },
  },
}

Object.assign(templates, {
  detail: {
    assessment: templates.main,
  },
  detailAction: {
    assessment: templates.mainAction,
  },
})

export default templates
