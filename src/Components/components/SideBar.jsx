import React,{useContext} from 'react'
import {
  FaThLarge,
  FaUsers,
  FaMoneyBill,
  FaCog,

} from 'react-icons/fa'

import Logo from "../../assets/admin/Horizontalwithbgsmall.png"

import { MdClose } from 'react-icons/md'


import { HiX } from 'react-icons/hi'
import authContext from '../context/authContext'
import { Link } from 'react-router-dom'






const navItems = [
  { 
    id: '', 
    label: 'Add Assets', 
    icon: FaThLarge,
    path: "/admin" 
  },
  { 
    id: 'editassets', 
    label: 'Edit Assets',  
    icon: FaUsers,
    path: "/admin/editassets" 
  },
  { 
    id: 'deleteassets',
    label: 'Delete Assets',
    icon: FaMoneyBill,
    path: "/admin/deleteassets" 
  },
  { 
    id: 'profile',     
    label: 'Profile',     
    icon: FaCog,
    path: "/admin/profile" 
  },
]

const SideBar = () => {
  const [activeItem, setActiveItem] = React.useState('dashboard')
  const { setIsSidebarOpen } = useContext(authContext)
  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }
  const handleNavClick = (id) => {
    localStorage.setItem("activeBtn", id)
    setActiveItem(id)
  }
  

  


  return (
    // The sidebar container is hidden on small devices
    <div className="hidden md:flex text-white h-screen w-64 flex-col justify-between bg-[#2b2e4a]">
      <div>
        <div className="flex items-center justify-between px-5 py-6">
          <Link to ="/">
          <img src={Logo} alt="MeshCraft Logo" />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(prev => !prev)}
            className="hidden" // Not displayed on desktop in this design
          >
            {/* Could add an icon here if needed */}
          </button>
        </div>
        {/* Navigation */}
        <nav className="mt-4">
          <ul className="flex flex-col space-y-2">
            {navItems.map(item => {
              const Icon = item.icon
              const isActive = localStorage.getItem("activeBtn") === item.id
              return (
                <li
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    flex items-center gap-3 px-5 py-2 cursor-pointer transition-all duration-300 ease-in-out
                    ${isActive ? 'bg-[#383b5b] rounded-r-full mx-3 shadow-inner' : 'hover:bg-white/10'}
                  `}
                >
                  <Icon />
                  <a href={`${item.path}`} className="text-sm">{item.label}</a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
      {/* Footer or logout button can be added here if needed */}
    </div>
  )
}

export default SideBar
