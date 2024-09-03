import {Sidebar} from "../components/Sidebar"
import { Appbar } from "../components/Appbar";
import Chatbox from "../components/Chatbox"
import { useState } from "react";

 const Homepage=()=>{

    const [addbtn,setaddbtn]=useState(false);

    const [tasks,settasks]=useState([]);

    return (
    <div className="w-screen h-screen overflow-x-hidden">
    <Appbar addbtn={addbtn}/>
    <div className="flex justify-between">
    <Sidebar tasks={tasks} settasks={settasks} setaddbtn={setaddbtn}></Sidebar>
    <Chatbox tasks={tasks}></Chatbox>
    </div>
    </div>)
    
}

export default Homepage;