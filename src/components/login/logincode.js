/* eslint-disable max-len */
import '../../App.css'
import './logincode.css'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function LoginCode() {
	const navigate = useNavigate()
	const phone = useSelector(state => state.phoneNumber)
	const [otp, setOTP] = useState('')

	const handleChange = (event) => {
		const { value } = event.target
		setOTP(value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const confirmRespone = await axios.post('http://localhost:3000/user/verify_code', { phone, otp })
			console.log(confirmRespone)
			if (confirmRespone.data.data.token) {
				localStorage.setItem('jwt', confirmRespone.data.data.token)
				navigate('/')
				setOTP('')
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
                                Enter Code
							</div>
							<input
								className='login-input-2'
								type='text'
								name='otp'
								value={otp}
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

export default LoginCode
