import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ExerciseForm from './ExerciseForm'
import './createWorkout.css'
// import { useSelector } from 'react-redux'

const SendWorkout = () => {
	const [users, setUsers] = useState([])
	const [formData, setFormData] = useState({
		workoutName: '',
		workoutDiscription: '',
		musclesTargeted: '',
		workoutLevel: 'beginner',
		scheduledDate: '',
		recipient: '',
	})
	const [workout, setExercises] = useState([])
	const [hasExercises, setHasExercises] = useState(false)
	const [isScheduled, setIsScheduled] = useState(false)
	const handleChange = event => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		})
	}

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const { data } = await axios.get('http://localhost:3000/user/users')
				setUsers(data.data)
				console.log(data.data)
				console.log(users)
			} catch (error) {
				console.error(error)
			}
		}
		fetchUsers()
	}, [])

	const handleExerciseChange = (index, exerciseData) => {
		const newExercises = [...workout]
		newExercises[index] = exerciseData
		setExercises(newExercises)
		console.log(newExercises)
	}

	const handleDeleteExercise = index => {
		const newExercises = [...workout]
		newExercises.splice(index, 1)
		setExercises(newExercises)
	}

	const handleAddExercise = () => {
		setExercises([...workout, { sets: [{}] }])
		setHasExercises(true)
	}

	const handleSubmit = async event => {
		event.preventDefault()
		try {
			console.log(formData)
			console.log(workout)
			setIsScheduled(false)
			const type = isScheduled ? 'scheduled' : 'post'
			const user = '6390014286398787de94b09d'
			console.log(type)
			await axios.post('http://localhost:3000/workout/sendWorkout', {
				...formData,
				workout,
				user,
				type,
			})
			console.log('Workout added successfully')
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<div className='topContainer'>
			<div className='CreateWorkoutContainer'>
				<form onSubmit={handleSubmit}>
					<div className='workoutDescription'>
						<label>
        Workout Name
							<div className='workoutInput'>
								<input
									className='inputStyle'
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
									className='inputStyle'
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
									className='inputStyle'
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
									className='inputStyle'
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
						<label>
        Date
							<div className='workoutInput'>
								<input
									className='inputStyle'
									type='date'
									name='scheduledDate'
									value={formData.scheduledDate}
									onChange={handleChange}
								/>
							</div>
						</label>
						<label>
                            Recipient
							<div className='workoutInput'>
								<select className='inputStyle' name='recipient'
									value={formData.recipient} onChange={handleChange}>
									<option value=''>Select a recipient</option>
									{users?.map(user => (
										<option key={user._id} value={user._id}>
											{user.username}
										</option>
									))}
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
						{hasExercises ? <button className='saveButton' type='submit'>Save Workout</button> : null}
					</div>
				</form>
			</div>
		</div>
	)
}
export default SendWorkout
