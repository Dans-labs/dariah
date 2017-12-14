import React, { Fragment } from 'react'

import { emptyS, emptyA, emptyO } from 'utils'

import Expand from 'Expand'
import ScoreBox from 'ScoreBox'

const templates = {
  mainAction({ tables, w, m }) {
    let approved = false
    const { items: reviewers = emptyA } = w('reviewers') || emptyO
    const { items: reviews = emptyA } = w('reviews') || emptyO
    if (reviewers.length && reviews.length) {
      const reviewerSet = new Set(reviewers.map(x => x.reviewerF))
      const { decision: { entities: dEntities = emptyO } = emptyO } = tables
      const decisions = {}
      Object.entries(dEntities).forEach(
        ([dId, { values: { rep } = emptyO }]) => {
          decisions[rep] = dId
        },
      )
      const dAccept = decisions['accept']
      reviews.forEach(({ creator, decision }) => {
        if (reviewerSet.has(creator) && decision === dAccept) {
          approved = true
        }
      })
    }
    let result
    if (approved) {
      const scoreItems = (w('score') || emptyO).items || emptyA
      const score = scoreItems.length ? scoreItems[0] : emptyO
      result = (
        <Fragment>
          <ScoreBox score={score} />
          <div className={'label large workflow good'}>
            {`This contribution has been approved by DARIAH.`}
          </div>
        </Fragment>
      )
    }
    return approved ? (
      result
    ) : m('title') && w('locked').on ? (
      <div className={'label large workflow info'}>
        {`This contribution is locked because it is ${w('locked').desc}.`}
      </div>
    ) : null
  },
  related: {
    assessment({ v, e, s, f, linkMe }) {
      const cTitle = s('title')
      return (
        <Fragment>
          <div>
            {e('urlContribution') ? (
              cTitle
            ) : (
              <a href={s('urlContribution')}>{cTitle}</a>
            )}
          </div>
          <div>
            {s('vcc', null, ', ')} {s('country')} {s('year')}{' '}
            <a href={`mailto:${s('contactPersonEmail')}`}>
              {s('contactPersonName')}
            </a>
          </div>
          <Expand
            alterSection={`contribution_in_assessment${v('_id')}`}
            alterTag={'cost'}
            iconOpen={'info-circle'}
            iconClose={'minus-circle'}
            titleOpen={'Show contribution cost description'}
            titleClose={'Hide contribution cost description'}
            headActive={`Cost: ${
              e('costTotal') ? 'Not given' : s('costTotal')
            }`}
            headLine={emptyS}
            full={<Fragment>{f('costDescription')}</Fragment>}
          />
          <Expand
            alterSection={`contribution_in_assessment${v('_id')}`}
            alterTag={'description'}
            iconOpen={'info-circle'}
            iconClose={'minus-circle'}
            titleOpen={'Show contribution descriptions'}
            titleClose={'Hide contribution descriptions'}
            headActive={'Description fields'}
            headLine={
              e('urlAcademic') ? (
                <a href={s('urlAcademic')}>{s('urlAcademic')}</a>
              ) : (
                emptyS
              )
            }
            full={
              <Fragment>
                <div>{f('description')}</div>
                <div>
                  <div>
                    <b>{'Tadirah:'}</b>
                  </div>
                  <div>
                    <i>{'Objects'}</i> {f('tadirahObject')}
                  </div>
                  <div>
                    <i>{'Activities'}</i> {f('tadirahActivity')}
                  </div>
                  <div>
                    <i>{'Techniques'}</i> {f('tadirahTechnique')}
                  </div>
                  <div>
                    <b>{'Disciplines:'}</b> {f('discipline')}
                  </div>
                  <div>
                    <b>{'Keywords:'}</b> {f('keyword')}
                  </div>
                </div>
              </Fragment>
            }
          />
          <Expand
            alterSection={`contribution_in_assessment${v('_id')}`}
            alterTag={'provenance'}
            iconOpen={'info-circle'}
            iconClose={'minus-circle'}
            titleOpen={'Show contribution provenance'}
            titleClose={'Hide contribution provenance'}
            headActive={'Provenance'}
            headLine={emptyS}
            full={
              <Fragment>
                <div>
                  {'Created '}
                  {f('dateCreated')}
                  {' by '}
                  {s('creator')}
                </div>
                <div>
                  <div>
                    <b>{'Modification history'}</b>
                  </div>
                  {(v('modified') || emptyA).map((mod, i) => (
                    <div key={i}>{mod}</div>
                  ))}
                </div>
              </Fragment>
            }
          />
          <div>{<a href={linkMe}>{'To the contribution record'}</a>}</div>
          <div>{f('typeContribution')}</div>
        </Fragment>
      )
    },
  },
}

export default templates
