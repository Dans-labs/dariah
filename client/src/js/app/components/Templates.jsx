import React from 'react'

import { emptyS } from 'utils'
import { itemReadField, itemEditField } from 'fields'

import Expand, { ExpandHead, ExpandBody } from 'Expand'

const rField = (field, l, f) => itemReadField(field, l(field), f(field))
const eField = (field, l, fe, m) => itemEditField(field, l(field), fe(field), m(field))

export const mainTemplates = {
  assessment(l, v, e, f) {
    return (
      <div className={'grid fragments'}>
        {rField('title', l, f)}
        {rField('assessmentType', l, f)}
        {rField('contrib', l, f)}
        {rField('submitted', l, f)}
        {e('submitted') ? null : rField('reviewer1', l, f)}
        {e('submitted') ? null : rField('reviewer2', l, f)}
      </div>
    )
  },
}

export const mainEditTemplates = {
  assessment(l, v, e, f, fe, m, editButton) {
    return (
      <div>
        {editButton}
        <div className={'grid fragments'}>
          {eField('title', l, fe, m)}
          {eField('assessmentType', l, fe, m)}
          {eField('contrib', l, fe, m)}
          {eField('submitted', l, fe, m)}
          {e('submitted') ? null : eField('reviewer1', l, fe, m)}
          {e('submitted') ? null : eField('reviewer2', l, fe, m)}
        </div>
      </div>
    )
  },
}

export const relatedTemplates = {
  contrib: {
    assessment(l, v, e, f, linkMe) {
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

export const detailTemplates = {
  assessment: {
    contrib(l, v, e, f) {
      return mainTemplates['assessment'](l, v, e, f)
    },
  },
  criteriaEntry: {
    assessment(l, v, e, f) {
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
  criteriaEntry: {
    assessment(l, v, e, f, fe, m, editButton) {
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

export const consolidatedTemplates = {
  assessment: {
    trail(l, v) { // consolidated assessment within a trail record
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

