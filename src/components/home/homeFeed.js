import '../../App.css'
import './homeFeed.css'
import React, { useState, useEffect } from 'react'
import { Card, Table } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function HomeFeed() {
	const [workouts, setWorkouts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

	// const workout = useSelector(state => state.currentWorkout)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleClick = (workoutId, index) => {
		console.log(`You clicked on workout with id ${workoutId}`)
		dispatch({
			type: 'SET_WORKOUT',
			payload: workoutId,
		})
		navigate('/workout')
	}

	const columns = [
		{
			title: <div className='title'>Username</div>,
			className: 'header',
			dataIndex: 'user',
			key: 'user',
			render: (user) => (
				<Card className='workoutCard'>
					<h3>{user?.username}</h3>
				</Card>
			),
		},
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
					<h3>{musclesTargeted}</h3>
				</Card>
			),
		},
		{
			title: 'Workout Level',
			dataIndex: 'workoutLevel',
			key: 'workoutLevel',
			render: (workoutLevel) => (
				<Card className='workoutCard'>
					<h3>{workoutLevel}</h3>
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
		async function fetchData() {
			try {
				setLoading(true)
				const token = localStorage.getItem('jwt')
				const headers = { Authorization: `Bearer ${token}` }
				const response = await fetch('http://localhost:3000/workout', { headers })
				const { data: { data } } = await response.json()
				console.log(data)
				setWorkouts(data)
				console.log(data[1]._id)
				setLoading(false)
			} catch (err) {
				setError(err)
				setLoading(false)
			}
		}
		fetchData()
	}, [currentPage, pageSize])

	if (loading) {
		return <div className='loadingPage'>Loading...</div>
	}

	if (error) {
		return <div>{error.message}</div>
	}

	const pagination = {
		current: currentPage,
		className: 'pag',
		pageSize: pageSize,
		total: workouts.length,
		onChange: (page, pageSize) => {
			setCurrentPage(page)
			setPageSize(pageSize)
		},
	}

	return (
		<div className='mainContainer'>
			<div className='tableContainer'>
				<Table
					className='table'
					rowClassName= 'table'
					dataSource={workouts}
					columns={columns}
					pagination={pagination}
					showHeader = {false}
				/>
			</div>
		</div>
	)
}

export default HomeFeed
