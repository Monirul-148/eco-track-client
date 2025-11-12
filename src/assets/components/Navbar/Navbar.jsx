import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const user = null 

  return (
    <nav className='bg-gray-100 shadow-md text-black px-6 py-4 flex justify-between items-center'>
      <div className='flex gap-1 items-center'>
        <img className='w-10 h-10' src="https://i.ibb.co/DfFs1kLK/leave-logo.webp" alt="" />
      <Link to='/' className='text-xl font-bold'> EcoTrack</Link>
      </div>
      
      

      <div className='hidden md:flex gap-6'>
        <NavLink to='/' className={({ isActive }) => (isActive ? "underline" : "")}>Home</NavLink>
        <NavLink to='/challenges' className={({ isActive }) => (isActive ? "underline" : "")}>Challenges</NavLink>
        <NavLink to='/my-activities' className={({ isActive }) => (isActive ? "underline" : "")}>My Activities</NavLink>
      </div>

      <div className='hidden md:flex gap-4'>
        {!user ? (
          <>
            <Link to='/login' className='bg-green-700 text-white px-3 py-1 rounded-md'>Login</Link>
            <Link to='/register' className='bg-green-700 text-white px-3 py-1 rounded-md'>Register</Link>
          </>
        ) : (
          <button>Logout</button>
        )}
      </div>

      <button onClick={() => setOpen(!open)} className='md:hidden'><FiMenu size={24}/></button>

      {open && (
        <div className='absolute top-16 left-0 w-full flex flex-col items-center gap-3 py-4 md:hidden'>
          <NavLink to='/' onClick={()=>setOpen(false)}>Home</NavLink>
          <NavLink to='/challenges' onClick={()=>setOpen(false)}>Challenges</NavLink>
          <NavLink to='/my-activities' onClick={()=>setOpen(false)}>My Activities</NavLink>
          <Link to='/login' onClick={()=>setOpen(false)}>Login</Link>
          <Link to='/register' onClick={()=>setOpen(false)}>Register</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
