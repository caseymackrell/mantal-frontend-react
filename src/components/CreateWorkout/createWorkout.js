import React, { useState } from 'react'
import axios from 'axios'
import ExerciseForm from './ExerciseForm'
import './createWorkout.css'
import { useSelector } from 'react-redux'

const CreateWorkout = () => {
	const [formData, setFormData] = useState({
		workoutName: '',
		workoutDiscription: '',
		musclesTargeted: '',
		workoutLevel: 'beginner',
	})
	const [workout, setExercises] = useState([])
	const user = useSelector(state => state.userId)
	console.log(user)

	const handleChange = event => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		})
	}

	const handleExerciseChange = (index, exerciseData) => {
		const newExercises = [...workout]
		newExercises[index] = exerciseData
		setExercises(newExercises)
	}

	const handleDeleteExercise = index => {
		const newExercises = [...workout]
		newExercises.splice(index, 1)
		setExercises(newExercises)
	}

	const handleAddExercise = () => {
		setExercises([...workout, { sets: [{}] }])
	}

	const handleSubmit = async event => {
		event.preventDefault()
		try {
			console.log(formData)
			console.log(workout)
			await axios.post('http://localhost:3000/workout', {
				...formData,
				workout,
				user,
			})
			console.log('Workout added successfully')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='CreateWorkoutContainer'>
			<form onSubmit={handleSubmit}>
				<div className='workoutDescription'>
					<label>
        Workout Name
						<div className='workoutInput'>
							<input
								type='text'
								name='workoutName'
								value={formData.workoutName}
								onChange={handleChange}
								required
							/>
						</div>
					</label>
					<br />
					<label>
        Workout Description
						<div className='workoutInput'>
							<input
								type='text'
								name='workoutDiscription'
								value={formData.workoutDiscription}
								onChange={handleChange}
							/>
						</div>
					</label>
					<br />
					<label>
        Muscles Targeted
						<div className='workoutInput'>
							<input
								type='text'
								name='musclesTargeted'
								value={formData.musclesTargeted}
								onChange={handleChange}
							/>
						</div>
					</label>
					<br />
					<label>
        Workout Level
						<div className='workoutInput'>
							<select
								name='workoutLevel'
								value={formData.workoutLevel}
								onChange={handleChange}
								required
							>
								<option value='beginner'>Beginner</option>
								<option value='intermediate'>Intermediate</option>
								<option value='advanced'>Advanced</option>
							</select>
						</div>
					</label>
				</div>
				<br />
				<div className='exerciseContainer'>
					{workout.map((exercise, index) => (
						<ExerciseForm
							key={index}
							exerciseData={exercise}
							index={index}
							onChange={handleExerciseChange}
							onDelete={handleDeleteExercise}
						/>
					))}
				</div>
				<button className='exerciseButton' type='button' onClick={handleAddExercise}>
        Add Exercise
				</button>
				<button className='exerciseButton' type='button' onClick={handleDeleteExercise}>
        Delete Exercise
				</button>
				<div className='saveWorkout'>
					<button className='saveButton' type='submit'>Save Workout</button>
				</div>
			</form>
		</div>
	)
}

export default CreateWorkout
