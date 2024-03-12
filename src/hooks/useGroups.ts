import axios from "axios"
import { useState, useEffect } from "react"
import { IGroup, IUser } from "../interfaces/interface"

const useGroups = () => {
	const [groups, setGroups] = useState<IGroup[]>([])
	const [filteredGroups, setFilteredGroups] = useState<IGroup[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const fetchData = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/groups`
			)
			setGroups(response.data)
			setFilteredGroups(response.data)
			setLoading(false)

		} catch (error) {
			console.error('Failed to fetch groups data', error)
			setError('Error fetching data: ' + error);
			setLoading(false)
		}
	};
	useEffect(() => {
		const delay = 1000;
		const timeout = setTimeout(fetchData, delay);
		return () => clearTimeout(timeout);
	}, []);

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

	return { loading, applyClosedFilter, applyColorFilter, hasFriends, filteredGroups, showFriends, error }
}

export default useGroups