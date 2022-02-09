import React, { useEffect, useState }from 'react';
import DatePicker from 'react-datepicker';

export const DocumentDateTimePicker = ({ handleChange, dateId }) => {
	const [startDate, setStartDate] = useState(new Date());

	let handleColor = (time) => {
		return time.getHours() > 12 ? "text-success" : "text-error";
	};

	useEffect(() => {
		setTimeout(() => {
			handleChange(`${startDate.toISOString().substr(0, 16)}`, dateId)
		}, 1000)
	}, [])

	return (
		<DatePicker
			showTimeSelect
			selected={startDate}
			onChange={(date) => {
				setStartDate(date)
				handleChange(`${date.toISOString().substr(0, 16)}`, dateId)
			}}
			dateFormat="dd/MM/yyyy  p"
			timeClassName={handleColor}
		/>
		// <div></div>
	);
}