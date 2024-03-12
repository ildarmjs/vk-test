import axios from "axios"
import { useState, useEffect } from "react"
import { IGroup, IUser } from "../interfaces/interface"

const useGroups = () => {
	const [groups, setGroups] = useState<IGroup[]>([])
	const [filteredGroups, setFilteredGroups] = useState<IGroup[]>([])
	const [loading, setLoading] = useState(true)
	// const fetchData = async () => {
	// 	try {
	// 		// setLoading(true)
	// 		const response: AxiosResponse<IGetGroupsResponse> = await axios.get <IGetGroupsResponse>(
	// 			'https://633ab4c7e02b9b64c6155e2f.mockapi.io/groups'
	// 		)
	// 		setGroups(response?.data?.data || IGroup)
	// 		setFilteredGroups(response.data)
	// 		setLoading(false)
	// 		// if (response.status === 200 && response.data.result === 1 && response.data.data) {
	// 		// 	setGroups(response.data.data || [])
	// 		// 	setFilteredGroups(response.data.data)
	// 		// 	setLoading(false)
	// 		// } else {
	// 		// 	console.error('Failed to fetch groups data')
	// 		// }
	// 	} catch (error) {
	// 		console.error('Failed to fetch groups data', error)
	// 		setLoading(false)
	// 	}
	// };
	// useEffect(() => {
	// 	const delay = 1000;
	// 	const timeout = setTimeout(fetchData, delay);
	// 	return () => clearTimeout(timeout);
	// }, []);

	useEffect(() => {
		setTimeout(() => {
			axios
				.get('https://633ab4c7e02b9b64c6155e2f.mockapi.io/groups')
				// .get('http://localhost:3000/groups')
				.then(response => {
					setGroups(response.data)
					setFilteredGroups(response.data)
					// if (response.data && response.data.result === 1) {
					// 	setGroups(response.data.data)
					// 	setFilteredGroups(response.data?.data || [])
					// } else {
					// 	throw new Error('No valid data returned')
					// }
					setLoading(false)
				})
				.catch(error => {
					console.error('Error fetching data:', error)
					setLoading(false)
				})
		}, 1000) // Имитация задержки в 1 секунду
	}, [])

	const hasFriends = (friendsCount: boolean) => {
		let filtered = groups
		if (friendsCount) {
			filtered = filtered.filter(
				group => group.friends && group.friends.length > 0
			)
		}
		setFilteredGroups(filtered)
	}

	const applyColorFilter = (color: string) => {
		if (color === 'all') {
			setFilteredGroups(groups) // Если выбран цвет "все", показываем все группы
		} else {
			const filteredByColor = groups.filter(
				group => group.avatar_color === color
			)
			setFilteredGroups(filteredByColor)
		}
	}
	const applyClosedFilter = (value: string) => {
		if (value === 'all') {
			setFilteredGroups(groups)
		}
		if (value === 'open') {
			const filteredByClosed = groups.filter(group => group.closed === true)
			setFilteredGroups(filteredByClosed)
		}
		if (value === 'closed') {
			const filteredByClosed = groups.filter(group => group.closed === false)
			setFilteredGroups(filteredByClosed)
		}
	}
	const showFriends = (friends: IUser[] | undefined) => {
		alert(
			`Friends: ${friends
				?.map(friend => `${friend.first_name} ${friend.last_name}`)
				.join(', ')}`
		)
	}

	return { loading, applyClosedFilter, applyColorFilter, hasFriends, filteredGroups, showFriends, }
}

export default useGroups