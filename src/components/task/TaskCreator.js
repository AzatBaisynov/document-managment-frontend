import axios from 'axios'
import React, { useEffect, useState } from "react"
import { address } from '../data/data'
import { DocumentDatePicker } from '../documents/DocumentDatePicker'

export const TaskCreator = ({close}) => {

	const [exec, setExec] = useState([])
	const [picked, setPicked] = useState({})
	const [title, setTitle] = useState("")
	const [priority, setPriority] = useState(1)
	const [desc, setDesc] = useState("")
	const [deadline, setDeadline] = useState(new Date())



	useEffect(async () => {
		const config = {
			method: "get",
			headers: {
				"Authorization": localStorage.getItem("token")
			},
			url: `${address.use}/v1/api/task/users`
		}
		const { data } = await axios(config)
		setExec(data)
	}, [])

	const pickExecutor = (user, pick) => {
		if (pick) {
			setPicked({...picked, [user.id] : user})
		}	else {
			setPicked({...picked, [user.id] : null})
		}
	}

	const handleChangeDate = (e) => {
		setDeadline(e)
	}

	const handleSave = async () => {

		let arr = []

		for (let i = 0; i < Object.keys(picked).length; i++) {
			if (picked[Object.keys(picked)[i]]) {
				arr = [...arr, picked[Object.keys(picked)[i]]]
			}
		}

		const config = {
			method: "post",
			headers: {
				"Authorization": localStorage.getItem("token"),
				"Content-Type": "application/json"
			},
			url: `${address.use}/v1/api/task`,
			data: {
				"name": title,
				"status": 1,
				"desc": desc,
				"executors": arr.map(el => el.id),
				"priority": priority,
				"deadline": deadline.split("-").map(el => {
					if (el.length < 2) {
						return "0" + el
					}
					return el
				}).join("-").concat("T00:00")
			}
		}
		const { data } = await axios(config)
		document.location.reload();
	}

	return (
		<div>
			<div className="task-manager__overlay" onClick={() => close(false)}>
			</div>
			<div className="creator-task">
				<div className={`creator-task__top task-manager__top_dark`} >
					<div className="d-flex">
						<p className="creator-task__text">Priority</p>
						<select className="creator-task__priority" onInput={(e) => setPriority(e.target.value)}>
							<option value="1">High</option>
							<option value="2">Medium</option>
							<option value="3">Low</option>
						</select>
					</div>
					<button className="creator-task__close" onClick={() => close(false)}>X</button>
				</div>
				<div className="creator-task__content">
					<input id="creator-task__title" type="text" placeholder="Click here to change your title" onInput={(e) => setTitle(e.target.value)}/>
					<p>Column: TODO</p>
					<div className="creator-task__executors">
						<h4 style={{ marginBottom: "5px", fontSize: "18px" }}>Select executor:</h4>
						<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridRowGap: "10px"}}>
							{
								exec.map(el => (
									<div style={{ display: "flex", alignItems: "center" }} >
										<label style={{ marginRight: "10px" }}>{el.fullName}</label>
										<input type="checkbox" onChange={(e) => pickExecutor(el, e.target.checked)}/>
									</div>
								))
							}
						</div>
					</div>
					<h4 style={{ marginBottom: "5px", marginTop: "20px", fontSize: "18px" }}>Description:</h4>
					<textarea className="creator-task__textarea" name="text" onInput={(e) => setDesc(e.target.value)}></textarea>
					<h4 style={{ marginBottom: "5px", fontSize: "18px", marginTop: "15px" }}>Select deadline:</h4>
					<DocumentDatePicker handleChange={handleChangeDate} startDate={deadline} />
					<div style={{ textAlign: "center", marginTop: "15px" }}>
						<button className="creator-task__save" onClick={handleSave}>Save</button>
					</div>
				</div>
			</div>
		</div>
	)
}