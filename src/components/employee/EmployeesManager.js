import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { address } from '../data/data';
import { DepartmentChange } from './DepartmentChange';

export const EmployeesManager = () => {

	const [departments, setDepartments] = useState([])
	const [depError, setDepError] = useState("")
	const [depInp, setDepInp] = useState("")
	const [closeDepModal, setCloseDepModal] = useState(false)
	const [depChange, setDepChange] = useState({})

	const [users, setUsers] = useState([])
	const [posts, setPosts] = useState([])

	const [newUser, setNewUser] = useState({"departmentId" : "1", "postId" : "1", "userRole" : "2"})

	useEffect(async () => {
		const config = {
			method: 'get',
			url: `${address.use}/v1/api/employee-manager/departments`,
			headers: {
				'Authorization': localStorage.getItem("token")
			}
		};
		try {
			const { data } = await axios(config)
			setDepartments(data)
		} catch (e) {
			console.log(e);
		}
	}, [])

	useEffect(async () => {
		const config = {
			method: 'get',
			url: `${address.use}/v1/api/employee-manager/users`,
			headers: {
				'Authorization': localStorage.getItem("token")
			}
		};
		try {
			const { data } = await axios(config)
			setUsers(data)
			console.log(data)
		} catch (e) {
			console.log(e);
		}
	}, [])

	useEffect(async () => {
		const config = {
			method: 'get',
			url: `${address.use}/v1/api/employee-manager/posts`,
			headers: {
				'Authorization': localStorage.getItem("token")
			}
		};
		try {
			const { data } = await axios(config)
			setPosts(data)
			console.log(data)
		} catch (e) {
			console.log(e);
		}
	}, [])

	const handleCreateDepartment = async () => {
		if (!departments.map((el) => el.department).includes(depInp) ) {
			const config = {
				method: 'post',
				url: `${address.use}/v1/api/employee-manager/department`,
				headers: {
					'Authorization': localStorage.getItem("token"),
					'Content-Type': 'application/json'
				},
				data : JSON.stringify({ 
					"department" : depInp.trim()
				})
			}
			try {
				const { data } = await axios(config)
				document.location.reload()
			} catch (e) {
				setDepError(e)
				setDepInp("")
			}
		} else {
			setDepError("This department is already exists")
			setDepInp("")
		} 
	}

	const handleDeleteDepartment = async (id) => {
		const config = {
			method: 'post',
			url: `${address.use}/v1/api/employee-manager/department/delete/${id}`,
			headers: {
				'Authorization': localStorage.getItem("token")
			}
		};
		try {
			const { data } = await axios(config)
			document.location.reload()
		} catch (e) {
			alert("First delete all employees at department")
			console.log(e);
		}
	}

	const handleRenameDepartment = (id, department) => {
		setCloseDepModal(true)
		setDepChange({id, department})
	}

	const handleDeleteUser = async (id) => {
		const config = {
			method: 'post',
			url: `${address.use}/v1/api/employee-manager/users/delete/${id}`,
			headers: {
				'Authorization': localStorage.getItem("token")
			}
		};
		try {
			const { data } = await axios(config)
			document.location.reload()
		} catch (e) {
			alert(e)
			console.log(e);
		}
	}

	const handleCreateUser = async () => {
		console.log(newUser)
		if (newUser.login && newUser.password && newUser.fullName) {
			const config = {
				method: 'post',
				url: `${address.use}/v1/api/employee-manager/users`,
				headers: {
					'Authorization': localStorage.getItem("token"),
					'Content-Type': 'application/json'
				},
				data: JSON.stringify(newUser)
			}
			try {
				const { data } = await axios(config)
				document.location.reload()
			} catch (e) {
				alert(e)
				setDepInp("")
			}
		} else {
			alert("Please enter employee login, password and full name")
		}
	}

	return (
		<div className="employees-manager">
			<div className="container">
				<table className="employees-manager__table">
					<caption>Departments</caption>
					<tr>
						<th>ID</th>
						<th>Department</th>
						<th>Date Created</th>
						<th>Date Updated</th>
						<th> </th>
					</tr>
					{
						departments?.map((el) => (
							<tr key={el.id}>
								<td>{el.id}</td>
								<td>{el.department}</td>
								<td>{el.dateCreated?.substr(0, 19).replace("T"," ")}</td>
								<td>{el.dateUpdated?.substr(0, 19).replace("T", " ")}</td>
								<td>{/*<button className="employees-manager__rename" onClick={() => handleRenameDepartment(el.id, el.department)}>Rename</button> */}<button onClick={() => handleDeleteDepartment(el.id)} className="employees-manager__delete">Delete</button></td>
							</tr>
						))
					}
				</table>
				<h4 className="employees-manager__title">Create new department</h4>
				<div className="d-flex">
					<input onInput={(e) => setDepInp(e.target.value)} value={depInp} type="text" className={`employees-manager__inp ${depError ? "employees-manager__inp_error" : ""}` } placeholder={depError} />
					<button onClick={handleCreateDepartment} className="employees-manager__create" >Create</button>
				</div>
				{closeDepModal && <DepartmentChange setCloseDepModal={setCloseDepModal} id={depChange.id} department={depChange.department} departments={departments}/>}

				<table className="employees-manager__table mt-10">
					<caption>Employees</caption>
					<tr>
						<th>ID</th>
						<th>Full Name</th>
						<th>Login</th>
						<th>Department</th>
						<th>Position</th>
						<th>Email</th>
						<th>User Role</th>
						<th> </th>
					</tr>
					{
						users?.map((el) => (
							<tr key={el.id}>
								<td>{el.id}</td>
								<td>{el.fullName}</td>
								<td>{el.login}</td>
								<td>{el?.department?.department}</td>
								<td>{el?.postId?.position}</td>
								<td>{el?.email}</td>
								<td>{el?.userRole.role.replace("ROLE_", "")}</td>
								<td>{/*<button className="employees-manager__rename" onClick={() => handleRenameDepartment(el.id, el.department)}>Rename</button> */}<button onClick={() => handleDeleteUser(el.id)} className="employees-manager__delete">Delete</button></td>
							</tr>
						))
					}
				</table>
				<h4 className="employees-manager__title">Create new employee</h4>
				<div className='d-flex align-center'>
					<div>
						<input type="text" className='employees-manager__user-inp' placeholder='login' 
							onInput={(e) => setNewUser({...newUser, "login" : e.target.value})}
						/>
						<input type="text" className='employees-manager__user-inp' placeholder='password'
							onInput={(e) => setNewUser({ ...newUser, "password": e.target.value })}
						/>
						<input type="text" className='employees-manager__user-inp' placeholder='full name'
							onInput={(e) => setNewUser({ ...newUser, "fullName": e.target.value })}
						/>
						<div className='employees-manager__selects'>
							<span className='employees-manager__label'>Department: </span>
							<select className="employees-manager__user-select" onInput={(e) => setNewUser({ ...newUser, "departmentId": e.target.value })}>
								{
									departments.map(el => (
										<option value={el.id}>{el.department}</option>
									))
								}
							</select>
							<span>Position: </span>
							<select className="employees-manager__user-select" onInput={(e) => setNewUser({ ...newUser, "postId": e.target.value })}>
								{
									posts.map(el => (
										<option value={el.id}>{el.position}</option>
									))
								}
							</select>
							<span>Role: </span>
							<select className="employees-manager__user-role" onInput={(e) => setNewUser({ ...newUser, "userRole": e.target.value })}>
								<option value={2}>USER</option>
								<option value={1}>ADMIN</option>
							</select>
						</div>
					</div>
					<button onClick={handleCreateUser} className="employees-manager__create" >Create</button>
				</div>
			</div>
		</div>
	)
}