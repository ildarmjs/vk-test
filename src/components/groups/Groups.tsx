import { FC } from 'react'
import { IGroup } from '../../interfaces/interface'
import { ItemGroup } from './item-group/ItemGroup'

interface IGroups {
	filteredGroups: IGroup[]
}

const Groups: FC<IGroups> = ({ filteredGroups }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: 30
			}}
		>
			{filteredGroups.map(group => (
				<ItemGroup group={group} key={group.id} />
			))}
		</div>
	)
}

export default Groups
