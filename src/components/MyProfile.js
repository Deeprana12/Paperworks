import React from 'react'
import user from "../assets/user.png";
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from '../utils/slices/authSlice'
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    
  const name = useSelector((store) => store.auth.name)
  const email = useSelector((store) => store.auth.email)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const logoutUser = () => {
    dispatch(clearAuth())
    navigate('/login')
  }
  
  const token = useSelector(store => store.auth.token)
  if(!token){
    return <p className='mt-20 text-center'>Please authenticate!</p>
  }

  return (
        <div className='mt-20 w-full flex flex-col items-center'>
            <h1 className='text-3xl text-bold'>Profile</h1>
            <img className='h-52 w-52' src={user}/>
            <h2 className='text-lg'>Name: {name}</h2>
            <h2 className='text-lg'>Email: {email}</h2>

            <button
              type="submit" className="m-4 bg-gray-200 text-indigo-500 py-2 px-4 rounded hover:bg-indigo-700 hover:text-white transition-colors" onClick={logoutUser}>
                Logout
            </button>
        </div>
  )
}

export default MyProfile