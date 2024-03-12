import { FC, memo } from 'react'
import { IGroup } from '../../../interfaces/interface'
import useGroups from '../../../hooks/useGroups'

interface IItemGroup {
	group: IGroup
}

const InitialItemGroup: FC<IItemGroup> = ({ group }) => {
	const { showFriends } = useGroups()

	return (
		<div key={group.id}>
			<h3>{group.name}</h3>
			<div
				style={{
					width: '100px',
					height: '100px',
					border: '2px solid #000',
					borderRadius: '50%',
					backgroundColor: group.avatar_color
				}}
			></div>
			{group.privacy && <p>Privacy: {group.privacy}</p>}
			{group.subscribers && <p>Subscribers: {group.subscribers}</p>}
			{group.friends && group.friends.length > 0 ? (
				<button onClick={() => showFriends(group.friends)}>
					Посмотреть друзей
				</button>
			) : (
				<button disabled>Нет друзей</button>
			)}
		</div>
	)
}

// export default ItemGroup

export const ItemGroup = memo(InitialItemGroup)
