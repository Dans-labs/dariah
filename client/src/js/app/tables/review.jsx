import React, { Fragment } from 'react'

import { emptyA, emptyO } from 'utils'
import { headEntity } from 'tables'
import { trimDate } from 'datatypes'
import { itemReadField, itemEditField } from 'fields'
import {
  getItem,
  isReviewerType,
  reviewerRole,
  decisions,
  processStatus,
} from 'workflow'

//import Expand from 'Expand'
//import Tooltip from 'Tooltip'

const rField = (field, l, f, key) =>
  itemReadField(field, l(field), f(field), key)
const eField = (field, l, fe, m, key) =>
  itemEditField(field, l(field), fe(field), m(field), key)

const myReview = (me, w) =>
  me._id &&
  ((w('reviews') || emptyO).items || emptyA).find(x => x.creator == me._id)

const templates = {
  head({ tables, v, w, me }) {
    const thisReviewer = getItem(w('reviewers'))
    const { reviewerE, reviewerF } = thisReviewer
    const myType = isReviewerType(me._id, reviewerE, reviewerF)
    return processStatus(
      w('reviewers'),
      myType === 'E'
        ? w('reviews')
        : { items: [{ creator: v('creator'), decision: v('decision') }] },
      !w('locked').on,
      { tables, v, w, me },
    )
  },
  main({ l, f }) {
    return (
      <div className={'grid fragments'}>
        {rField('title', l, f)}
        {rField('reviewType', l, f)}
        {rField('contrib', l, f)}
        {rField('assessment', l, f)}
        {rField('remarks', l, f)}
        {rField('editors', l, f)}
      </div>
    )
  },
  mainEdit({ l, f, fe, m, editButton }) {
    return (
      <Fragment>
        {editButton}
        <div className={'grid fragments'}>
          {eField('title', l, fe, m)}
          {rField('reviewType', l, f, m)}
          {rField('contrib', l, f)}
          {rField('assessment', l, f)}
          {eField('remarks', l, fe, m)}
          {eField('editors', l, fe, m)}
        </div>
      </Fragment>
    )
  },
  mainAction({ settings, tables, table, me, v, w, s, fs, m }) {
    const thisReviewer = getItem(w('reviewers'))
    const { reviewerE, reviewerF } = thisReviewer
    const myType = isReviewerType(me._id, reviewerE, reviewerF)
    const thisType = isReviewerType(v('creator'), reviewerE, reviewerF)
    const { dAcro, dId, dRep, dPart } = decisions(tables.decision)
    const theseDecisions = {}
    const theseDecisionDates = {}
    ;['E', 'F'].forEach(reviewType => {
      const isThis = thisType && reviewType === thisType
      if (isThis) {
        theseDecisions[reviewType] = v('decision')
        theseDecisionDates[reviewType] = s('dateDecided')
      } else {
        const { items: otherReviews = emptyA } = w('reviews') || emptyO
        for (const { decision, dateDecided } of otherReviews) {
          if (decision) {
            theseDecisions[reviewType] = decision
            theseDecisionDates[reviewType] = trimDate(
              dateDecided,
              table,
              'dateDecided',
              settings,
            )
          }
        }
      }
    })
    return (
      <Fragment>
        <div className={'review allcomments'}>
          {['E', 'F'].map(reviewType => {
            const isMy = myType && reviewType === myType
            const dLabel = reviewType === 'E' ? 'advice' : 'decision'
            const dLabelMade = reviewType === 'E' ? 'given' : 'made'
            const decision = theseDecisions[reviewType]
            const acro = decision ? dAcro[decision] : 'info'
            const decisionRep = decision ? dPart[acro] : `No ${dLabel} yet`
            const dTakenDate = decision
              ? ` ${dLabelMade} on ${theseDecisionDates[reviewType]}`
              : ''
            return (
              <div
                key={reviewType}
                className={`review reviewer ${reviewType} ${
                  isMy ? 'my' : 'other'
                }`}
              >
                <div
                  className={`label large workflow ${isMy ? 'good' : 'info'}`}
                >
                  {`${
                    isMy
                      ? 'You'
                      : headEntity(
                          tables,
                          'user',
                          thisReviewer[`reviewer${reviewType}`],
                          settings,
                        )
                  } (${reviewerRole[reviewType]})`}
                </div>
                {isMy ? (
                  w('incomplete').on ? (
                    <div className={'label large workflow warning'}>
                      {`You cannot state your ${dLabel} yet because: ${
                        w('incomplete').desc
                      }.  `}
                    </div>
                  ) : decision ? (
                    <div>
                      <div className={`label large workflow ${acro}`}>
                        {decisionRep}
                      </div>
                      {dTakenDate}
                      {reviewType === 'F' || !theseDecisions['F']
                        ? fs('decision', null, h => (
                            <span
                              className={'button large workflow warning'}
                              onClick={h}
                            >
                              {`Revoke ${dLabel}`}
                            </span>
                          ))
                        : null}
                    </div>
                  ) : (
                    <div>
                      {`${dLabel}: `}
                      {['good', 'error', 'warning'].map(acro => (
                        <Fragment key={acro}>
                          {fs('decision', dId[acro], h => (
                            <span
                              className={`button large workflow ${acro}`}
                              onClick={h}
                            >
                              {dRep[acro]}
                            </span>
                          ))}
                        </Fragment>
                      ))}
                    </div>
                  )
                ) : (
                  <div>
                    <div className={`label large workflow ${acro}`}>
                      {decisionRep}
                    </div>
                    {dTakenDate}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {m('title') && w('locked').on ? (
          <div className={'label large workflow info'}>
            {`This review is locked because: ${w('locked').desc}`}
          </div>
        ) : null}
      </Fragment>
    )
  },
  insert: {
    assessment({ v, w, me, onInsert }) {
      const myType = isReviewerType(me._id, v('reviewerE'), v('reviewerF'))
      const mine = myReview(me, w)
      const mineLink = `/data/review/mylist/item/${mine}`
      let otherDecided = true
      if (myType === 'F') {
        const { items: otherReviews = emptyA } = w('reviews') || emptyO
        otherDecided = false
        for (const { creator, decision } of otherReviews) {
          if (creator === v('reviewerE') && decision) {
            otherDecided = true
          }
        }
      }
      return myType ? (
        <Fragment>
          <span className={`label large workflow ${myType ? 'info' : 'error'}`}>
            {`Your reviewer role is: ${reviewerRole[myType]}`}
          </span>
          {mine ? (
            <a className={`button large workflow info`} href={mineLink}>
              {`Continue reviewing`}
            </a>
          ) : v('submitted') ? (
            otherDecided ? (
              <span className={`button large workflow info`} onClick={onInsert}>
                {`Start review`}
              </span>
            ) : (
              <span className={'label large workflow warning'}>{}</span>
            )
          ) : (
            <span className={'label large workflow warning'}>
              {'You can review after the self-assessment has been submitted'}
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
  detailEdit: {
    assessment: templates.mainEdit,
  },
  detailAction: {
    assessment: templates.mainAction,
  },
})

export default templates
