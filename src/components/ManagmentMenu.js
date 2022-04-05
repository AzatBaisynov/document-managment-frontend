import React from "react"
import { useSelector } from 'react-redux'

export const ManagmentMenu = () => {

	const id = useSelector(el => el.userReducer.user.id)

	return (
		<div className="manager">
			<div className="manager__row">
				<a href="/news" target="_blank">Управление новостями</a>
			</div>
			<div className="manager__row">
				<a href="/projectmanager" target="_blank">Управление проектами</a>
			</div>
			{
				id !== 10 ? (<div className="manager__row">
				<a href="/documentmanager" target="_blank">Управление документами</a>
			</div>	) : ""
			}
		</div>
	)
}