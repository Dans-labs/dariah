import React, { Fragment } from 'react'

import { emptyS } from 'utils'

import Expand, { ExpandHead, ExpandBody } from 'Expand'
import Tooltip from 'Tooltip'

const templates = {
  editMode: {
    assessment(e) {
      return (e('score') || e('evidence')) ? 1 : 0
    },
  },
  detail: {
    assessment({ l, v, e, f }) {
      const statusClass = (e('evidence') || e('score')) ? 'incomplete' : 'complete'
      return (
        <div className={`criteria entryRead ${statusClass}`}>
          <div className={'criteria entry'}>
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
              full={<div className={'criteria comments'}>{f('criteria', 'remarks')}</div>}
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
              <Fragment>
                <b>{l('evidence')}</b>
                {f('evidence')}
              </Fragment>
            }
            className={'comments'}
          />
        </div>
      )
    },
  },
  detailEdit: {
    assessment({ l, v, e, f, fe, editButton }) {
      const statusClass = (e('evidence') || e('score')) ? 'incomplete' : 'complete'
      return (
        <div className={`criteria entryEdit ${statusClass}`}>
          <div className={'criteria entry'}>
            {editButton}
            {v('seq')}
            <div className={'fat'}>
              <div className={'fat'}>{f('criteria')}</div>
              <div className={'criteria comments'}>{f('criteria', 'remarks')}</div>
            </div>
            <div className={'slim'}>{fe('score', { suppressTyping: true })}</div>
          </div>
          <p><b>{l('evidence')}</b></p>
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

export default templates
