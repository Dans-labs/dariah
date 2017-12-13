import React, { Fragment } from 'react'

import { emptyA, emptyO } from 'utils'
import { headEntity } from 'tables'
import { trimDate } from 'datatypes'
import { itemReadField, itemEditField } from 'fields'
import { getItem, isReviewerType, reviewerRole } from 'workflow'

//import Expand from 'Expand'
//import Tooltip from 'Tooltip'

const rField = (field, l, f, key) =>
  itemReadField(field, l(field), f(field), key)
const eField = (field, l, fe, m, key) =>
  itemEditField(field, l(field), fe(field), m(field), key)

const myReview = (me, w) =>
  me._id && ((w('reviews') || emptyO).items || emptyA).find(x => x.creator == me._id)

const templates = {
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
  mainAction({ settings, tables, table, me, v, w, s, fs }) {
    const thisReviewer = getItem(w('reviewers'))
    const { reviewerE, reviewerF } = thisReviewer
    const myType = isReviewerType(me, reviewerE, reviewerF)
    const { decision: { entities: dEntities = emptyO } = emptyO } = tables
    const decisions = {}
    Object.entries(dEntities).forEach(([dId, { values: { rep } = emptyO }]) => {
      decisions[rep] = dId
    })
    const dAccept = decisions['accept']
    const dReject = decisions['reject']
    const theseDecisions = {}
    const theseDecisionDates = {}
    ;['E', 'F'].forEach(reviewType => {
      const isMy = myType && reviewType === myType
      if (isMy) {
        theseDecisions[reviewType] = v('decision')
        theseDecisionDates[reviewType] = s('dateDecided')
      } else {
        const { items: otherReviews = emptyA } = w('others') || emptyO
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
            const dLabeled = reviewType === 'E' ? '' : 'ed'
            const dLabelMade = reviewType === 'E' ? 'given' : 'made'
            const decision = theseDecisions[reviewType]
            const decisionRep = decision
              ? headEntity(tables, 'decision', decision, settings)
              : 'No decision yet'
            const dTaken = decision ? `${dLabel}: ${decisionRep}${dLabeled}` : `${dLabel}: not yet ${dLabelMade}`
            const dTakenDate = decision ? ` ${dLabelMade} on ${theseDecisionDates[reviewType]}` : ''
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
                      <div
                        className={`label large workflow ${
                          decision === dAccept
                            ? 'good'
                            : decision === dReject ? 'error' : 'warning'
                        }`}
                      >
                        {dTaken}
                      </div>
                      {dTakenDate}
                      {reviewType === 'F' || !theseDecisions['F']
                        ? fs('decision', null, h => (
                            <span
                              className={'button large workflow warning'}
                              onClick={h}
                            >
                              {`Revise ${dLabel}`}
                            </span>
                          ))
                        : null}
                    </div>
                  ) : (
                    <div>
                      {`${dLabel}: `}
                      {fs('decision', dAccept, h => (
                        <span
                          className={'button large workflow good'}
                          onClick={h}
                        >
                          {'Accept'}
                        </span>
                      ))}
                      {fs('decision', dReject, h => (
                        <span
                          className={'button large workflow error'}
                          onClick={h}
                        >
                          {'Reject'}
                        </span>
                      ))}
                    </div>
                  )
                ) : (
                  <div>
                    <div
                      className={`label large workflow ${
                        decision === dAccept
                          ? 'good'
                          : decision === dReject ? 'error' : 'info'
                      }`}
                    >
                      {dTaken}
                    </div>
                    {dTakenDate}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Fragment>
    )
  },
  insert: {
    assessment({ v, w, me, onInsert }) {
      const myType = isReviewerType(me, v('reviewerE'), v('reviewerF'))
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
              <span className={'label large workflow warning'}>
                {
                  'You can review after the first reviewer has advised a decision'
                }
              </span>
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
    contrib: templates.mainEdit,
  },
  detailAction: {
    assessment: templates.mainAction,
  },
})

export default templates
