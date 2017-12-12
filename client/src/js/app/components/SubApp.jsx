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

const tableLinks = (me, { path, name, forWhom, details }) =>
	forMe(me.groupRep, forWhom) ? (
		<div key={path} className={'section'}>
			<NavLink to={path} className={'head'}>
				{name}
			</NavLink>
			<div className={'subsection'}>
				{(details || emptyA)
					.filter(({ forWhom: subFor }) => forMe(me.groupRep, subFor))
					.map(
						({ button, component, path: subPath, name: subName, hint, ppath }) =>
							component == null ? (
								<Tooltip key={subPath} tip={hint} at={'right'}>
									<NavLink to={`${ppath || path}/${subPath}`} className={button ? 'button large workflow info' : emptyS}>
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
		path: '/data/contrib',
		name: 'Contributions',
		forWhom: 'public',
		details: [
			{
				path: 'stats',
				name: 'Statistics',
				forWhom: 'public',
				hint: 'Various statistics of contributions',
        button: true,
			},
			{
				path: 'filter',
				name: 'All items (filtered)',
				forWhom: 'public',
				hint: 'Overview of all contributions',
			},
			{
				path: 'list',
				name: 'All items (list)',
				forWhom: 'public',
				hint: 'Overview of all contributions',
			},
			{
				path: 'mylist',
				name: 'My items',
				forWhom: 'auth',
				hint: 'My contribution',
			},
			{
				component: (
					<Insert key={'newcontrib'} table={'contrib'} thing={'contribution'} />
				),
				forWhom: 'auth',
				hint: 'Start here to add a contribution',
			},
		],
	},
	{
		path: '/data/assessment',
		name: 'Assessments',
		forWhom: 'auth',
		details: [
			{
				path: 'filter',
				name: 'All items',
				forWhom: 'auth',
				hint: 'overview of all assessments',
			},
			{
				path: 'mylist',
				name: 'My items',
				forWhom: 'auth',
				hint: 'Look here to see the status of your assessments',
			},
		],
	},
	{
		path: '/data/review',
		name: 'Reviews',
		forWhom: 'auth',
		details: [
			{
				path: 'filter',
				name: 'All items',
				forWhom: 'office',
				hint: 'overview of all reviews',
			},
			{
				path: 'myassign',
				name: 'My assignments',
				forWhom: 'auth',
				hint: 'my review assignments',
				ppath: '/data/assessment',
			},
			{
				path: 'mylist',
				name: 'My reviews',
				forWhom: 'auth',
				hint: 'my reviews',
			},
		],
	},
	{
		path: '/data/package',
		name: 'Packages',
		forWhom: 'office',
		details: [
			{
				path: 'filter',
				name: 'list',
				forWhom: 'office',
				hint: 'the setup of contribution types and criteria',
			},
			{
				path: 'grid',
				name: 'table',
				forWhom: 'office',
				hint: 'the setup of contribution types and criteria',
			},
		],
	},
	{
		path: '/data/typeContribution',
		name: 'Contribution types',
		forWhom: 'office',
		details: [
			{
				path: 'filter',
				name: 'list',
				forWhom: 'office',
				hint: 'overview of all contribution types',
			},
			{
				path: 'grid',
				name: 'table',
				forWhom: 'office',
				hint: 'overview of all contribution types',
			},
		],
	},
	{
		path: '/data/criteria',
		name: 'Criteria',
		forWhom: 'office',
		details: [
			{
				path: 'filter',
				name: 'list',
				forWhom: 'office',
				hint: 'overview of all criteria',
			},
			{
				path: 'grid',
				name: 'table',
				forWhom: 'office',
				hint: 'overview of all criteria',
			},
		],
	},
	{
		path: '/data/score',
		name: 'Scores',
		forWhom: 'office',
		details: [
			{
				path: 'filter',
				name: 'list',
				forWhom: 'office',
				hint: 'overview of all scores',
			},
			{
				path: 'grid',
				name: 'table',
				forWhom: 'office',
				hint: 'overview of all scores',
			},
		],
	},
	{
		path: '/data/user',
		name: 'Users',
		forWhom: 'office',
		details: [
			{
				path: 'filter',
				name: 'list',
				forWhom: 'office',
				hint: 'User management',
			},
			{
				path: 'grid',
				name: 'table',
				forWhom: 'office',
				hint: 'User management',
			},
		],
	},
	{
		path: '/data/country',
		name: 'Countries',
		forWhom: 'office',
		details: [
			{
				path: 'filter',
				name: 'list',
				forWhom: 'office',
				hint: 'Country membership management',
			},
			{
				path: 'grid',
				name: 'table',
				forWhom: 'office',
				hint: 'Country membership management',
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
