import axios from 'axios'
import React, { useEffect, useState } from "react"
import { address } from '../data/data'

export const DepartmentChange = ({ id, department, setCloseDepModal, departments, users}) => {
	const [departmentName, setDepartmentName] = useState(department)
	const [principal, setPrincipal] = useState(null)
	
	useEffect(async () => {
		document.body.style.overflow = "hidden"
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
		const config = {
			method: 'get',
			url: `${address.use}/v1/api/employee-manager/departments/${id}`,
			headers: {
				'Authorization': localStorage.getItem("token")
			}
		}
		const { data } = await axios(config)
		setPrincipal(data)
	}, [])

	const handleChange = async () => {
		if (departmentName) {
			const departmentData = {
				"id": id,
				"department": departmentName.trim(),
			}
			
			if (principal && typeof principal !== "string") {
				departmentData.principal = {
					id: principal.id
				}
			} else if (principal && typeof principal === "string") {
				departmentData.principal = {
					id: principal
				}
			}


			const config = {
				method: 'post',
				url: `${address.use}/v1/api/employee-manager/department`,
				headers: {
					'Authorization': localStorage.getItem("token"),
					'Content-Type': 'application/json'
				},
				data: JSON.stringify(departmentData)
			}
			try {
				const { data } = await axios(config)
				document.location.reload()
			} catch (e) {
				alert(e)
			}
		} else {
			console.log("This department name is already exist")
		}
	}

	return (
		<div className='d-flex align-center justify-center' >
			<div className="employees-manager__department-change">
				<span onClick={() => {setCloseDepModal(false)
					document.body.style.overflow = "auto"
}}>X</span>
				<h4 className="employees-manager__title">Change department</h4>
				<div style={{marginBottom: "20px", flexDirection : "column"}} className="d-flex">
					<p>Principal</p>
					<select style={{width: "300px", height: "40px"}} onInput={(e) => {
						console.log(e.target.value)
						setPrincipal(e.target.value)
					}}>
						<option value={principal?.id}>{principal?.fullName}</option>
						{
							users?.filter(el => el.id != principal?.id).map((el,idx) => (
								<option value={el.id}>{el.fullName}</option>
							))
						}
					</select>
				</div>
				<div className="d-flex">
					<input onInput={(e) => setDepartmentName(e.target.value)} type="text" className={`employees-manager__inp`} placeholder={department}/>
					<button onClick={handleChange} className="employees-manager__create" >Change</button>
				</div>
				
			</div>
			<div className="employees-manager__overlay" onClick={() => {
				setCloseDepModal(false)
				document.body.style.overflow = "auto"
				}}/>
		</div>
	)
}