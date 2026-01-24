import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "../../../contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-100 shadow-md text-black px-6 py-4 flex justify-between items-center">
      <div className="flex gap-1 items-center">
        <img
          className="w-10 h-10"
          src="https://i.ibb.co/DfFs1kLK/leave-logo.webp"
          alt="logo"
        />
        <Link to="/" className="text-xl font-bold">
          EcoTrack
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/challenges">Challenges</NavLink>
        <NavLink to="/my-activities">My Activities</NavLink>
      </div>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex gap-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-green-700 text-white px-3 py-1 rounded-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-700 text-white px-3 py-1 rounded-md"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-red-600 text-white px-3 py-1 rounded-md"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setOpen(!open)} className="md:hidden">
        <FiMenu size={24} />
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-3 py-4 md:hidden">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/challenges" onClick={() => setOpen(false)}>Challenges</NavLink>
          <NavLink to="/my-activities" onClick={() => setOpen(false)}>My Activities</NavLink>

          {!user ? (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="text-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
