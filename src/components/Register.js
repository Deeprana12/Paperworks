import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setName, setToken } from '../utils/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';

const Register = () => {    

  const dispatch = useDispatch();
  const navigate = useNavigate();
    
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmpassword: ""
  });

  const navigatetoLogin = () => {
    navigate('/login')
  }
  
  const token = useSelector((store) => store.auth.token)
  useEffect(() => {
    if(token){
      navigate('/')
    }    
  }, [])
  

  const [passwordError, setPasswordError] = useState('');

  const handleFormData = (e, name) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    if(formData.password.length < 8){
      alert('Password Length must be 8 characters')
      return;
    }
    if(formData.password !== formData.confirmpassword){
      setPasswordError("Passwords don't match!");
    } else {      
      setPasswordError("");      
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password, name: formData.name }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        dispatch(setToken(token));
        dispatch(setEmail(formData.email));
        dispatch(setName(formData.name));
        navigate('/');
      } else {        
        console.error('Registration failed');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-indigo-500 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-white mb-6">Register</h2>
        <form className='lg:w-[450px] sm:1/2' onSubmit={handleSubmit}>        
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleFormData(e, "name")}
              className="w-full p-2 rounded bg-indigo-100 text-indigo-700"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleFormData(e, "email")}
              className="w-full p-2 rounded bg-indigo-100 text-indigo-700"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleFormData(e, "password")}
              className="w-full p-2 rounded bg-indigo-100 text-indigo-700"
              placeholder="Enter your Password"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmpassword" className="block mb-2 text-white">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={(e) => handleFormData(e, "confirmpassword")}
              className="w-full p-2 rounded bg-indigo-100 text-indigo-700"
              placeholder="Enter your password again"
              required
            />
          </div>        
          {passwordError && <h2 className='text-white text-bold'>{passwordError}</h2>}
          <div className='text-gray-200 mt-6 mb-2'>
          <h3>Already have an account?</h3>
          <span className='cursor-pointer text-bold' onClick={navigatetoLogin}>Click here!</span>
          </div>
          <div className='block text-center'> 
          <button
            type="submit"
            className="mt-4 mb-2 w-[1/2] bg-gray-200 text-indigo-500 py-2 px-4 rounded hover:text-white hover:bg-indigo-700 transition-colors"
          >
            Register
          </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
