import '../../App.css'
import './profile.css'
import React, { useState, useEffect } from 'react'
import { Card, Table } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Profile() {
	const [user, setUser] = useState({})
	const [workoutData, setWorkoutData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	// const phoneNumber = useSelector(state => state.phoneNumber)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const columns = [
		{
			title: 'Workout Name',
			dataIndex: 'workoutName',
			key: 'workoutName',
			render: (workoutName) => (
				<Card className='workoutCard'>
					<h3>{workoutName}</h3>
				</Card>
			),
		},
		{
			title: 'Workout Description',
			dataIndex: 'musclesTargeted',
			key: 'musclesTargeted',
			render: (musclesTargeted) => (
				<Card className='workoutCard'>
					<p>{musclesTargeted}</p>
				</Card>
			),
		},
		{
			title: 'Workout Level',
			dataIndex: 'workoutLevel',
			key: 'workoutLevel',
			render: (workoutLevel) => (
				<Card className='workoutCard'>
					<p>{workoutLevel}</p>
				</Card>
			),
		},
		{
			title: <div className='title'>Username</div>,
			className: 'header',
			dataIndex: 'user',
			key: 'user',
			render: (username, record) => (
				<Card className='workoutCard' onClick={() => handleClick(record._id)}>
					<h3>View Workout</h3>
				</Card>
			),
		},

	]

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				setLoading(true)
				const token = localStorage.getItem('jwt')
				const headers = {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				}
				const phoneNumber = '+14436796378'
				const body = JSON.stringify({ phoneNumber })
				const response = await axios.post('http://localhost:3000/user/profile', body, {
					headers,
				})
				const { data } = response.data
				setUser(data)
				const userId = data._id
				dispatch({
					type: 'SET_ID',
					payload: userId,
				})
			} catch (err) {
				setError(err)
				setLoading(false)
				console.log(err)
			}
		}
		fetchUserProfile()
	}, [])

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				if (user.workouts) {
					const workoutIds = user.workouts
					const promises = workoutIds.map(async (workoutId) => {
						const token = localStorage.getItem('jwt')
						const headers = { Authorization: `Bearer ${token}` }
						const response = await axios.get(
							`http://localhost:3000/workout/${workoutId}`,
							{ headers }
						)
						return response.data
					})
					const workoutData = (await Promise.all(promises)).map(({ data }) => data)
					setWorkoutData(workoutData)
					setLoading(false)
				}
			} catch (err) {
				setError(err)
				setLoading(false)
				console.log(err)
			}
		}
		fetchWorkouts()
	}, [user])
	const handleClick = (workoutId, index) => {
		console.log(`You clicked on workout with id ${workoutId}`)
		dispatch({
			type: 'SET_WORKOUT',
			payload: workoutId,
		})
		navigate('/workout')
	}

	if (loading) {
		return <div className='loadingPage'>Loading...</div>
	}

	if (error) {
		return <div>{error.message}</div>
	}

	return (
		<>
			<div className='mainContainer'>
				<div className='username'>
					<h1 className='userName'>@{user?.username}</h1>
				</div>
				<div className='line'><br/></div>
				<div className='workoutContainer'>
					<Table
						className='tableProfile'
						rowClassName= 'table'
						dataSource={workoutData}
						columns={columns}
						pagination={{ pageSize: 8, className: 'my-pagination' }}
						showHeader={false}
					/>
				</div>
			</div>

		</>
	)
}

export default Profile
