import React from 'react';
import { ManagmentMenu } from './ManagmentMenu';
import { Menu } from './Menu';

export const Managment = () => {

	const managment_action = [
		{
			action_link: "/",
			action_text: "Application navigation",
			action: ManagmentMenu
		}
	]

	return (
		<div className="managment">
			<div className="container managment__container">
				<Menu actions={managment_action} minh={"280px"} scroll={false} />
			</div>
		</div>
	)
}