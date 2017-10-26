import React from 'react'

import { emptyS, emptyO } from 'utils'

import { repr } from 'tables'

import Expand, { ExpandHead, ExpandBody } from 'Expand'
import FieldRead from 'FieldRead'

const relatedTemplates = {
  contrib: {
    assessment(v, e, f, linkMe) {
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

const detailTemplates = {
  criteriaEntry: {
    assessment(v, e, f) {
      return (
        <div>
          <div className={'criteriaEntry'}>
            <Expand
              alterSection={`criteriaEntry${v('_id')}`}
              alterTag={'remarks'}
              iconOpen={'info-circle'}
              iconClose={'minus-circle'}
              titleOpen={'Show criteria details'}
              titleClose={'Hide criteria details'}
              headActive={v('seq')}
              headLine={f('criteria')}
              full={<div className={'criteriaRemarks'}>{f('criteria', 'remarks')}</div>}
              className={'fat'}
            />
            <div className={'slim'}>{f('score')}</div>
            {
              e('evidence')
              ? <div className={'xSlim'}>
                  <span
                    title={'No evidence yet'}
                    className={'slim fa fa-file-o tError'}
                  />
                </div>
              : <ExpandHead
                  alterSection={`criteriaEntry${v('_id')}`}
                  alterTag={'evidence'}
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
          {
            e('evidence')
            ? null
            : <ExpandBody
                alterSection={`criteriaEntry${v('_id')}`}
                alterTag={'evidence'}
                iconOpen={'file-text'}
                iconClose={'minus-square'}
                titleOpen={'Show evidence'}
                titleClose={'Hide evidence'}
                full={f('evidence')}
                className={'evidence'}
              />
          }
        </div>
      )
    },
  },
}


const consolidatedTemplates = {
  assessment: {
    trail(v) { // consolidated assessment within a trail record
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

const detailEdit = {
  criteriaEntry: {
    assessment(e) {
      return (e('score') || e('evidence')) ? 1 : 0
    },
  },
}

const relatedEdit = {}

const switchTemplateKind = {
  detail: detailTemplates,
  related: relatedTemplates,
  consolidated: consolidatedTemplates,
}

const switchEditKind = {
  detail: detailEdit,
  related: relatedEdit,
}

export const applyTemplate = (settings, tables, table, kind, otherTable, values, linkMe) => {
  const { [kind]: templates } = switchTemplateKind
  const { [table]: { [otherTable]: template } = emptyO } = templates
  if (template == null) {return null}

  const isConsolidated = kind === 'consolidated'
  const { [table]: { fieldSpecs } } = tables

  const e = field => {
    const { [field]: value } = values
    const { [field]: { multiple } } = fieldSpecs
    return value == null || value == emptyS || (multiple && value.length == 0)
  }
  const vConsolidated = (field, sep) => {
    const { [field]: value } = values
    const { [field]: { multiple } } = fieldSpecs
    const useSep = sep == null ? ' ' : sep
    return multiple
    ? value.join(useSep)
    : value
  }
  const vLive = (field, relField, sep, relSep) => {
    const { [field]: value } = values
    const { [field]: { valType, multiple } = emptyO } = fieldSpecs
    return repr(tables, table, valType, multiple, relField, value, settings, sep, relSep)
  }
  const v = isConsolidated ? vConsolidated : vLive

  const f = isConsolidated
  ? null
  : (field, relField) =>
      <FieldRead
        settings={settings}
        tables={tables}
        table={table}
        field={field}
        relField={relField}
        myValues={values[field]}
      />
  return template(v, e, f, linkMe)
}

export const editMode = (tables, table, kind, otherTable) => values => {
  const { [kind]: tests } = switchEditKind
  const { [table]: { [otherTable]: test } = emptyO } = tests
  if (test == null) {return 0}

  const { [table]: { fieldSpecs } } = tables

  const e = field => {
    const { [field]: value } = values
    const { [field]: { multiple } } = fieldSpecs
    return value == null || value == emptyS || (multiple && value.length == 0)
  }
  return test(e)
}
