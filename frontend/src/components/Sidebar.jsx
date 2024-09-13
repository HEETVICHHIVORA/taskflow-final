import { useEffect, useState } from "react"
import { Searchbar } from "./Searchbar"
import { Team } from "./Team"
import { AppContext } from "../context/AppContext";
import { useContext } from "react";


export const Sidebar =({tasks,settasks,setaddbtn})=>{
    const [groups,setgroups]=useState([]);
    const [isEmpty,setisEmpty]=useState(false);
    const {setloader}=useContext(AppContext);

    async function getTeams(){
        setloader(true)
        try {
            const response = await fetch('http://localhost:4000/getteams', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials:'include'
            });

            const result = await response.json();
            if (result.success) {
                setgroups(result.groups);
                // console.log("All teams fetched successfully",result.groups);
            } else {
                console.error("Failed to save:", result.message);
            }
        } catch (error) {
            console.error("Error saving audio:", error);
        }
        setloader(false)
    }

    useEffect(()=>{
        getTeams();
    },[])

    useEffect(()=>{
        if(groups.length==0){
            setisEmpty(true)
        }
        else{
            setisEmpty(false)
        }
    },[groups])


    return <div className="w-[30%] h-screen">

        <Searchbar groups={groups} setgroups={setgroups}></Searchbar>
        {groups?.map((group,index)=>{
            return (
                <Team group={group} settasks={settasks} setaddbtn={setaddbtn}/>
            )
        })}
        {isEmpty && <p className="text-xl text-center pt-[50%]">No any groups</p>}
    </div>
       
}