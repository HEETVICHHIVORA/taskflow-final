import {Sidebar} from "../components/Sidebar"
import { Appbar } from "../components/Appbar";
import Chatbox from "../components/Chatbox"
import { useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

 const Homepage=()=>{

    const [addbtn,setaddbtn]=useState(false);
    const [addbtnfortext,setaddbtnfortext]=useState(false);
    const [createTeam,setcreateTeam]=useState(false);
    const [tasks,settasks]=useState([]);
    const {setloader}=useContext(AppContext);
    const [currUser,setcurrUser]=useState("");

    async function authz() {
        setloader(true)
        try{
            const response=await fetch('http://localhost:4000/getRole',{
                credentials:'include'
            })

            const result=await response.json();
            if(result.success){
                setcurrUser(result.name);
                if(result.role==='manager')setcreateTeam(true);
            }
        }
        catch(e){
            console.log(e);
        }
        setloader(false)
    }

    useEffect(()=>{
        authz();
    },[])

    return (
    <div className="w-screen h-screen overflow-x-hidden">
    <Appbar addbtn={addbtn} createTeam={createTeam} addbtnfortext={addbtnfortext}/>
    <div className="flex justify-between">
    <Sidebar tasks={tasks} settasks={settasks} setaddbtn={setaddbtn} setaddbtnfortext={setaddbtnfortext}></Sidebar>
    <Chatbox tasks={tasks} currUser={currUser}></Chatbox>
    </div>
    </div>
    )
    
}

export default Homepage;