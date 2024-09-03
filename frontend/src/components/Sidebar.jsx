import { useEffect, useState } from "react"
import { Searchbar } from "./Searchbar"
import { Team } from "./Team"


export const Sidebar =({tasks,settasks,setaddbtn})=>{
    const [groups,setgroups]=useState([]);

    async function getTeams(){
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
                console.log("All teams fetched successfully",result.groups);
            } else {
                console.error("Failed to save:", result.message);
            }
        } catch (error) {
            console.error("Error saving audio:", error);
        }
    }

    useEffect(()=>{
        getTeams();
    },[])


    return <div className="w-[30%] h-screen">

        <Searchbar></Searchbar>
        {groups?.map((group,index)=>{
            return (
                <Team group={group} settasks={settasks} setaddbtn={setaddbtn}/>
            )
        })}
    </div>
       
}