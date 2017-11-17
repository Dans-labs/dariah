import React from 'react'

import { makeRhAtts } from 'utils'
import { memoize } from 'memo'

const showEditTip = memoize((Content, type, dirty) => () =>
  <Content
    type={type}
    dirty={dirty}
  />
)

const showTip = memoize((Content, refreshName, refresh) => () => {
  const refreshAtt = { [refreshName]: refresh }
  return (
    <Content
      {...refreshAtt}
    />
  )
})

export const withEditHelp = (Component, TooltipContainer, TooltipContent, type, position) => props => {
  const {
    table, eId, input: { name },
    meta: { dirty },
  } = props
  const { rhAtt, rh } = makeRhAtts(table, eId, name, position)
  return [
    <TooltipContainer
      key={'RH'}
      showTip={showEditTip(TooltipContent, type, dirty)}
      att={rhAtt}
      refresh={dirty}
    />,
    <Component
      key={'I'}
      rh={rh}
      {...props}
    />,
  ]
}

export const withTooltip = (Component, TooltipContainer, TooltipContent, refreshName, position) => props => {
  const {
    table, eId, name,
    [refreshName]: refresh,
  } = props
  const { rhAtt, rh } = makeRhAtts(table, eId, name, position)
  return [
    <TooltipContainer
      key={'RH'}
      showTip={showTip(TooltipContent, refreshName, refresh)}
      att={rhAtt}
      refresh={refresh}
    />,
    <Component
      key={'I'}
      rh={rh}
      {...props}
    />,
  ]
}
