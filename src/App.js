import "./App.css";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { gsap } from "gsap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import AuthState from "./Components/context/AuthState";
import routes from './Components/routes/routes'; // Import the combined routes
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

gsap.registerPlugin(ScrollToPlugin);

const router = createBrowserRouter(routes);

function App() {
  return (
    
    
      <AuthState>
        <RouterProvider router={router}> 
        </RouterProvider>
      </AuthState>
    
  );
}

export default App;