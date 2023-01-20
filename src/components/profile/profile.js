import '../../App.css'
import './profile.css'
import React, { useState, useEffect } from 'react'
import { Card, Table } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
		(async () => {
			try {
				setLoading(true)
				const phoneNumber = '+14436796378'
				const body = JSON.stringify({ phoneNumber })
				console.log(body)
				const response = await fetch('http://localhost:3000/user/profile', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body,
				})
				const { data } = await response.json()
				console.log(data)
				setUser(data)
				const userId = data.userId
				dispatch({
					type: 'SET_ID',
					payload: userId,
				})
			} catch (err) {
				setError(err)
				setLoading(false)
				console.log(err)
			}
		})()
	}, [])

	useEffect(() => {
		(async () => {
			try {
				if (user.workouts) {
					const workoutIds = user.workouts
					const workoutPromises = workoutIds.map((workoutId) =>
						fetch(`http://localhost:3000/workout/${workoutId}`)
							.then(res => res.json())
					)
					const workoutData = (await Promise.all(workoutPromises)).map(({ data }) => data)
					// setWorkoutData(workoutData);
					console.log(workoutData)
					setLoading(false)
					setWorkoutData(workoutData)
				}
			} catch (err) {
				setError(err)
				setLoading(false)
				console.log(err)
			}
		})()
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
