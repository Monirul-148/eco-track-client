import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./assets/components/Home/Home.jsx";
import MyActivities from "./assets/components/MyActivities/MyActivities.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Challenges from "./assets/components/Challenges.jsx";
import Tips from "./pages/Tips.jsx";
import Events from "./pages/Event.jsx";
import ChallengeDetails from "./pages/ChallengeDetails.jsx";
import AddChallenge from "./pages/AddChallenge.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

import ProtectedRoute from "./layouts/ProtectedRoute.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />, // ✅ ERROR PAGE HERE
    children: [
      { index: true, element: <Home /> },

      {
        path: "my-activities",
        element: (
          <ProtectedRoute>
            <MyActivities />
          </ProtectedRoute>
        ),
      },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "tips", element: <Tips /> },
      { path: "challenges", element: <Challenges /> },
      { path: "events", element: <Events /> },

      {
        path: "challenges/add",
        element: (
          <ProtectedRoute>
            <AddChallenge />
          </ProtectedRoute>
        ),
      },

      {
        path: "challenges/join/:id",
        element: (
          <ProtectedRoute>
            <ChallengeDetails />
          </ProtectedRoute>
        ),
      },

      {
        path: "challenges/:id",
        element: <ChallengeDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>
);
