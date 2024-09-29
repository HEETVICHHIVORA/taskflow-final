import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Temp from "./pages/Temp";
import { Addbytext } from './components/Addbytext';
import { Addbysound } from './components/Addbysound';
import  Homepage  from "./pages/Homepage";
import CreateTeam from "./pages/CreateTeam";
import KickMember from "./pages/KickMember";
import Loader from './components/Loader';
import { AppContext } from "./context/AppContext";
import { useContext } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const {loader,setloader}=useContext(AppContext);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/temp" element={<Temp />} />
          <Route path='/home' element ={<Homepage/>}></Route>
          <Route path='/createtext' element ={<Addbytext/>}></Route>
          <Route path='/createvoice' element ={<Addbysound/>}></Route>
          <Route path='/createteam' element ={<CreateTeam/>}></Route>
          <Route path='/removemember' element ={<KickMember/>}></Route>
        </Routes>
      </Router>
      {loader && <div className="fixed top-0 right-0 left-0  flex justify-center items-center h-full bg-black bg-opacity-50 z-50"><Loader/></div>}
    </div>
  );
}

export default App;