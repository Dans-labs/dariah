import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, NavLink } from 'react-router-dom'

import { injectProps, emptyA, emptyS } from 'utils'
import { getMe } from 'me'
import { ALLIDS, MYIDS } from 'tables'
import WorkflowInfo from 'WorkflowInfo'
import ListContainer from 'ListContainer'

import ErrorBoundary from 'ErrorBoundary'
import Insert from 'Insert'
import Tooltip from 'Tooltip'

const levels = {
  public: 1,
  auth: 2,
  coord: 3,
  office: 4,
  system: 5,
  root: 6,
  nobody: 7,
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
            ({ forWhom, button, component, cName, path, name: subName, hint, ...atts }) =>
            <Tooltip
              key={component == null ? path : cName}
              tip={hint}
              at={'right'}
            >
                {
                  component == null ? (
                      <NavLink
                        to={path}
                        className={button ? 'button large workflow info' : emptyS}
                        activeClassName={'active'}
                        {...atts}
                      >
                        {subName}
                      </NavLink>
                  ) : (
                    component
                  )
                }
              </Tooltip>
          )}
      </div>
    </div>
  ) : null

const navBarItems = [
  {
    name: 'Our country',
    forWhom: 'auth',
    details: [
      {
        path: '/info/ourcountry',
        name: 'Our contributions',
        forWhom: 'auth',
        hint: 'Contributions coming from our country',
        button: true,
        target: '_self',
      },
    ],
  },
  {
    name: 'Contribution overview',
    forWhom: 'public',
    details: [
      {
        path: '/info/ourcountry',
        name: 'By country',
        forWhom: 'public',
        hint: 'Contributions per country',
        button: true,
        target: '_self',
      },
      {
        path: '/data/contrib/stats',
        name: 'Statistics',
        forWhom: 'public',
        hint: 'Various statistics of contributions',
        button: true,
      },
      {
        path: '/data/contrib/filter',
        name: 'Map of contributions (faceted search)',
        forWhom: 'public',
        hint: 'Overview of all contributions',
        button: true,
      },
      {
        path: '/data/contrib/list',
        name: 'Contributions (plain list)',
        forWhom: 'public',
        hint: 'Overview of all contributions, without the filters',
        button: true,
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
        cName: Insert.displayName,
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
      {
        path: '/data/assessment/list',
        name: 'Assign reviewers',
        forWhom: 'office',
        hint: 'Assign reviewers to self-assessments',
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
    name: 'Items',
    forWhom: 'public',
    details: [
      {
        path: '/data/package/list',
        name: 'Packages',
        forWhom: 'office',
        hint: 'the setup of contribution types and criteria',
        button: true,
      },
      {
        path: '/data/typeContribution/grid',
        name: 'Contribution types',
        forWhom: 'public',
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
        path: '/data/country/grid',
        name: 'Countries',
        forWhom: 'public',
        hint: 'Country membership management',
        button: true,
      },
      {
        path: '/data/vcc/grid',
        name: 'VCCs',
        forWhom: 'public',
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
        forWhom: 'public',
        hint: 'Years',
        button: true,
      },
      {
        path: '/data/tadirahActivity/filter',
        name: 'TADIRAH Activities',
        forWhom: 'public',
        hint: 'Values for "tadirahActivity"',
        button: true,
      },
      {
        path: '/data/tadirahObject/filter',
        name: 'TADIRAH Objects',
        forWhom: 'public',
        hint: 'Values for "tadirahObject"',
        button: true,
      },
      {
        path: '/data/tadirahTechnique/filter',
        name: 'TADIRAH Techniques',
        forWhom: 'public',
        hint: 'Values for "tadirahTechnique"',
        button: true,
      },
      {
        path: '/data/discipline/filter',
        name: 'Disciplines',
        forWhom: 'public',
        hint: 'Values for "discipline"',
        button: true,
      },
      {
        path: '/data/keyword/filter',
        name: 'Keywords',
        forWhom: 'public',
        hint: 'Values for "keyword"',
        button: true,
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
      {
        path: '/data/workflow',
        name: 'Workflow management',
        forWhom: 'system',
        hint: 'Manage the workflow information for all tables',
        button: true,
      },
    ],
  },
]

const SubApp = ({ me }) => (
  <div className={'sub-app'}>
    <div className={'subnavbar'}>
      <ErrorBoundary>
        {navBarItems.map(item => tableLinks(me, item))}
      </ErrorBoundary>
    </div>
    <div className={'submaterial'}>
      <ErrorBoundary>
        <Switch>
          <Route path={'/data/workflow'} component={WorkflowInfo} />
          <Route
            path={'/data/:table/mylist/:eId?'}
            render={injectProps(ListContainer, { select: MYIDS, mode: 'list' })}
          />
          <Route
            path={'/data/:table/myassign/:eId?'}
            render={injectProps(ListContainer, { select: MYIDS, mode: 'list', extra: true })}
          />
          <Route
            path={'/data/:table/list/:eId?'}
            render={injectProps(ListContainer, { select: ALLIDS, mode: 'list' })}
          />
          <Route
            path={'/data/:table/grid/:eId?'}
            render={injectProps(ListContainer, { select: ALLIDS, mode: 'grid' })}
          />
          <Route
            path={'/data/:table/filter/:eId?'}
            render={injectProps(ListContainer, { select: ALLIDS, mode: 'list', filtered: true })}
          />
          <Route
            path={'/data/:table/stats'}
            render={injectProps(ListContainer, { select: ALLIDS, mode: 'stats', filtered: false })}
          />
        </Switch>
      </ErrorBoundary>
    </div>
  </div>
)

export default connect(getMe)(SubApp)
