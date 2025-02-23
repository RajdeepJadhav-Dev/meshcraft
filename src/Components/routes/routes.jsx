import React from "react";
import Home from "../../page";
import MarketPlace from '../MarketPlace/MarketPlace';
import Assets from "../Assets/Assets";
import Services from "../Services/services";
import SignUp from "../SignUp/SignUp";
import Profile from "../Profile/Profile";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import AboutUs from "../AboutUs/Aboutus";
import Dashboard from '../Dashboard/Dashboard'; // Import the other app's component
import AdminHome from '../screens/Home'; // Import the other app's screens
import EditAsset from '../screens/EditAsset';
import EditDetails from '../screens/EditDetails';
import DeleteAsset from '../screens/DeleteAsset';
import AdminProfile from '../screens/Profile';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import AdminLogin from "../AdminLogin/AdminLogin";

const routes = [
  {
    element: (
      <>
       <ScrollToTop />
        <Navbar />
        <Outlet /> {/* This renders the matched child route */}
        <Footer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/asset/:id",
        element: <Assets />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/marketplace",
        element: <MarketPlace />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:userId/:token",
        element: <ResetPassword />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/adminlogin",
        element: <AdminLogin />,
      },
    ],
  },



  {
    path: "/admin",

    element:
     <Dashboard />,
    children: [
      {
        path: "", 
        element: <AdminHome />
      },
      {
        path: "editassets",
        element: <EditAsset />,
      },
      {
        path: "editassets/editdetails",
        element: <EditDetails />,
      },
      {
        path: "deleteassets",
        element: <DeleteAsset />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
    ],
  },
];

export default routes;