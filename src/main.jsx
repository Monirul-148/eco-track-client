import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout.jsx';
import Home from './assets/components/Home/Home.jsx';
// import MyActivities from './assets/components/MyActivities/MyActivities.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
// import Challenges from './assets/components/Challenges.jsx';
import Tips from './pages/Tips.jsx';
import Events from './pages/Event.jsx';
import ChallengeDetails from './pages/ChallengeDetails.jsx';
import AddChallenge from './pages/AddChallenge.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
       {
        index: true,
        element: <Home />
       },
      //  {
      //   path: 'My-Activities',
      //   element: <MyActivities />
      //  },
       {
        path: 'Login',
        element: <Login />
       },
       {
        path: 'Register',
        element: <Register />
       },
       {
        path: 'tips',
        element: <Tips />
       },
      //  {
      //   path: 'Challenges',
      //   element: <Challenges />
      //  },
       {
        path: 'event',
        element: <Events />
       },
       {
        path: '/challenges/:id',
        element: <ChallengeDetails />
       },
        {
        path: '/challenges/add',
        element: <AddChallenge />
       },
       {
        path: '/challenges/join/:id',
        element: <ChallengeDetails />
       },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
