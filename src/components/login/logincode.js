import '../../App.css'
import './logincode.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'



function LoginCode() {
    const navigate = useNavigate()


  const [phone, setPhoneNumber] = useState('+1');

  const [otp, setOTP] = useState('')

const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'phone') {
        setPhoneNumber(value);
    } else if (name === 'otp') {
        setOTP(value);
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(phone);
    setPhoneNumber('+1');
    setOTP('')

    try {
        const confirmRespone = await axios.post('http://localhost:3000/user/verify_code', {phone, otp});
        console.log(confirmRespone)
        navigate('/')
    } catch (error) {
        console.error(error)
    }
}

  return (
    <div className='main-container'>
         <img src='https://c4.wallpaperflare.com/wallpaper/542/50/545/simple-background-blue-simple-minimalism-wallpaper-preview.jpg' alt='Pic' className='img-1'/>
    <div className='login-container'>
        <div className='logo-1'>
        <img src={require('../../icons/mainLogo.png')} alt='logo'/>
        </div>
   
    <form onSubmit={handleSubmit}>
    <div className='login-input'>
        <div className='label-1'>
        <label>
        <div className='label'>   
        Confirm Phone Number
        </div> 
        <input
          type="text"
          name='phone'
          value={phone}
          onChange={handleChange}
        />
      </label>
      </div>
      <div className='label-2'>
        <label>
        <div className='label'>   
        Enter Code 
        </div> 
        <input
          type="text"
          name='otp'
          value={otp}
          onChange={handleChange}
        />
      </label>
      </div>
      </div>
      <button type="submit" className='submit-button'>Confirm</button>
    </form>
    </div>
    </div>
  );
}

export default LoginCode