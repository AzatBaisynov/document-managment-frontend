// import React, { useState } from "react";
// import DatePicker from 'react-date-picker';


// export const DocumentDatePicker = ({handleChange, dateId}) => {
// 	const [startDate, setStartDate] = useState(new Date());

// 	return (
// 		<DatePicker locale="en" selected={startDate} onChange={(e) => {
// 			console.dir(e)
// 			console.log()
// 			// handleChange(e, dateId)
// 		}} wrapperClassName="datePicker" dateFormat="dd/MM/yyyy"/>
// 	);
// };

import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const DocumentDatePicker = ({ handleChange, dateId }) => {
	const [startdate, setStartdate] = useState(new Date());

	return (
		<DatePicker locale="en" dateFormat="dd / MM / yyyy" selected={startdate} onChange={(date) => {
			handleChange(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`, dateId)
			setStartdate(date)
		}}/>
	);
};