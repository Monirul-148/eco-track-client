import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase/firebase.init";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-base-100 rounded-xl shadow-2xl max-w-5xl w-full">

        {/* ===== LEFT SIDE (FORM) ===== */}
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-2">Login to EcoTrack</h1>
          <p className="text-gray-500 mb-6">
            Access your account and continue your eco-friendly journey 
          </p>

          <form onSubmit={handleLogin}>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full mb-3"
              placeholder="Email"
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full mb-2"
              placeholder="Password"
              required
            />

            <div className="flex justify-between mb-4">
              <Link to="/forgot-password" className="link link-hover text-sm">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={`btn btn-outline w-full mt-4 flex items-center justify-center gap-3 ${loading ? "loading" : ""}`}
            >
              Login
            </button>
          </form>

          {/* ===== GOOGLE LOGIN (FIXED LOGO) ===== */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="btn btn-outline w-full mt-4 flex items-center justify-center gap-3"
          >
            <img
              src="https://i.ibb.co/bgpP0Hyg/2702602.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span>Login with Google</span>
          </button>

          <p className="mt-6 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold">
              Register
            </Link>
          </p>
        </div>

        {/* ===== RIGHT SIDE IMAGE (WITH GAP) ===== */}
        <div className="hidden lg:flex items-center justify-center p-4">
          <img
            src="https://i.ibb.co/zWXCj9Tv/online-registration-form-and-Sign-in-button-generated.jpg"
            alt="EcoTrack Login"
            className="h-full w-full object-cover rounded-xl"
          />
        </div>

      </div>
    </div>
  );
};

export default Login;
