import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    
    const location = useLocation();
    const token = useSelector(store => store.auth.token)
    const isMenuOpen = useSelector((store)=>store.app.isMenuOpen)
    
    if(!isMenuOpen)
        return null;

    return (
        <div className="absolute z-25 mt-14 h-screen w-[250px] text-lg bg-gray-900 text-white p-5 shadow-lg col-span-2">
            <ul>
                <Link to="/">
                    <li className={"px-2 hover:text-indigo-500 hover:bg-gray-100 rounded-md hover:cursor-pointer py-1 my-2" + (location.pathname === '/' ? ' bg-gray-100 text-indigo-500' : '') }>
                    All Files
                    </li>
                </Link>

                <Link to="/shared">
                    <li className={"px-2 hover:text-indigo-500 hover:bg-gray-100 rounded-md hover:cursor-pointer py-1 my-2 " + (location.pathname === '/shared' ? ' bg-gray-100 text-indigo-500' : '')}>
                        Shared With Me
                    </li>
                </Link>

                <Link to="/my-pdfs">
                    <li className={"px-2 hover:text-indigo-500 hover:bg-gray-100 rounded-md hover:cursor-pointer py-1 my-2" + (location.pathname === '/my-pdfs' ? ' bg-gray-100 text-indigo-500' : '') }>
                    My Files
                    </li>
                </Link>

                <Link to="/my-profile">
                    <li className={"px-2 hover:text-indigo-500 hover:bg-gray-100 rounded-md hover:cursor-pointer py-1 my-2" + (location.pathname === '/my-profile' ? ' bg-gray-100 text-indigo-500' : '') }>
                    Profile
                    </li>
                </Link>
            </ul>
        </div>
    )

}

export default Sidebar