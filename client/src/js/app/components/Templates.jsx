import React from 'react'

import { emptyS } from 'utils'
import { itemReadField, itemEditField } from 'fields'
import { assessmentScore } from 'workflow'

import Expand, { ExpandHead, ExpandBody } from 'Expand'
import Tooltip from 'Tooltip'

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
  contrib({ w }) {
    return (
      <div>
        {
          w('locked')
          ? <div className={'label large workflow info'} >
              {`This contribution is locked because it is ${w('lockedReason')}.`}
            </div>
          : null
        }
      </div>
    )
  },
  assessment({ tables, l, e, v, w, fe, fs, m }) {
    const { overall, relevantScore, relevantMax, allMax, relevantN, allN } = assessmentScore(tables, v('_id'))
    const irrelevantN = allN - relevantN
    const isWithdrawn = !e('dateWithdrawn')
    const isSubmitted = !e('submitted')
    return (
      <div>
        <div className={'ass-score-box'}>
          <Tooltip
            tip={'overall-score of this assessment'}
            at={'right'}
          >
            <span
              className={'ass-score'}
            >{`${overall} %`}</span>
          </Tooltip>
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
                  : emptyS
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
                  (w('incomplete') || w('stalled'))
                  ? null
                  : fs('submitted', e('submitted'), h =>
                      <span
                        className={`button large workflow ${e('submitted') ? 'info' : 'warning'}`}
                        onClick={h}
                      >{`${e('submitted') ? 'Submit for' : 'Withdraw from'} review`}</span>
                    )
                }
              </span>,
              m('submitted'),
            )
          }
          {e('submitted') ? null : eField('reviewerE', l, fe, m)}
          {e('submitted') ? null : eField('reviewerF', l, fe, m)}
        </div>
        {
          w('stalled')
          ? <div className={'label large workflow error'} >
            {`This contribution is cannot be submitted because: ${w('stalledReason')}.
              Either change the type of the contribution to the type of this assessment,
              or start a new assessment, copy over the relevant material form this
              assessment (by hand), and remove this assessment.
            `}
            </div>
          : null
        }
        {
          w('incomplete')
          ? <div className={'label large workflow warning'} >
            {`This contribution cannot yet be submitted because: ${w('incompleteReason')}.
            `}
            </div>
          : <div className={'label large workflow good'} >
            {`All criteria assessed: this contribution can be submitted.
            `}
            </div>
        }
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
              headActive={emptyS}
              headLine={f('criteria')}
              full={<div className={'criteriaRemarks'}>{f('criteria', 'remarks')}</div>}
              className={'fat'}
            />
            <div className={'slim'}>{f('score')}</div>
            {
              e('evidence')
              ? <div className={'xSlim'}>
                  <Tooltip
                    tip={'No evidence yet'}
                    at={'top'}
                  >
                    <span
                      className={'slim fa fa-file-o tError'}
                    />
                  </Tooltip>
                </div>
              : <ExpandHead
                  alterSection={`criteriaEntry${v('_id')}`}
                  alterTag={l('evidence')}
                  initAlt={1}
                  iconOpen={'file-text'}
                  iconClose={'minus-square'}
                  titleOpen={'Show evidence'}
                  titleClose={'Hide evidence'}
                  headActive={emptyS}
                  headLine={emptyS}
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
          ><b>{l('evidence')}</b></p>
          <Tooltip
            tip={'Give evidence'}
            at={'top'}
          >
            {fe('evidence')}
          </Tooltip>
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

export const insertTemplates = {
  assessment: {
    contrib({ n, onInsert }) {
      return n == 0
      ? <span
          className={`button large workflow info`}
          onClick={onInsert}
        >{`Write a self-assessment`}</span>
      : <Tooltip
          tip={
            <div>
              <p>{'Normally a contribution needs just one self-assessment.'}</p>
              <p>{'Only add an other one in the following cases'}</p>
              <ul>
                <li>{'The previous self-assessment has become obsolete'}</li>
                <li>
                  {`The previous self-assessment is based on a contribution type,
                      but the contribution in question has been assigned another type.`
                  }
                </li>
              </ul>
              <p>
                <b>
                  {`In the last case, it is recommended to copy and paste the relevant parts
                    of the old assessment into the new one and delete the old one.`
                  }
                </b>
              </p>
            </div>
          }
          at={'top'}
        >
          <span
            className={`button large workflow warning`}
            onClick={onInsert}
          >
            {`Add another self-assessment`}
            <span className={'fa fa-exclamation'} />
          </span>
        </Tooltip>
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

