import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Img from "../../assets/images/men.png"
import { address } from '../data/data';
import { DocumentDatePicker } from '../documents/DocumentDatePicker';

export const TaskOpenedDesc = ({ close, task }) => {

	const columnPicker = (num) => {
		switch (num) {
			case 1: return (
				<span>TODO</span>
			)
			case 2: return (
				<span>In Process</span>
			)
			case 3: return (
				<span>On Check</span>
			)
			case 4: return (
				<span>In Process</span>
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
		console.log(user)
		const config = {
			method: "get",
			headers: {
				"Authorization": localStorage.getItem("token")
			},
			url: `${address.use}/v1/api/task/exec/all/unused/${task.task.id}`
		}
		const { data } = await axios(config)
		console.log(data)
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

	const colorPicker = (priority) => {
		if (priority == 1) {
			return "task-manager__top_dark"
		} else if (priority == 2) {
			return "task-manager__top_warn"
		} else {
			return "task-manager__top_green"
		}
	}

	const handleNext = async () => {
		const config = {
			method: "post",
			headers: {
				"Authorization": localStorage.getItem("token")
			},
			url: `${address.use}/v1/api/task/next-step/${task.task.id}`
		}
		const { data } = await axios(config)
		document.location.reload();
	}

	const handlePriorityWriter = (num) => {
		switch (num) {
			case 1: return "high"
			case 2: return "medium"
			case 3: return "low"
		}
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
						<p className="creator-task__text">Priority {handlePriorityWriter(task.task.priority)}</p>
					</div>
					<button className="creator-task__close" onClick={() => close({})}>X</button>
				</div>
				<div className="creator-task__content">
					<h4 id="creator-task__title">{task.task.name}</h4>
					<p>Column: {columnPicker(task.task.status)}</p>
					<div className="creator-task__executors">
						<h4 style={{ marginBottom: "5px", fontSize: "18px" }}>Executors:</h4>
					</div>
					<div className="d-flex" style={{ marginTop: "20px" }}>
						{
							task.executors.map(el => (
								<div style={{ width: "40px", marginLeft: "5px", position: "relative" }}>
									<div className="task-manager__img">
										<img src={Img} alt="user" />
									</div>
									<p className='task-manager__name' style={{ width: "50px" }}>{el.user.login}</p>
								</div>
							))
						}
					</div>
					<h4 style={{ marginBottom: "5px", marginTop: "20px", fontSize: "18px" }}>Description:</h4>
					<textarea className="creator-task__textarea" name="text" value={desc}></textarea>
					<h4 style={{ marginBottom: "5px", fontSize: "18px", marginTop: "15px" }}>Deadline:</h4>
					<span>{deadline.split("T")[0]}</span>
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
						{(task.task.status !== 3 && task.task.status !== 4) && <button className="creator-task__save" onClick={handleNext}>Next</button>}
					</div>
				</div>
			</div>
		</div>
	)
}