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
    const {teamName}=useContext(AppContext);

    const [kickbtn,setkickbtn]=useState(false);

    async function authz() {
        setloader(true)
        try{
            const response=await fetch('http://localhost:4000/getRole',{
                credentials:'include'
            })

            const result=await response.json();
            if(result.success){
                setcurrUser(result.name);
               // setrole(result.role);
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
        showTasks();
        if(teamName){
            setaddbtnfortext(true);
            setaddbtn(true);
            setkickbtn(true);
        }
    },[])

    async function showTasks() {
    

        setloader(true);
        try {
            const response = await fetch(`http://localhost:4000/getAllTasks?name=${teamName}`);
            const result = await response.json();
            console.log("from mesage " , result);
            if (result.success) {
                const audioDataArray = result.audioData.map(audio => {
                    if (audio.content.length === 0) {
                        const audioBlob = new Blob([Uint8Array.from(atob(audio.base64Audio), c => c.charCodeAt(0))], { type: audio.mimeType });
                        const audioUrl = URL.createObjectURL(audioBlob);
                        return {
                            url: audioUrl,
                            name: audio.sender,
                            taskid: audio.taskid
                        };
                    } else {
                        return {
                            name: audio.sender,
                            msg: audio.content,
                            taskid: audio.taskid
                        };
                    }
                });
    
                settasks(audioDataArray);
            } else {
                console.error("Failed to fetch audio:", result.error);
            }
        } catch (error) {
            console.error("Error fetching audio:", error);
        }
        setloader(false);
    }

    return (
    <div className="w-screen h-screen overflow-x-hidden">
    <Appbar addbtn={addbtn} createTeam={createTeam} addbtnfortext={addbtnfortext} kickbtn={kickbtn}/>
    <div className="flex justify-between">
    <Sidebar tasks={tasks} settasks={settasks} setaddbtn={setaddbtn} setaddbtnfortext={setaddbtnfortext} createteam={createTeam} setkickbtn={setkickbtn}></Sidebar>
    <Chatbox tasks={tasks} showTasks={showTasks} currUser={currUser} settasks={settasks} ></Chatbox>
    </div>
    </div>
    )
    
}

export default Homepage;