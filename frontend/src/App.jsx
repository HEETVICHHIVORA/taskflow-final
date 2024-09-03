import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Temp from "./pages/Temp";
import { Addbytext } from './components/Addbytext';
import { Addbysound } from './components/Addbysound';
import  Homepage  from "./pages/Homepage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;