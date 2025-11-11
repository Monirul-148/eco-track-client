import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, {useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { Link } from 'react-router';

const googleProvider = new GoogleAuthProvider();



const Register = () => {
    const handleGoogleSignIn = () =>{
        // console.log('google button clicked')
        signInWithPopup(auth, googleProvider)
        .then(result =>{
            console.log(result);
        })
        .catch(error => {
            console.log(error)
        })
    }
    
   

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('')

const handleRegister = (event) =>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const photoUrl = event.target.photoUrl.value;
    const password = event.target.password.value;
    console.log('register Click', name, email, photoUrl, password)

    const length6Pattern = /^.{6,}$/;
    const casePattern =/^(?=.*[a-z])(?=.*[A-Z]).+$/;

    if(!length6Pattern.test(password)){
        console.log('password didnt match')
        setError('password must be 6 character or longer');
    }
    else if(!casePattern.test(password)){
        setError('password must have at least one uppercase and one lower case charcter')
        return;
    }

    setError('');
    setSuccess(false);

    createUserWithEmailAndPassword(auth, email, password)
    .then(result =>{
        console.log('after creation of a new user', result.user);
        setSuccess(true);
        event.target.reset();
    })
    .catch(error => {
         console.log('error happened',error)
         setError(error.message);
    }
    )
    }

    return (
       <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleRegister}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="name" name='name' className="input" placeholder="Name" />
          <label className="label">Email</label>
          <input 
          type="email" 
          name='email' 
          className="input" 
          placeholder="Email" />
          <label className="label">Photo URL</label>
          <input type="text" name='photoUrl' className="input" placeholder="Photo URL" />
          <label className="label">Password</label>
          <input type="password" name='password' className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Register</button>
          <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
          Login with Google
          </button>
        </fieldset>
        {
            success && <p className='text-green-500'>Account created successfully. </p>
        }
        {
            error && <p className='text-red-500'>{error}</p>
        }
        </form>
        <p>Already have an account? Please <Link className='text-blue-500 underline' to="/Login">Login</Link></p>
      </div>
    </div>
  </div>
</div>
    );
};

export default Register;