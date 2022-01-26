import React from "react"

export const ManagmentMenu = () => {
	return (
		<div className="manager">
			<div className="manager__row">
				<h4>Cultural managment</h4>
				<a href="/news" target="_blank">News manager</a>
			</div>
			<div className="manager__row">
				<h4>Project managment</h4>
				<a href="/projectmanager" target="_blank">Project manager</a>
			</div>
			<div className="manager__row">
				<h4>Project managment</h4>
				<a href="/documentmanager" target="_blank">Document manager</a>
			</div>
		</div>
	)
}