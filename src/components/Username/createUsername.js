/* eslint-disable max-len */
import '../../App.css'
import './createUsername.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CreateUsername() {
	const navigate = useNavigate()
	const [username, setUsername] = useState('')

	const handleChange = (event) => {
		const { value } = event.target
		setUsername(value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const confirmRespone = await axios.patch('http://localhost:3000/user', { username: username })
			console.log(confirmRespone)
			if (confirmRespone.status === 200) {
				navigate('/')
				setUsername('')
			} else if (confirmRespone.status === 409) {
				alert('Username Already exists')
			}
		} catch (error) {
			console.error(error)
			alert('Code is invalid')
		}
	}

	return (
		<div className='main-container'>
			<img src='https://c4.wallpaperflare.com/wallpaper/542/50/545/simple-background-blue-simple-minimalism-wallpaper-preview.jpg' alt='Pic' className='img-1' />
			<div className='login-container'>
				<div className='logo-1'>
					<img src={require('../../icons/mainLogo.png')} alt='logo' />
				</div>

				<form onSubmit={handleSubmit}>
					<div className='label-2'>
						<label>
							<div className='label'>
                                Enter Username
							</div>
							<input
								className='login-input-2'
								type='text'
								name='otp'
								value={username}
								onChange={handleChange}
							/>
						</label>
					</div>
					<button type='submit' className='submit-button'>Confirm</button>
				</form>
			</div>
		</div>
	)
}

export default CreateUsername
