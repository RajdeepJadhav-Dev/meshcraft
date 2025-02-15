import "./App.css";
import Home from "../src/page";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { gsap } from "gsap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarketPlace from './Components/MarketPlace/MarketPlace'
import AssetDetailPage from "./Components/Assets/Assets";
import Navbar from "./Components/Navbar/Navbar";
import Services from "./Components/Services/services"
import SignUp from "./Components/SignUp/SignUp";
import Profile from "./Components/Profile/Profile";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import AboutUs from "./Components/AboutUs/Aboutus"
import Footer from "./Components/Footer/Footer";

gsap.registerPlugin(ScrollToPlugin);
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          
          <Route path="/asset/:id" element={<AssetDetailPage/>}></Route>
          <Route path="/services" element={<Services/>}></Route>
          <Route path="/marketplace" element={<AssetDetailPage/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path= "/profile" element={<Profile/>}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
          <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
          <Route path="/about" element={<AboutUs/>}></Route>
  
    
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
