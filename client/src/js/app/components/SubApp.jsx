import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { withParams, emptyA, emptyS } from 'utils'
import { getMe } from 'me'

import ErrorBoundary from 'ErrorBoundary'
import NavLink from 'NavLink'
import Insert from 'Insert'
import Tooltip from 'Tooltip'

const levels = {
  public: 1,
  auth: 2,
  office: 3,
  system: 4,
  root: 5,
}

const forMe = (my, item) => levels[my] >= levels[item]

const tableLinks = (me, { name, forWhom, details }) =>
  forMe(me.groupRep, forWhom) ? (
    <div key={name} className={'section'}>
      <div className={'head'}>{name}</div>
      <div className={'subsection'}>
        {(details || emptyA)
          .filter(({ forWhom: subFor }) => forMe(me.groupRep, subFor))
          .map(
            ({ button, component, path, name: subName, hint }) =>
              component == null ? (
                <Tooltip key={path} tip={hint} at={'right'}>
                  <NavLink
                    to={path}
                    className={button ? 'button large workflow info' : emptyS}
                  >
                    {subName}
                  </NavLink>
                </Tooltip>
              ) : (
                component
              ),
          )}
      </div>
    </div>
  ) : null

const navBarItems = [
  {
    name: 'Contribution overview',
    forWhom: 'public',
    details: [
      {
        path: '/data/contrib/stats',
        name: 'Statistics',
        forWhom: 'public',
        hint: 'Various statistics of contributions',
        button: true,
      },
      {
        path: '/data/contrib/filter',
        name: 'All items (filtered)',
        forWhom: 'public',
        hint: 'Overview of all contributions',
        button: true,
      },
      {
        path: '/data/contrib/list',
        name: 'All items (list)',
        forWhom: 'public',
        hint: 'Overview of all contributions, without the filters',
      },
    ],
  },
  {
    name: 'Writing contributions',
    forWhom: 'auth',
    details: [
      {
        component: (
          <Insert key={'newcontrib'} table={'contrib'} thing={'contribution'} />
        ),
        forWhom: 'auth',
        hint: 'Start here to add a contribution',
      },
      {
        path: '/data/contrib/mylist',
        name: 'My items',
        forWhom: 'auth',
        hint: 'My contributions',
        button: true,
      },
    ],
  },
  {
    name: 'Self-Assessments',
    forWhom: 'auth',
    details: [
      {
        path: '/data/assessment/mylist',
        name: 'My items',
        forWhom: 'auth',
        hint: 'Look here to see the status of your self-assessments',
        button: true,
      },
    ],
  },
  {
    name: 'Reviewing',
    forWhom: 'auth',
    details: [
      {
        path: '/data/assessment/myassign',
        name: 'My assignments',
        forWhom: 'auth',
        hint: 'my review assignments',
        button: true,
      },
      {
        path: '/data/review/mylist',
        name: 'My reviews',
        forWhom: 'auth',
        hint: 'my reviews',
        button: true,
      },
    ],
  },
  {
    name: 'Workflow setup',
    forWhom: 'office',
    details: [
      {
        path: '/data/package/list',
        name: 'Packages',
        forWhom: 'office',
        hint: 'the setup of contribution types and criteria',
        button: true,
      },
      {
        path: '/data/typeContribution/list',
        name: 'Contribution types',
        forWhom: 'office',
        hint: 'overview of all contribution types',
        button: true,
      },
      {
        path: '/data/criteria/filter',
        name: 'Criteria',
        forWhom: 'office',
        hint: 'overview of all criteria',
        button: true,
      },
      {
        path: '/data/country/list',
        name: 'Countries',
        forWhom: 'office',
        hint: 'Country membership management',
        button: true,
      },
      {
        path: '/data/vcc/list',
        name: 'VCCs',
        forWhom: 'office',
        hint: 'Virtual Competence Centers',
        button: true,
      },
      {
        path: '/data/score/filter',
        name: 'Score values',
        forWhom: 'office',
        hint: 'overview of all scores',
      },
      {
        path: '/data/decision/list',
        name: 'Decisions (review)',
        forWhom: 'office',
        hint: 'overview of all review decision options',
      },
      {
        path: '/data/year/list',
        name: 'Years',
        forWhom: 'office',
        hint: 'Years',
      },
      {
        path: '/data/tadirahActivity/filter',
        name: 'TADIRAH Activities',
        forWhom: 'office',
        hint: 'Values for "tadirahActivity"',
      },
      {
        path: '/data/tadirahObject/filter',
        name: 'TADIRAH Objects',
        forWhom: 'office',
        hint: 'Values for "tadirahObject"',
      },
      {
        path: '/data/tadirahTechnique/filter',
        name: 'TADIRAH Techniques',
        forWhom: 'office',
        hint: 'Values for "tadirahTechnique"',
      },
      {
        path: '/data/discipline/filter',
        name: 'Disciplines',
        forWhom: 'office',
        hint: 'Values for "discipline"',
      },
      {
        path: '/data/keyword/filter',
        name: 'Keywords',
        forWhom: 'office',
        hint: 'Values for "keyword"',
      },
    ],
  },
  {
    name: 'Workflow (under-water)',
    forWhom: 'office',
    details: [
      {
        path: '/data/assessment/filter',
        name: 'Self assessments',
        forWhom: 'office',
        hint: 'overview of all self-assessments',
        button: true,
      },
      {
        path: '/data/criteriaEntry/grid',
        name: 'Criteria entries',
        forWhom: 'office',
        hint: 'assessment entries per criterion',
      },
      {
        path: '/data/review/filter',
        name: 'Reviews',
        forWhom: 'office',
        hint: 'overview of all reviews',
        button: true,
      },
      {
        path: '/data/reviewEntry/grid',
        name: 'Review entries',
        forWhom: 'office',
        hint: 'review entries per criterion',
      },
    ],
  },
  {
    name: 'User management',
    forWhom: 'office',
    details: [
      {
        path: '/data/user/filter',
        name: 'Users',
        forWhom: 'office',
        hint: 'Users in a list',
        button: true,
      },
      {
        path: '/data/user/grid',
        name: 'Table view',
        forWhom: 'office',
        hint: 'Users in a grid',
      },
    ],
  },
  {
    name: 'System management',
    forWhom: 'system',
    details: [
      {
        path: '/data/permissionGroup/list',
        name: 'Permission groups',
        forWhom: 'system',
        hint: 'User permission groups',
        button: true,
      },
    ],
  },
]

const SubApp = ({ me, table, routes, children }) => (
  <div className={'sub-app'}>
    <div className={'subnavbar'}>
      <ErrorBoundary>
        {navBarItems.map(item => tableLinks(me, item))}
      </ErrorBoundary>
    </div>
    <div className={'submaterial'}>
      <ErrorBoundary>
        {routes[1].path === 'data' && routes.length === 1 ? (
          'All tables'
        ) : routes[1].path === 'data' && routes.length === 2 ? (
          <Fragment>
            <h3>{'Registry'}</h3>
            <p>{'Use the side bar to navigate to a section'}</p>
          </Fragment>
        ) : routes[1].path === 'data' && routes.length === 3 ? (
          <Fragment>
            <h3>{'Registry'}</h3>
            <h4>{`Table ${table}`}</h4>
            <p>
              {
                'Use the side bar to navigate to a particular view on this table'
              }
            </p>
          </Fragment>
        ) : null}
      </ErrorBoundary>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  </div>
)

export default connect(getMe)(withParams(SubApp))
