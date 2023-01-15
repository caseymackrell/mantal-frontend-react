import '../../App.css'
import './login.css'
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'



function Login() {

const navigate = useNavigate()
const [phone, setPhoneNumber] = useState('+1');

const handleChange = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(phone);
    setPhoneNumber('+1');

    try {
        const phoneRespone = await axios.post('http://localhost:3000/user/send_code', {phone});
        console.log(phoneRespone)
        navigate('/login/confirm')
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
        <label>
        <div className='label'>   
        Enter Phone Number
        </div> 
        <input
          type="text"
          value={phone}
          onChange={handleChange}
        />
      </label>
      </div>
      <button type="submit" className='submit-button'>Send Code</button>
    </form>
    </div>
    </div>
  );
}

export default Login