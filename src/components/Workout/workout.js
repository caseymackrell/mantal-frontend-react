import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Workout() {
	const id = useSelector(state => state.workoutId)
	const [workout, setWorkout] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		async function fetchData() {
			try {
				console.log(id)
				setIsLoading(true)
				const getResponse = await axios.get(`http://localhost:3000/workout/${id}`)
				console.log(getResponse)
				setWorkout(getResponse.data.data.workout.group)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		}
		fetchData()
	}, [id])
	console.log(workout)
	// console.log(workout[0].exercises[0].exerciseName)

	if (isLoading) {
		return <h1>Loading...</h1>
	} else {
		return (
			<div className='mainFormContainer'>
				<h1> {workout[0].exercises[0].exerciseName} </h1>
			</div>
		)
	}
}
export default Workout

