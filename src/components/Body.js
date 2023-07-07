import React from 'react';
import Header from './Header/Header';
import Sidebar from "./Header/Sidebar"
import { Outlet } from 'react-router-dom';

// Dashboard component
const Body = () => {
  return (
    <div className="flex flex-col relative">
      <div className='fixed w-full z-30'>      
        <Header />        
      </div>      
        <Outlet/>
    </div>
  );
};

export default Body;
