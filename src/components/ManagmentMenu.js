import React from "react"
import { useSelector } from 'react-redux'

export const ManagmentMenu = () => {

	const id = useSelector(el => el.userReducer.user.id)

	return (
		<div className="manager">
			<div className="manager__row">
				<h4>Cultural management</h4>
				<a href="/news" target="_blank">News manager</a>
			</div>
			<div className="manager__row">
				<h4>Project management</h4>
				<a href="/projectmanager" target="_blank">Project manager</a>
			</div>
			{
				id !== 10 ? (<div className="manager__row">
				<h4>Document management</h4>
				<a href="/documentmanager" target="_blank">Document manager</a>
			</div>	) : ""
			}
		</div>
	)
}