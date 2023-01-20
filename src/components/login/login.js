/* eslint-disable max-len */
import '../../App.css'
import './login.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

function Login() {
	const navigate = useNavigate()
	const phoneNumber = useSelector(state => state.phoneNumber)
	const dispatch = useDispatch()

	const handleChange = (event) => {
		const { value } = event.target
		dispatch({ type: 'SET_PHONE_NUMBER', phoneNumber: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log(phoneNumber)

		try {
			const phoneRespone = await axios.post('http://localhost:3000/user/send_code', { phone: phoneNumber })
			console.log(phoneRespone)
			localStorage.setItem('phonenumber', phoneNumber)
			navigate('/login/confirm')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='main-container'>
			<img src='https://c4.wallpaperflare.com/wallpaper/542/50/545/simple-background-blue-simple-minimalism-wallpaper-preview.jpg'
				alt='Pic' className='img-1'/>
			<div className='login-container'>
				<div className='logo-1'>
					<img src={require('../../icons/mainLogo.png')} alt='logo'/>
				</div>

				<form onSubmit={handleSubmit}>
					<div className='login-input'>
						<label>
							<div className='label'>
        Enter Phone Number
							</div>
							<input
								className='login-input-1'
								type='text'
								value={phoneNumber}
								onChange={handleChange}
							/>
						</label>
					</div>
					<button type='submit' className='submit-button'>Send Code</button>
				</form>
			</div>
		</div>
	)
}

export default Login
