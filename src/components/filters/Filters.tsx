import { FC } from 'react'

interface IFilters {
	applyClosedFilter: (e: string) => void
	applyColorFilter: (e: string) => void
	hasFriends: (e: boolean) => void
}

const Filters: FC<IFilters> = ({
	applyClosedFilter,
	applyColorFilter,
	hasFriends
}) => {
	return (
		<div>
			<label>
				Privacy
				<select onChange={(e: any) => applyClosedFilter(e.target.value)}>
					<option value='all'>All</option>
					<option value='open'>Open</option>
					<option value='closed'>Closed</option>
				</select>
			</label>
			<label>
				Avatar color
				<select onChange={e => applyColorFilter(e.target.value)}>
					<option value='all'>All</option>
					<option value='red'>Red</option>
					<option value='blue'>Blue</option>
					<option value='green'>Green</option>
					<option value='yellow'>Yellow</option>
					<option value='purple'>Purple</option>
					<option value='orange'>Orange</option>
				</select>
			</label>
			<label>
				<input type='checkbox' onChange={e => hasFriends(e.target.checked)} />
				Has Friends
			</label>
		</div>
	)
}

export default Filters
