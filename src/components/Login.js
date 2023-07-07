import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setEmail, setName } from '../utils/slices/authSlice';
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../constants';

const LoginForm = () => {

  const dispatch = useDispatch()
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const navigatetoRegister = () => {
    navigate('/register')
  }

  const token = useSelector((store) => store.auth.token)
  useEffect(() => {
    if(token){
      navigate('/')
    }    
  }, [])

  const handleSubmit = async (e) => {    
    e.preventDefault()
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();        
        const { email, name } = data.user        
        const token = data.token;        
        dispatch(setToken(token));
        dispatch(setEmail(email));
        dispatch(setName(name));
        navigate('/')
      } else {        
          alert('Invalid Credentials')
      }
    } catch (error) {
      alert("Server Error")      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-indigo-500 p-6 rounded-lg shadow-md lg:w-1/4 sm:1/2">
        <h2 className="text-3xl font-semibold text-white mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-white block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 rounded bg-indigo-100 text-indigo-700"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-white block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 rounded bg-indigo-100 text-indigo-700"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className='text-gray-200 mt-6 mb-2'>
          <h3>Don't have an account?</h3>
          <span className='cursor-pointer text-bold' onClick={navigatetoRegister}>Click here!</span>
          </div>
          <div className='block text-center'> 
          <button
            type="submit"
            className="w-1/2 bg-gray-200 text-indigo-500 py-2 px-4 rounded hover:bg-indigo-700 hover:text-white transition-colors"
          >
            Login
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
