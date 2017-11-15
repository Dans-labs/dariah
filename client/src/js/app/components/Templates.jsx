import React from 'react'

import { emptyS } from 'utils'
import { itemReadField, itemEditField } from 'fields'
import { assessmentScore } from 'workflow'

import Expand, { ExpandHead, ExpandBody } from 'Expand'

const rField = (field, l, f, key) => itemReadField(field, l(field), f(field), key)
const eField = (field, l, fe, m, key) => itemEditField(field, l(field), fe(field), m(field), key)

export const mainTemplates = {
  assessment({ l, f }) {
    return (
      <div>
        <div className={'grid fragments'}>
          {rField('title', l, f)}
          {rField('assessmentType', l, f)}
          {rField('contrib', l, f)}
        </div>
      </div>
    )
  },
}

export const mainEditTemplates = {
  assessment({ l, fe, m, editButton }) {
    return (
      <div>
        {editButton}
        <div className={'grid fragments'}>
          {eField('title', l, fe, m)}
          {eField('assessmentType', l, fe, m)}
          {eField('contrib', l, fe, m)}
        </div>
      </div>
    )
  },
}

export const mainActionTemplates = {
  assessment({ tables, l, e, v, fe, fs, m }) {
    const { overall, relevantScore, relevantMax, allMax, relevantN, allN } = assessmentScore(tables, v('_id'))
    const irrelevantN = allN - relevantN
    const isWithdrawn = !e('dateWithdrawn')
    const isSubmitted = !e('submitted')
    return (
      <div>
        <div className={'ass-score-box'}>
          <span
            className={'ass-score'}
            data-rh={'overall-score of this assessment'}
            data-rh-at={'right'}
          >{`${overall} %`}</span>
          <Expand
            alterSection={`assessment{v('_id')}`}
            alterTag={'score'}
            iconOpen={'calculator'}
            iconClose={'minus-circle'}
            titleOpen={'Show derivation'}
            titleClose={'Hide derivation'}
            headActive={emptyS}
            headLine={emptyS}
            full={
              <div className={'ass-score-deriv'}>
                <p>{`This contribution scores ${relevantScore} points.`}</p>
                <p>{`For this type of contribution there is a total of ${allMax} points,
                    divided over ${allN} criteria.`}</p>
                {
                  irrelevantN
                  ? <p>{`However,
                        ${irrelevantN} rule${irrelevantN == 1 ? ' is' : 's are'}
                        not applicable to this contribution,
                        which leaves the total amount to
                        ${relevantMax} points,
                        divided over ${relevantN} criteria.`}
                    </p>
                  : ''
                }
                <p>{`The total score is expressed as a percentage:
                    the fraction of ${relevantScore} scored points with respect to 
                    ${relevantMax} scorable points.`}
                </p>
              </div>
            }
          />
        </div>
        <div className={'grid fragments'}>
          {m('submitted') ? null : eField('submitted', l, fe, m)}
          {
            itemEditField(
              'submitted',
              'Submission',
              <span>
                {!isSubmitted && isWithdrawn ? `${l('dateWithdrawn')}: ${v('dateWithdrawn')}` : null}
                {isSubmitted ? `${l('dateSubmitted')}: ${v('dateSubmitted')}` : null}
                {
                  fs('submitted', e('submitted'), h =>
                    <span
                      className={'button-large invert'}
                      onClick={h}
                    >{`${e('submitted') ? 'Submit for' : 'Withdraw from'} review`}</span>
                  )
                }
              </span>,
              m('submitted'),
            )
          }
          {e('submitted') ? null : eField('reviewer1', l, fe, m)}
          {e('submitted') ? null : eField('reviewer2', l, fe, m)}
        </div>
      </div>
    )
  },
}

export const detailTemplates = {
  assessment: {
    contrib: mainTemplates['assessment'],
  },
  criteriaEntry: {
    assessment({ l, v, e, f }) {
      const statusClass = (e('evidence') || e('score')) ? 'incomplete' : 'complete'
      return (
        <div className={`criteriaEntryRead ${statusClass}`}>
          <div className={'criteriaEntry'}>
            <div>{v('seq')}</div>
            <Expand
              alterSection={`criteriaEntry${v('_id')}`}
              alterTag={l('remarks')}
              iconOpen={'info-circle'}
              iconClose={'minus-circle'}
              titleOpen={'Show criteria details'}
              titleClose={'Hide criteria details'}
              headActive={''}
              headLine={f('criteria')}
              full={<div className={'criteriaRemarks'}>{f('criteria', 'remarks')}</div>}
              className={'fat'}
            />
            <div className={'slim'}>{f('score')}</div>
            {
              e('evidence')
              ? <div className={'xSlim'}>
                  <span
                    data-rh={'No evidence yet'}
                    className={'slim fa fa-file-o tError'}
                  />
                </div>
              : <ExpandHead
                  alterSection={`criteriaEntry${v('_id')}`}
                  alterTag={l('evidence')}
                  initAlt={1}
                  iconOpen={'file-text'}
                  iconClose={'minus-square'}
                  titleOpen={'Show evidence'}
                  titleClose={'Hide evidence'}
                  headActive={''}
                  headLine={''}
                  className={'xSlim tGood'}
                />
            }
          </div>
          <ExpandBody
            alterSection={`criteriaEntry${v('_id')}`}
            alterTag={l('evidence')}
            initAlt={1}
            full={
              <div>
                <b>{l('evidence')}</b>
                {f('evidence')}
              </div>
            }
            className={'evidence'}
          />
        </div>
      )
    },
  },
}

export const detailEditTemplates = {
  assessment: {
    contrib: mainEditTemplates['assessment'],
  },
  criteriaEntry: {
    assessment({ l, v, e, f, fe, editButton }) {
      const statusClass = (e('evidence') || e('score')) ? 'incomplete' : 'complete'
      return (
        <div className={`criteriaEntryEdit ${statusClass}`}>
          <div key={'H'} className={'criteriaEntry'}>
            {editButton}
            {v('seq')}
            <div className={'fat'}>
              <div className={'fat'}>{f('criteria')}</div>
              <div className={'criteriaRemarks'}>{f('criteria', 'remarks')}</div>
            </div>
            <div className={'slim'}>{fe('score', { suppressTyping: true })}</div>
          </div>
          <p
            key={'E'}
            data-rh={'Give evidence'}
            data-rh-at={'bottom'}
          ><b>{l('evidence')}</b></p>
          {fe('evidence')}
        </div>
      )
    },
  },
}

export const detailActionTemplates = {
  assessment: {
    contrib: mainActionTemplates['assessment'],
  },
}

export const relatedTemplates = {
  contrib: {
    assessment({ v, e, f, linkMe }) {
      const cTitle = v('title')
      return (
        <div>
          <div>
            {
              e('urlContribution')
              ? cTitle
              : <a href={v('urlContribution')}>{cTitle}</a>
            }
          </div>
          <div>
            {v('vcc', null, ', ')}
            {' '}
            {v('country')}
            {' '}
            {v('year')}
            {' '}
            <a href={`mailto:${v('contactPersonEmail')}`}>
              {v('contactPersonName')}
            </a>
          </div>
          <Expand
            alterSection={`contribution_in_assessment{v('_id')}`}
            alterTag={'cost'}
            iconOpen={'info-circle'}
            iconClose={'minus-circle'}
            titleOpen={'Show contribution cost description'}
            titleClose={'Hide contribution cost description'}
            headActive={`Cost: ${e('costTotal') ? 'Not given' : v('costTotal')}`}
            headLine={emptyS}
            full={<div>{f('costDescription')}</div>}
          />
          <Expand
            alterSection={`contribution_in_assessment{v('_id')}`}
            alterTag={'description'}
            iconOpen={'info-circle'}
            iconClose={'minus-circle'}
            titleOpen={'Show contribution descriptions'}
            titleClose={'Hide contribution descriptions'}
            headActive={'Description fields'}
            headLine={
              e('urlAcademic')
              ? <a href={v('urlAcademic')}>{v('urlAcademic')}</a>
              : emptyS
            }
            full={
              <div>
                <div>{f('description')}</div>
                <div>
                  <div><b>{'Tadirah:'}</b></div>
                  <div><i>{'Objects'}</i>{' '}{f('tadirahObject')}</div>
                  <div><i>{'Activities'}</i>{' '}{f('tadirahActivity')}</div>
                  <div><i>{'Techniques'}</i>{' '}{f('tadirahTechnique')}</div>
                  <div><b>{'Disciplines:'}</b>{' '}{f('discipline')}</div>
                  <div><b>{'Keywords:'}</b>{' '}{f('keyword')}</div>
                </div>
              </div>
            }
          />
          <Expand
            alterSection={`contribution_in_assessment{v('_id')}`}
            alterTag={'provenance'}
            iconOpen={'info-circle'}
            iconClose={'minus-circle'}
            titleOpen={'Show contribution provenance'}
            titleClose={'Hide contribution provenance'}
            headActive={'Provenance'}
            headLine={emptyS}
            full={
              <div>
                <div>
                  {'Created '}
                  {f('dateCreated')}
                  {' by '}
                  {v('creator')}
                </div>
                <div>
                  <div><b>{'Modification history'}</b></div>
                  {
                    v('modified').map((mod, i) =>
                      <div key={i}>{mod}</div>
                    )
                  }
                </div>
              </div>
            }
          />
          <div>{<a href={linkMe}>{'To the contribution record'}</a>}</div>
          <div>{f('typeContribution')}</div>
        </div>
      )
    },
  },
}

export const consolidatedTemplates = {
  assessment: {
    trail({ v }) { // consolidated assessment within a trail record
      return (
        <div>
          <div>{v('title')}</div>
          <div>
            {v('vcc', ', ')}
            {' '}
            {v.year}
          </div>
        </div>
      )
    },
  },
}

