import Filters from './components/filters/Filters'
import Groups from './components/groups/Groups'
import useGroups from './hooks/useGroups'

function App() {
	const {
		applyClosedFilter,
		applyColorFilter,
		filteredGroups,
		hasFriends,
		loading
		// error
	} = useGroups()

	if (loading) {
		return <div>Loading...</div>
	}
	// if (error) {
	// 	return <div>{error}</div>
	// }
	return (
		<div>
			<Filters
				applyClosedFilter={applyClosedFilter}
				applyColorFilter={applyColorFilter}
				hasFriends={hasFriends}
			/>
			<Groups filteredGroups={filteredGroups} />
		</div>
	)
}

export default App
