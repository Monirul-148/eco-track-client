import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";

const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success("Google registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const photoUrl = event.target.photoUrl.value.trim();
    const password = event.target.password.value;

    // Password validation
    const length6 = /^.{6,}$/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const special = /[!@#$%^&*(),.?":{}|<>]/;

    if (!length6.test(password)) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (!upper.test(password) || !lower.test(password)) {
      toast.error("Password must contain uppercase & lowercase letters");
      return;
    }
    if (!special.test(password)) {
      toast.error("Password must include a special character");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!");
      navigate("/");
      event.target.reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-base-100 rounded-xl shadow-2xl max-w-5xl w-full">

        {/* ===== LEFT SIDE FORM ===== */}
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-2">Join EcoTrack</h1>
          <p className="text-gray-500 mb-6">
            Create your account and start your eco-friendly journey
          </p>

          <form onSubmit={handleRegister}>
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full mb-3"
              placeholder="Your Name"
              required
            />

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full mb-3"
              placeholder="Email"
              required
            />

            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              className="input input-bordered w-full mb-3"
              placeholder="Photo URL (optional)"
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full mb-4"
              placeholder="Password"
              required
            />

            <button
              type="submit"
              className={`btn btn-outline w-full mt-4 flex items-center justify-center gap-3  ${loading ? "loading" : ""}`}
            >
              Register
            </button>
          </form>

          {/* ===== GOOGLE REGISTER BUTTON ===== */}
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
            <span>Register with Google</span>
          </button>

          <p className="mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>

        {/* ===== RIGHT SIDE IMAGE ===== */}
        <div className="hidden lg:flex items-center justify-center p-4">
          <img
            src="https://i.ibb.co/GLKKfq4/vecteezy-isometric-style-illustration-of-login-to-website-6552114.jpg"
            alt="Eco Community"
            className="h-full w-full object-cover rounded-xl"
          />
        </div>

      </div>
    </div>
  );
};

export default Register;
