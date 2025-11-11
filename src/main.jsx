import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout.jsx';
import Home from './assets/components/Home/Home.jsx';
import MyActivities from './assets/components/MyActivities/MyActivities.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Challenges from './assets/components/Challenges.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
       {
        index: true,
        element: <Home />
       },
       {
        path: 'My-Activities',
        element: <MyActivities />
       },
       {
        path: 'Login',
        element: <Login />
       },
       {
        path: 'Register',
        element: <Register />
       },
       {
        path: 'Challenges',
        element: <Challenges />
       },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
