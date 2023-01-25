/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './workout.css'

function Workout() {
	const id = useSelector(state => state.workoutId)
	const [workout, setWorkout] = useState([{}])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		async function fetchData() {
			try {
				console.log(id)
				setIsLoading(true)
				const getResponse = await axios.get(`http://localhost:3000/workout/${id}`)
				console.log(getResponse)
				setWorkout(getResponse.data.data.workout)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		}
		fetchData()
	}, [id])
	console.log(workout)
	console.log(workout)

	if (isLoading) {
		return <h1>Loading...</h1>
	} else {
		return (
			<div className='topContainer'>
				<div className='main-container'>
					{workout.group && workout.group.map(group => (
						<div className='exercises' key={group._id}>
							{group.exercises.map(exercise => (
								<div className='exercise-name' key={exercise._id}>
									<h2 className='exercise-exerciseName'>{exercise.exerciseName}</h2>
									<div className='set-name'> <span>Set</span> <span>Weight</span> <span>Reps</span> </div>
									{exercise.sets.map(set => (
										<div className='set-container' key={set._id}>
											<div className='set-num'>{set.setNum}</div> <div>{set.weight} lbs</div> <div>{set.reps}</div>
										</div>
									))}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		)
	}
}
export default Workout

