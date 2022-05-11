import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Img from "../../assets/images/men.png"
import { address } from '../data/data';
import { DocumentDatePicker } from '../documents/DocumentDatePicker';

export const TaskOpened = ({ close, task }) => {

	const handleChangeStatus = async (e) => {
		const status = e.target.value
		const config = {
			method: "post",
			headers: {
				"Authorization": localStorage.getItem("token")
			},
			url: `${address.use}/v1/api/task/step/${task.task.id}/${status}`
		}
		const { data } = await axios(config)
		document.location.reload();
	}

	const columnPicker = (num) => {
		switch (num) {
			case 1: return (
				<select onInput={handleChangeStatus}>
					<option value="1">TODO</option>
					<option value="2">In Process</option>
					<option value="3">On Check</option>
					<option value="4">DONE</option>
				</select>
			)
			case 2: return (
				<select onInput={handleChangeStatus}>
					<option value="2">In Process</option>
					<option value="1">TODO</option>
					<option value="3">On Check</option>
					<option value="4">DONE</option>
				</select>
			)
			case 3: return (
				<select onInput={handleChangeStatus}>
					<option value="3">On Check</option>
					<option value="1">TODO</option>
					<option value="2">In Process</option>
					<option value="4">DONE</option>
				</select>
			)
			case 4: return (
				<select onInput={handleChangeStatus}>
					<option value="4">In Process</option>
					<option value="1">TODO</option>
					<option value="2">On Check</option>
					<option value="3">DONE</option>
				</select>
			)
		}
	}

	const [users, setUsers] = useState([])
	const [newExec, setNewExec] = useState(0)
	const [title, setTitle] = useState(task.task.name)
	const [desc, setDesc] = useState(task.task.desc)
	const [deadline, setDeadline] = useState(task.task.deadline)
	const [comment, setComment] = useState("")
	const [comms, setComms] = useState([])
	const user = useSelector((store) => store?.userReducer?.user)

	useEffect(async () => {
		const config = {
			method: "get",
			headers: {
				"Authorization": localStorage.getItem("token")
			},
			url: `${address.use}/v1/api/task/exec/all/unused/${task.task.id}`
		}
		const { data } = await axios(config)
		setUsers(data)
		if (data.length)
			setNewExec(data[0].id)
	}, [])

	useEffect(async () => {
		const config = {
			method: "get",
			headers: {
				"Authorization": localStorage.getItem("token")
			},
			url: `${address.use}/v1/api/task/comment/${task.task.id}`
		}
		const { data } = await axios(config)
		setComms(data)
	}, [])

	const handleCheckExecutor = (e) => {
		setNewExec(e.target.value)
	}

	const handleAddExecutor = async () => {
		if (newExec !== 0) {
			const config = {
				method: "get",
				headers: {
					"Authorization": localStorage.getItem("token")
				},
				url: `${address.use}/v1/api/task/exec/user=${newExec}/task=${task.task.id}`
			}
			const { data } = await axios(config)
			document.location.reload();
		}
	}

	const handleDeleteExecutor = async (id) => {
		const config = {
			method: "post",
			headers: {
				"Authorization": localStorage.getItem("token")
			},
			url: `${address.use}/v1/api/task/exec/del/user=${id}/task=${task.task.id}`
		}
		const { data } = await axios(config)
		document.location.reload();
	}

	const handleChangePriority = async (e) => {
		if (e.target.value) {
			const config = {
				method: "post",
				headers: {
					"Authorization": localStorage.getItem("token")
				},
				url: `${address.use}/v1/api/task/${task.task.id}/${e.target.value}`
			}
			const { data } = await axios(config)
			document.location.reload();
		}
	}

	const colorPicker = (priority) => {
		if (priority == 1) {
			return "task-manager__top_dark"
		} else if (priority == 2) {
			return "task-manager__top_warn"
		} else {
			return "task-manager__top_green"
		}
	}

	const handleChangeDate = (e) => {
		setDeadline(e)
	}

	const handleSave = async () => {
		const config = {
			method: "post",
			headers: {
				"Authorization": localStorage.getItem("token")
			},
			url: `${address.use}/v1/api/task/change`,
			data: {
				"id": task.task.id,
				"name": title,
				"desc": desc,
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

	const handleDelete = async () => {
		const config = {
			method: "post",
			headers: {
				"Authorization": localStorage.getItem("token")
			},
			url: `${address.use}/v1/api/task/step/${task.task.id}/5`
		}
		const { data } = await axios(config)
		document.location.reload();
	}

	const handleCreateComment = async () => {
		const config = {
			method: "post",
			headers: {
				"Authorization": localStorage.getItem("token")
			},
			url: `${address.use}/v1/api/task/comment`,
			data: {
				"text": comment,
				"taskId": task.task.id
			}
		}
		const { data } = await axios(config)
		document.location.reload();
	}

	const handleDeleteComment = async (id) => {
		const config = {
			method: "get",
			headers: {
				"Authorization": localStorage.getItem("token")
			},
			url: `${address.use}/v1/api/task/comment/del/${id}`
		}
		const { data } = await axios(config)
		document.location.reload();
	}

	return (
		<div>
			<div className="task-manager__overlay" onClick={() => close({})}>
			</div>
			<div className="creator-task">
				<div className={`creator-task__top ${colorPicker(task.task.priority)}`} >
					<div className="d-flex">
						<p className="creator-task__text">Priority</p>
						<select className="creator-task__priority" onInput={handleChangePriority}>
							<option>Select</option>
							<option value="1">High</option>
							<option value="2">Medium</option>
							<option value="3">Low</option>
						</select>
					</div>
					<button className="creator-task__close" onClick={() => close({})}>X</button>
				</div>
				<div className="creator-task__content">
					<input id="creator-task__title" type="text" placeholder={`${task.task.name}`} onInput={(e) => setTitle(e.target.value)} />
					<p>Column: {columnPicker(task.task.status)}</p>
					<div className="creator-task__executors">
						<h4 style={{ marginBottom: "5px", fontSize: "18px" }}>Select executor:</h4>
						<div className="d-flex">
							<select className="creator-task__exec-choice" onInput={handleCheckExecutor}>
								{
									users.map(el => (
										<option value={el.id}>{el.fullName}</option>
									))
								}
							</select>
							<button className="creator-task__exec-btn" onClick={handleAddExecutor}>Add</button>
						</div>
					</div>
					<div className="d-flex" style={{ marginTop: "20px" }}>
						{
							task.executors.map(el => (
								<div style={{ width: "40px", marginLeft: "5px", position: "relative" }}>
									<div onClick={() => handleDeleteExecutor(el.user.id, el.user.fullName)} className="task-manager__x">x</div>
									<div className="task-manager__img">
										<img src={Img} alt="user" />
									</div>
									<p className='task-manager__name' style={{ width: "50px" }}>{el.user.login}</p>
								</div>
							))
						}
					</div>
					<h4 style={{ marginBottom: "5px", marginTop: "20px", fontSize: "18px" }}>Description:</h4>
					<textarea className="creator-task__textarea" name="text" value={desc} onInput={(e) => setDesc(e.target.value)}></textarea>
					<h4 style={{ marginBottom: "5px", fontSize: "18px", marginTop: "15px" }}>Select deadline:</h4>
					<DocumentDatePicker handleChange={handleChangeDate} dateId={`inp${task.task.id}`} startDate={deadline} />
					<div className="creator-task__comments">
						<h4 style={{ marginBottom: "5px", fontSize: "18px", marginTop: "15px" }}>Comments:</h4>
						<div className="creator-task__create d-flex">
							<div className="task-manager__img creator-task__img">
								<img src={Img} alt="user" />
							</div>
							<input 
								className="creator-task__inp" 
								type="text" 
								placeholder="write your comment here..."
								onInput={(e) => setComment(e.target.value)}
							/>
							<button className="creator-task__btn" onClick={handleCreateComment}>Save</button>
						</div>
						<div className="creator-task__commlist">
							{
								comms.map(el => (
									<div className="creator-task__comm d-flex" style={{ marginTop: "20px" }}>
										<div className="task-manager__img">
											<img src={Img} alt="user" />
										</div>
										<div style={{ marginLeft: "15px", width: "70%" }}>
											<h5 className="creator-task__user">{el.fullName} <span style={{ color: "#5e6c84;", fontWeight: "400", display: "inline-block" }}>{el.commentCreatedTime.replace("T", " ").slice(0, -10).split(" ").reverse().join(" ")} </span> {user.id === el.userId && <button className='creator-task__commdel' onClick={() => handleDeleteComment(el.id)}>Delete</button>}</h5>
											<p className="creator-task__commtext">{el.text}</p>
										</div>
									</div>
								))
							}
						</div>
					</div>
					<div style={{ textAlign: "center", marginTop: "15px" }}>
						<button className="creator-task__save" style={{ marginRight: "10px", background: "#b63434" }} onClick={handleDelete}>Delete</button>
						<button className="creator-task__save" onClick={handleSave}>Save</button>
					</div>
				</div>
			</div>
		</div>
	)
}