import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../../utils/slices/appSlice';
import menuIcon from "../../assets/menu-icon.png";
import user from "../../assets/user.png";
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../../utils/slices/authSlice';

const Header = () => {

  const dispatch = useDispatch();  
  const navigate = useNavigate()

  // const { searchTerm, handleSearch, suggestions } = useSearch();

  const toggleMenuHandler = () =>{
    dispatch(toggleMenu())
  }
  const logoutUser = () => {
    dispatch(clearAuth())
    navigate('/login')
}

  return (
    <div className='flex flex-col w-full'>
    <div className='grid w-full grid-flow-col px-5 align-middle sticky left-0 top-0 bg-gray-900 z-20'>
        <div className='flex col-span-1 py-1 cursor-pointer'>
            <img onClick={()=>toggleMenuHandler()} src={menuIcon} className='h-6 cursor-pointer m-4'/>
            <span className='text-2xl font-bold my-3 mx-2 text-indigo-400'><Link to="/">PaperWorks</Link></span>
        </div>
        <div className='col-span-9 justify-center ml-48'>
            {/* <SearchBar props={[searchTerm, handleSearch, suggestions]}/> */}
        </div>
        <div className='col-span-2 py-1 flex flex-row justify-self-end'>
            <img className="h-7 mr-1 mt-3.5 rounded-full" alt="user_logo" src={user} />
            <button
              type="submit" className=" text-indigo-300 cursor-pointer my-2 px-2 rounded" onClick={logoutUser}>
                Logout
            </button>
        </div>    
    </div>
    <Sidebar />
    </div>
  )
}

export default Header