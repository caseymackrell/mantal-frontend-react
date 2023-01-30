import React, { useState } from 'react'
import './SetForm.css'

const SetForm = ({ set, index, onChange }) => {
	const [setData, setSetData] = useState({
		setNum: set.setNum || '',
		reps: set.reps || '',
		weight: set.weight || '',
	})

	const handleChange = event => {
		setSetData({
			...setData,
			[event.target.name]: event.target.value,
		})
		onChange(index, { ...setData, [event.target.name]: event.target.value })
	}

	return (
		<div className='setMainContainer'>
			<div className='repContainer'>
				<label>
        Set Number
					<div className='inputCon'>
						<input
							className='inputNum'
							type='text'
							name='setNum'
							value={setData.setNum}
							onChange={handleChange}
							required
						/>
					</div>
				</label>
				<br />
				<label>
        Number of reps
					<div className='inputCon'>
						<input
							className='inputNum'
							type='text'
							name='reps'
							value={setData.reps}
							onChange={handleChange}
							required
						/>
					</div>
				</label>
				<br />
				<label>
        Weight
					<div className='inputCon'>
						<input
							className='inputNum'
							type='text'
							name='weight'
							value={setData.weight}
							onChange={handleChange}
							required
						/>
					</div>
				</label>
				<br />
			</div>
		</div>
	)
}

export default SetForm
