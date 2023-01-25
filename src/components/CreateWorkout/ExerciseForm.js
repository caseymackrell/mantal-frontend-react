import React, { useState } from 'react'
import SetForm from './SetForm'
import './ExerciseForm.css'

const ExerciseForm = ({ exercise = {}, index, onChange }) => {
	const [exerciseData, setExerciseData] = useState({
		exerciseName: exercise.name || '',
		sets: exercise.sets || [{
			setNum: '',
			reps: '',
			weight: '',
		}],
	})

	const handleChange = event => {
		setExerciseData({
			...exerciseData,
			[event.target.name]: event.target.value,
		})
		onChange(index, exerciseData)
	}

	const handleSetChange = (setIndex, setData) => {
		const newSets = [...exerciseData.sets]
		newSets[setIndex] = setData
		setExerciseData({
			...exerciseData,
			sets: newSets,
		})
		onChange(index, exerciseData)
		console.log(exerciseData)
	}

	const handleDeleteSet = setIndex => {
		const newSets = [...exerciseData.sets]
		newSets.splice(setIndex, 1)
		setExerciseData({
			...exerciseData,
			sets: newSets,
		})
		onChange(index, exerciseData)
	}

	const handleAddSet = () => {
		setExerciseData({
			...exerciseData,
			sets: [...exerciseData.sets, {}],
		})
		onChange(index, exerciseData)
	}

	return (
		<div className='exerciseForm'>
			<label>
				<div className='exerciseName'>
        Exercise Name
				</div>
				<div className='nameInput'>
					<input
						className='inputStyle'
						type='text'
						name='exerciseName'
						value={exerciseData.name}
						onChange={handleChange}
						required
					/>
				</div>
			</label>
			<br />
			<div className='setContainer'>
				{exerciseData.sets.map((set, setIndex) => (
					<SetForm
						key={setIndex}
						index={setIndex}
						set={set}
						onChange={handleSetChange}
						onDelete={handleDeleteSet}
					/>
				))}
			</div>
			<div className='buttonContainer'>
				<button className='setButton' type='button' onClick={handleAddSet}>Add Set</button>
				<button className='setButton' type='button' onClick={handleDeleteSet}>Delete Set</button>
			</div>
		</div>
	)
}

export default ExerciseForm
