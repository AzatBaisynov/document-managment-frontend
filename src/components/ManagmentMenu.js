import React from "react"
import { useSelector } from 'react-redux'

export const ManagmentMenu = () => {

	const id = useSelector(el => el.userReducer.user.id)

	return (
		<div className="manager">
			<div className="manager__row">
				<a href="/news" target="_blank">News manager</a>
			</div>
			<div className="manager__row">
				<a href="/projectmanager" target="_blank">Project manager</a>
			</div>
			{
				id !== 10 ? (
					<div>
						<div className="manager__row">
							<a href="/documentmanager" target="_blank">Document manager</a>
						</div>
						<div className="manager__row">
							<a href="/taskmanager" target="_blank">Task manager</a>
						</div>
						<div className="manager__row">
							<a href="/employeesmanager" target="_blank">Employees manager</a>
						</div>
					</div>
				) : ""
			}
		</div>
	)
}