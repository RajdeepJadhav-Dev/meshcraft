import "./App.css";
import Home from "../src/page";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { gsap } from "gsap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarketPlace from '../src/Components/MarketPlace/MarketPlace'
import Navbar from "../src/Components/Navbar/Navbar";
// import LoginPage from "./Components/loginPage/LoginPage";
// import CreativeShowcase from "./componentsan/CreativeShowcase";
// import FeaturedCollections from "./componentsan/FeaturedCollections";
// import Features from "./componentsan/Features";
// import Footer from "./componentsan/Footer";
// import Navbar from "./componentsan/Navbar";
import Services from "./Components/Services/services"
import LoginPage from "./Components/Login/Login";
import RegisterPage from "./Components/Register/Register";
import SignUp from "./Components/SignUp/SignUp";
import Profile from "./Components/Profile/Profile";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import AboutUs from "./Components/AboutUs/Aboutus";

// Register GSAP ScrollTo Plugin
gsap.registerPlugin(ScrollToPlugin);
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          

          <Route path="/services" element={<Services/>}></Route>
          <Route path="/marketplace" element={<MarketPlace/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path= "/profile" element={<Profile/>}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
          <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
          <Route path="/about" element={<AboutUs/>}></Route>
  
    
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
