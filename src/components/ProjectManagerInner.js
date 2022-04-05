import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { address } from './data/data';

export const ProjectManagerInner = () => {
	const [project, setProject] = useState("")
	const [projects, setProjects] = useState([])


	useEffect(() => {
		const config = {
			method: "get",
			url: `${address.use}/v1/api/project`,
			headers: {
				"Authorization": localStorage.getItem("token")
			}
		}

		axios(config)
			.then(({ data }) => {
				console.log(data)
				setProjects(data)
			})

	}, [])

	const handleCreate = () => {
		const config = {
			method: "post",
			url: `${address.use}/v1/api/project`,
			headers: {
				"Authorization": localStorage.getItem("token"),
				"Content-Type": "application/json"
			},
			data: JSON.stringify({ title: project })
		}
		axios(config)
			.then(({ data }) => {
				console.log(data)
				document.location.reload();
			})
	}


	return (
		<div className="project__inner">
			<div>
				<div className="related" style={{ marginBottom: "40px" }}>
					<div className="related__grid" style={{ gridTemplateColumns: "1fr 3fr 1fr 1fr" }}>
						<p className="related__title">Seq</p>
						<p className="related__title">Проект</p>
						<p className="related__title">No</p>
						<p className="related__title">Дата создания</p>
					</div>
					{
						projects.map((el, idx) => (
							<div className="related__grid" style={{ gridTemplateColumns: "1fr 3fr 1fr 1fr" }}>
								<p className="related__field">{++idx}</p>
								<p className="related__field">{el.title}</p>
								<p className="related__field">{el.id}</p>
								<p className="related__field">{el.dateCreated.replace("T", " ").substr(0, 16)}</p>
							</div>
						))
					}
				</div>
			</div>
			<div>
				<input type="text" className="project__new" onInput={(e) => setProject(e.target.value)} />
				<button className="project__add" onClick={handleCreate}>Добавить проект</button>
			</div>
		</div>
	)
}