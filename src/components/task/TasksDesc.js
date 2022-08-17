import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Img from "../../assets/images/men.png"
import { address } from '../data/data';
import { TaskCreator } from './TaskCreator';
import { TaskOpened } from './TaskOpened';
import { TaskOpenedDesc } from './TaskOpenedDesc';

export const TaskDesc = () => {

	const [todo, setTodo] = useState([])
	const [inProcess, setInProcess] = useState([])
	const [onCheck, setOnCheck] = useState([])
	const [done, setDone] = useState([])
	const [taskCreate, setTaskCreate] = useState(false)
	const [task, setTask] = useState({})

	useEffect(async () => {
		const config = {
			method: "get",
			headers: {
				"Authorization": localStorage.getItem("token")
			},
			url: `${address.use}/v1/api/task/mine`
		}
		const { data } = await axios(config)
		console.log(data)

		setTodo(data.filter(el => el.task.status === 1))
		setInProcess(data.filter(el => el.task.status === 2))
		setOnCheck(data.filter(el => el.task.status === 3))
		setDone(data.filter(el => el.task.status === 4))

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

	const readTask = async (id) => {
		const config = {
			method: "post",
			headers: {
				"Authorization": localStorage.getItem("token")
			},
			url: `${address.use}/v1/api/task/notifications/task/${id}`
		}
		try {
			const { data } = await axios(config)
			console.log("read")
		}
		catch (e) {
			console.log("couldn't read")
		}

	}

	return (
		<section className="task-manager">
			<div className="container">
				<div className="task-manager__header">
					<h2>Task manager</h2>
				</div>
				<div className="task-manager__flex">
					<div className="task-manager__column">
						<h4 className="task-manager__title">TODO</h4>
						{
							todo.map(el => (
								<div className="task-manager__card" onClick={() => {
									setTask(el)
									readTask(el.task.id)
									}}>
									<div className={`task-manager__top ${colorPicker(el.task.priority)}`} />
									<div className="task-manager__bottom">
										<p>{el.task.name}</p>
										<div className="task-manager__flex-end">
											{
												el.executors.filter((el, idx) => idx < 3).map(el => (
													<div style={{ width: "40px", marginLeft: "5px" }}>
														<div className="task-manager__img">
															<img src={Img} alt="user" />
														</div>
														<p className='task-manager__name'>{el.user.login}</p>
													</div>
												))
											}
										</div>
									</div>
								</div>
							))
						}
					</div>

					<div className="task-manager__column">
						<h4 className="task-manager__title">In Process</h4>
						{
							inProcess.map(el => (
								<div className="task-manager__card" onClick={() => {
									setTask(el)

									}}>
									<div className={`task-manager__top ${colorPicker(el.task.priority)}`} />
									<div className="task-manager__bottom">
										<p>{el.task.name}</p>
										<div className="task-manager__flex-end">
											{
												el.executors.filter((el, idx) => idx < 3).map(el => (
													<div style={{ width: "40px", marginLeft: "5px" }}>
														<div className="task-manager__img">
															<img src={Img} alt="user" />
														</div>
														<p className='task-manager__name'>{el.user.login}</p>
													</div>
												))
											}
										</div>
									</div>
								</div>
							))
						}
					</div>

					<div className="task-manager__column">
						<h4 className="task-manager__title">On Check</h4>
						{
							onCheck.map(el => (
								<div className="task-manager__card" onClick={() => setTask(el)}>
									<div className={`task-manager__top ${colorPicker(el.task.priority)}`} />
									<div className="task-manager__bottom">
										<p>{el.task.name}</p>
										<div className="task-manager__flex-end">
											{
												el.executors.filter((el, idx) => idx < 3).map(el => (
													<div style={{ width: "40px", marginLeft: "5px" }}>
														<div className="task-manager__img">
															<img src={Img} alt="user" />
														</div>
														<p className='task-manager__name'>{el.user.login}</p>
													</div>
												))
											}
										</div>
									</div>
								</div>
							))
						}
					</div>

					<div className="task-manager__column">
						<h4 className="task-manager__title">DONE</h4>
						{
							done.map(el => (
								<div className="task-manager__card" onClick={() => setTask(el)}>
									<div className={`task-manager__top ${colorPicker(el.task.priority)}`} />
									<div className="task-manager__bottom">
										<p>{el.task.name}</p>
										<div className="task-manager__flex-end">
											{
												el.executors.filter((el, idx) => idx < 3).map(el => (
													<div style={{ width: "40px", marginLeft: "5px" }}>
														<div className="task-manager__img">
															<img src={Img} alt="user" />
														</div>
														<p className='task-manager__name'>{el.user.login}</p>
													</div>
												))
											}
										</div>
									</div>
								</div>
							))
						}

					</div>
				</div>
			</div>
			{
				taskCreate && <TaskCreator close={setTaskCreate} />
			}
			{
				task?.task?.id && <TaskOpenedDesc close={setTask} task={task} />
			}
		</section>
	)
}