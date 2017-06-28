import React from 'react'
import { connect } from 'react-redux'

import { withParams, emptyA } from 'utils'
import { getMe } from 'me'

import NavLink from 'NavLink'

const tableLinks = (me, { path, name, own, details }) => !own || me.eppn
  ? <div key={path} className={'nav section'} >
      <NavLink to={path} className={'head'} >{name}</NavLink>
      <div className={'nav subsection'} >
        {
          (details || emptyA).filter(({ own: subOwn }) => !subOwn || me.eppn).map(
            ({ path: subPath, name: subName }) =>
              <NavLink key={subPath} to={`${path}/${subPath}`} >{subName}</NavLink>
           )
        }
      </div>
    </div>
  : null

const navBarItems = [
  {
    path: '/data/overview',
    name: 'Overview',
    own: true,
    details: [],
  },
  {
    path: '/data/contrib',
    name: 'Contributions',
    own: false,
    details: [
      { path: 'filter', name: 'All items', own: false },
      { path: 'mylist', name: 'My items', own: true },
    ],
  },
  {
    path: '/data/assessment',
    name: 'Assessments',
    own: true,
    details: [
      { path: 'filter', name: 'All items', own: false },
      { path: 'mylist', name: 'My items', own: true },
    ],
  },
  {
    path: '/data/package',
    name: 'Packages',
    own: true,
    details: [
      { path: 'filter', name: 'list', own: false },
      { path: 'grid', name: 'table', own: true },
    ],
  },
  {
    path: '/data/typeContribution',
    name: 'Contribution types',
    own: true,
    details: [
      { path: 'filter', name: 'list', own: false },
      { path: 'grid', name: 'table', own: true },
    ],
  },
  {
    path: '/data/criteria',
    name: 'Criteria',
    own: true,
    details: [
      { path: 'filter', name: 'list', own: false },
      { path: 'grid', name: 'table', own: true },
    ],
  },
  {
    path: '/data/score',
    name: 'Scores',
    own: true,
    details: [
      { path: 'filter', name: 'list', own: false },
      { path: 'grid', name: 'table', own: true },
    ],
  },
  {
    path: '/data/user',
    name: 'Users',
    own: true,
    details: [
      { path: 'filter', name: 'list', own: false },
      { path: 'grid', name: 'table', own: true },
    ],
  },
  {
    path: '/data/country',
    name: 'Countries',
    own: true,
    details: [
      { path: 'filter', name: 'list', own: false },
      { path: 'grid', name: 'table', own: true },
    ],
  },
  /*
  {
    path: '/data',
    name: 'All tables',
    own: false,
  },
  */
]

const SubApp = ({ me, table, routes, children }) => (
  <div className={'sub-app'} >
    <div className={'nav bar'} >
      {navBarItems.map(item => tableLinks(me, item))}
    </div>
    <div className={'details'} >
      {
        routes[1].path === 'data' && routes.length === 1
        ? <div>{'All tables'}</div>
        : routes[1].path === 'data' && routes.length === 2
          ? <div>
              <h3>{'Registry'}</h3>
              <p>{'Use the side bar to navigate to a section'}</p>
            </div>
            : routes[1].path === 'data' && routes.length === 3
              ? <div>
                  <h3>{'Registry'}</h3>
                  <h4>{`Table ${table}`}</h4>
                  <p>{'Use the side bar to navigate to a particular view on this table'}</p>
                </div>
              : null
      }
      { children }
    </div>
  </div>
)

export default connect(getMe)(withParams(SubApp))
