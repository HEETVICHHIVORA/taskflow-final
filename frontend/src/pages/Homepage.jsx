import {Sidebar} from "../components/Sidebar"
import { Appbar } from "../components/Appbar";
import Chatbox from "../components/Chatbox"
import { useEffect, useState } from "react";

 const Homepage=()=>{

    const [addbtn,setaddbtn]=useState(false);
    const [createTeam,setcreateTeam]=useState(false);
    const [tasks,settasks]=useState([]);

    async function authz() {
        try{
            const response=await fetch('http://localhost:4000/getRole',{
                credentials:'include'
            })

            const result=await response.json();
            if(result.success && result.role==='manager'){
                setcreateTeam(true);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        authz();
    },[])

    return (
    <div className="w-screen h-screen overflow-x-hidden">
    <Appbar addbtn={addbtn} createTeam={createTeam}/>
    <div className="flex justify-between">
    <Sidebar tasks={tasks} settasks={settasks} setaddbtn={setaddbtn}></Sidebar>
    <Chatbox tasks={tasks}></Chatbox>
    </div>
    </div>)
    
}

export default Homepage;