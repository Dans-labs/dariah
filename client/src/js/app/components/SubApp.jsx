import React from 'react'
import { connect } from 'react-redux'

import { withParams, emptyA } from 'utils'
import { getMe } from 'me'

import ErrorBoundary from 'ErrorBoundary'
import NavLink from 'NavLink'

const tableLinks = (me, { path, name, own, details }) => !own || me.eppn
  ? <div key={path} className={'nav section'} >
      <NavLink to={path} className={'head'} >{name}</NavLink>
      <div className={'nav subsection'} >
        {
          (details || emptyA).filter(({ own: subOwn }) => !subOwn || me.eppn).map(
            ({ path: subPath, name: subName, hint }) =>
              <NavLink
                key={subPath}
                to={`${path}/${subPath}`}
                data-rh={hint}
                data-rh-at={'right'}
              >{subName}</NavLink>
           )
        }
      </div>
    </div>
  : null

const navBarItems = [
  {
    path: '/data/contrib',
    name: 'Contributions',
    own: false,
    details: [
      { path: 'filter', name: 'All items', own: false, hint: 'Overview of all contributions' },
      { path: 'mylist', name: 'My items', own: true, hint: 'Start here to add a contribution' },
    ],
  },
  {
    path: '/data/assessment',
    name: 'Assessments',
    own: true,
    details: [
      { path: 'filter', name: 'All items', own: false, hint: 'overview of all assessments' },
      { path: 'mylist', name: 'My items', own: true, hint: 'Look here to see the status of your assessments' },
    ],
  },
  {
    path: '/data/package',
    name: 'Packages',
    own: true,
    details: [
      { path: 'filter', name: 'list', own: false, hint: 'the setup of contribution types and criteria' },
      { path: 'grid', name: 'table', own: true, hint: 'the setup of contribution types and criteria' },
    ],
  },
  {
    path: '/data/typeContribution',
    name: 'Contribution types',
    own: true,
    details: [
      { path: 'filter', name: 'list', own: false, hint: 'overview of all contribution types' },
      { path: 'grid', name: 'table', own: true, hint: 'overview of all contribution types' },
    ],
  },
  {
    path: '/data/criteria',
    name: 'Criteria',
    own: true,
    details: [
      { path: 'filter', name: 'list', own: false, hint: 'overview of all criteria' },
      { path: 'grid', name: 'table', own: true, hint: 'overview of all criteria' },
    ],
  },
  {
    path: '/data/score',
    name: 'Scores',
    own: true,
    details: [
      { path: 'filter', name: 'list', own: false, hint: 'overview of all scores' },
      { path: 'grid', name: 'table', own: true, hint: 'overview of all scores' },
    ],
  },
  {
    path: '/data/user',
    name: 'Users',
    own: true,
    details: [
      { path: 'filter', name: 'list', own: false, hint: 'User management' },
      { path: 'grid', name: 'table', own: true, hint: 'User management' },
    ],
  },
  {
    path: '/data/country',
    name: 'Countries',
    own: true,
    details: [
      { path: 'filter', name: 'list', own: false, hint: 'Country membership management' },
      { path: 'grid', name: 'table', own: true, hint: 'Country membership management' },
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
      <ErrorBoundary>
        {navBarItems.map(item => tableLinks(me, item))}
      </ErrorBoundary>
    </div>
    <div className={'details'} >
      <ErrorBoundary>
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
      </ErrorBoundary>
      <ErrorBoundary>
        { children }
      </ErrorBoundary>
    </div>
  </div>
)

export default connect(getMe)(withParams(SubApp))
