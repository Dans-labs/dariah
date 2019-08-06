import React from 'react'

import { emptyS, emptyA, emptyO } from 'utils'
import { decisions, processStatus, finalDecision } from 'workflow'

import Expand from 'Expand'
import ScoreBox from 'ScoreBox'

const templates = {
  head({ tables, v, w, me }) {
    return processStatus(
      w('reviewers'),
      w('reviews'),
      w('locked').on,
      w('frozen').on,
      { tables, v, w, me },
    )
  },
  mainAction({ tables, v, cons, w, fs, m }) {
    const decision = finalDecision(w('reviewers'), w('reviews'))
    const { dId } = decisions(tables.decision)
    const approved = decision === dId['good']
    const selected = v('selected')
    const frozen = w('frozen').on
    const frozenDesc = w('frozen').desc
    let resultApproved
    if (approved) {
      const scoreItems = (w('score') || emptyO).items || emptyA
      const score = scoreItems.length ? scoreItems[0] : emptyO
      resultApproved = (
        <>
          <ScoreBox score={score} />
          <div className={'label large workflow good'}>
            {`This contribution has been reviewed positively.`}
          </div>
        </>
      )
    }
    else {
      resultApproved = m('title') && w('locked').on && !frozen ? (
        <div className={'label large workflow info'}>
          {`This contribution is locked because it ${w('locked').desc}.`}
        </div>
      ) : null
    }
    const resultFrozen = frozen ? (
        <div className={'label large workflow info'}>
          {`This contribution is locked because ${frozenDesc}.`}
        </div>
    ) : null
    const consolidatedCopies = cons.map(consRecord => {
      const { consolidated, selected, contrib, _id } = consRecord
      const kind = selected ? 'good' : 'error'
      return (
        <div
          key={_id}
          className={`label large workflow ${kind}`}
        >
          {
            m('title') ? (
              <a
                target={'_blank'}
                href={`/cons/${contrib}/${_id}`}
              >
                {`consolidated: ${consolidated}.`}
              </a>
            ) : `consolidated: ${consolidated}.`
          }
        </div>
      )
    })
    const consolidate = cons.length ? consolidatedCopies : (
      m('title') ? (
        <>
          {
            fs('selected', v('selected'), h => (
              <span
                className={'button large workflow info'}
                onClick={h}
              >
                  {'consolidate now'}
              </span>
            ))
          }
        </>
      ) : null
    )
    const decideYes = (
      <>
        {
          fs('selected', true, h => (
            <span
              className={'button large workflow good'}
              onClick={h}
            >
                {'Decide to select this contribution'}
            </span>
          ))
        }
      </>
    )
    const decideNo = (
      <>
        {
          fs('selected', false, h => (
            <span
              className={'button large workflow error'}
              onClick={h}
            >
                {'Decide not to select this contribution'}
            </span>
          ))
        }
      </>
    )
    const unDecide = (
      <>
        {
          fs('selected', null, h => (
            <span
              className={'button large workflow info'}
              onClick={h}
            >
                {'Undecide to (de)select this contribution'}
            </span>
          ))
        }
      </>
    )
    const resultSelected = (selected == null) ? (
      <>
        <div className={'label large workflow info'}>
          {`No selection decision taken by National Coordinator`}
        </div>
        <div>
            {decideYes}
            {decideNo}
        </div>
      </>
    ) : selected ? (
      <>
        {resultFrozen}
        <div className={'label large workflow good'}>
          {`Selected by National Coordinator`}
        </div>
        <div>
            {decideNo}
            {unDecide}
        </div>
      </>
    ) : (
      <>
        {resultFrozen}
        <div className={'label large workflow error'}>
          {`Rejected by National Coordinator`}
        </div>
        <div>
            {decideYes}
            {unDecide}
        </div>
      </>
    )
    return (
        <>
            {resultApproved}
            {resultSelected}
            {consolidate}
        </>
    )
  },
  related: {
    assessment({ v, e, s, f, linkMe }) {
      const cTitle = s('title')
      return (
        <>
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
            full={<>{f('costDescription')}</>}
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
              <>
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
              </>
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
              <>
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
              </>
            }
          />
          <div>{<a href={linkMe}>{'To the contribution record'}</a>}</div>
          <div>{f('typeContribution')}</div>
        </>
      )
    },
  },
}

export default templates
