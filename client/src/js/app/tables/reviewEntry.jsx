import React, { Fragment } from 'react'
import Markdown from 'react-markdown'

import { emptyS } from 'utils'
import { headEntity } from 'tables'
import { getItem, isReviewerType, reviewerRole } from 'workflow'

import Expand from 'Expand'
import Tooltip from 'Tooltip'

const templates = {
  editMode: {
    review({ e }) {
      return e('comments') ? 1 : 0
    },
  },
  detail: {
    review({ tables, settings, l, v, w, me, e, s, f }) {
      const statusClass = e('comments') ? 'incomplete' : 'complete'
      const thisReviewer = getItem(w('reviewers'))
      const { reviewerE, reviewerF } = thisReviewer
      const myType = isReviewerType(me, reviewerE, reviewerF)
      return (
        <div className={`review entryRead ${statusClass}`}>
          <div className={'criteria entry'}>
            <div>{s('seq')}</div>
            <Expand
              alterSection={`criteriaEntry${v('_id')}`}
              alterTag={l('remarks')}
              iconOpen={'info-circle'}
              iconClose={'minus-circle'}
              titleOpen={'Show criteria details'}
              titleClose={'Hide criteria details'}
              headActive={emptyS}
              headLine={f('criteria')}
              full={
                <div className={'criteria comments'}>
                  {f('criteria', 'remarks')}
                </div>
              }
              className={'fat'}
            />
          </div>
          {assessment(f)}
          {putReviewAll(myType, thisReviewer, true, {
            tables,
            settings,
            l,
            w,
            theF: f,
          })}
        </div>
      )
    },
  },
  detailEdit: {
    review({ tables, settings, l, e, w, me, s, f, fe, editButton }) {
      const statusClass = e('comments') ? 'incomplete' : 'complete'
      const thisReviewer = getItem(w('reviewers'))
      const { reviewerE, reviewerF } = thisReviewer
      const myType = isReviewerType(me, reviewerE, reviewerF)
      return (
        <div className={`review entryEdit ${statusClass}`}>
          <div className={'criteria entry'}>
            {editButton}
            {s('seq')}
            <div className={'fat'}>
              <div className={'fat'}>{f('criteria')}</div>
              <div className={'criteria comments'}>
                {f('criteria', 'remarks')}
              </div>
            </div>
          </div>
          {assessment(f)}
          {putReviewAll(myType, thisReviewer, true, {
            tables,
            settings,
            l,
            w,
            theF: fe,
          })}
        </div>
      )
    },
  },
}

const putReviewAll = (
  myType,
  thisReviewer,
  editable,
  { tables, settings, l, w, theF },
) => (
  <Fragment>
    <p>
      <b>{l('comments')}</b>
    </p>
    <div className={'review allcomments'}>
      {['E', 'F'].map(reviewType => {
        const isMy = myType && reviewType === myType
        return (
          <div
            key={reviewType}
            className={`review reviewer ${reviewType} ${isMy ? 'my' : 'other'}`}
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
            <div className={'review comments'}>
              {putReviewReviewer(reviewType, isMy, thisReviewer, editable, {
                theF,
                w,
              })}
            </div>
          </div>
        )
      })}
    </div>
  </Fragment>
)

const putReviewReviewer = (
  reviewType,
  isMy,
  thisReviewer,
  editable,
  { theF, w },
) => {
  if (isMy) {
    return (
      <Tooltip tip={'Enter review comments'} at={'top'}>
        {theF('comments')}
      </Tooltip>
    )
  } else {
    const otherEntries = getItem(w('others'), true).filter(
      ({ creator }) => creator === thisReviewer[`reviewer${reviewType}`],
    )
    return otherEntries.map(({ comments }, i) => (
      <Markdown
        key={i}
        className={'field-content'}
        source={comments.join('\n\n')}
      />
    ))
  }
}

const assessment = f => (
  <div className={'assessment comments'}>
    <div>
      <Tooltip tip={'Score by self-assessment'} at={'right'}>
        {f('criteriaEntry', 'score')}
      </Tooltip>
    </div>
    <div>
      <b>{'Evidence'}</b>
    </div>
    <div>{f('criteriaEntry', 'evidence')}</div>
  </div>
)

export default templates
