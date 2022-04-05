import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { address } from './data/data'
import { Menu } from './Menu'
import { ProjectManagerInner } from './ProjectManagerInner'

export const ProjectManager = () => {

	

	
	const managment_action = [
		{
			action_link: "/",
			action_text: "Управление проектами",
			action: ProjectManagerInner
		}
	]

	return (
		<div className="project">
			<div className="container">
				<Menu actions={managment_action} minh={"450px"} scroll={true} />
			</div>
		</div>
	)
}