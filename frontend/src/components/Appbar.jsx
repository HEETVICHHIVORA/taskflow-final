import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export const Appbar=({addbtnfortext,addbtn,createTeam})=>{

    const {setloader}=useContext(AppContext);
    const navigate=useNavigate();

    async function logout(){
        setloader(true)
        try{
            const response=await fetch('http://localhost:4000/logout',{
                method:'GET',
                headers:{
                    "Content-Type": "application/json"
                },
                credentials:'include'
            })

            const res=await response.json();

            if(res.success){
                
                navigate('/')
            }
        }
        catch(e){
            console.error(e);
        }
        setloader(false)
    }

    return <div className="border-b flex justify-between px-10 py-4">
      
        <div className="flex flex-col justify-center ">
              TaskFlow
        </div>

        {addbtn ? <button onClick={()=>{navigate('/createvoice')}}>ADD TASK</button> :""}
        {createTeam ? <button onClick={()=>{navigate('/createteam')}}>CREATE TEAM</button> :""}
        {addbtnfortext ? <button onClick={()=>{navigate('/createtext')}}>ADD TASK-TEXT</button> :""}
        <button onClick={logout}>Log out</button>
    

    </div>
}