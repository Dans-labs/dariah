import { emptyA, emptyO } from 'utils'

export const makeDetails = ({ tables, table, eId }) => {
	const { [table]: { details, detailOrder } } = tables
	return (detailOrder || emptyA)
		.map(name => {
			const { table: detailTable, linkField, ...detailSpecs } = details[name]
			const { [detailTable]: detailTableData } = tables
			if (detailTableData == null) {
				return null
			}
			const {
				title: detailTitle,
				item: detailItem,
				perm: detailPerm,
				entities: detailEntities,
				allIds: detailAllIds,
				fieldSpecs: { [linkField]: { multiple } },
			} = detailTableData
			const detailListIds = multiple
				? detailAllIds.filter(_id =>
						(detailEntities[_id].values[linkField] || emptyA).includes(eId),
					)
				: detailAllIds.filter(
						_id => detailEntities[_id].values[linkField] === eId,
					)
			return {
				name,
				detailItem,
				detailTitle,
				detailTable,
				linkField,
				detailListIds,
				detailPerm,
				detailSpecs,
			}
		})
		.filter(x => x != null)
}

export const getMasterTable = (tables, table, linkField) => {
	let masterTable = null
	if (linkField != null) {
		const {
			[table]: {
				fieldSpecs: {
					[linkField]: { valType: { relTable } = emptyO } = emptyO,
				},
			},
		} = tables
		masterTable = relTable
		return masterTable
	}
}

export const makeKeepInfo = detailFragments => {
	const keep = {}
	for (const detailFragment of detailFragments) {
		const {
			detailSpecs: { cascade },
			detailTable,
			detailItem,
			detailListIds,
		} = detailFragment
		if (!cascade && detailListIds.length) {
			keep[detailTable] = `${detailItem[0]}(${detailListIds.length}x)`
		}
	}
	return keep
}
