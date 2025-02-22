import React, { useContext } from 'react';
import SideBar from '../components/SideBar';
import { FaBars } from 'react-icons/fa';
import authContext from '../context/authContext';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const { isSidebarOpen, setIsSidebarOpen} = useContext(authContext);


  return (
    <div className='bg-[#1A1B41]'>
      <div className='flex item-center gap-2 justify-between'>
        {isSidebarOpen ? (
          <div className={`bg-[#2b2e4a] cursor-pointer ${isSidebarOpen ? 'slideInAnimation' : 'slideOutAnimation'}`}>
            <SideBar setState={setIsSidebarOpen} />
          </div>
        ) : (
          <div onClick={() => setIsSidebarOpen((prev) => !prev)} className="flex pl-4 pt-4 items-start justify-end">
            <FaBars className="text-xl cursor-pointer text-white hover:text-gray-300 transition-all" />
          </div>
        )}
        <div className='p-3 w-[85vw] h-fit'>
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


