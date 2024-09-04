import { useEffect, useState } from "react";
import User from "../components/User";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";

function CreateTeam(){

    const [newTeamName,setnewTeamName]=useState("");
    const [allUsers,setallUsers]=useState([]);
    const navigate=useNavigate();
    const [newTeamMembers,setnewTeamMembers]=useState([]);
    async function fetchallUsers() {
        try{
            const response=await fetch('http://localhost:4000/getallusers',
                {credentials:'include'}
            );

            const result=await response.json();
            // console.log("HEHE :- " , result )
            if(result.success){
                setallUsers(result.allusers)
            }
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        fetchallUsers();
    },[]);

    function changeHandler(e){
        setnewTeamName(e.target.value)
    }

    async function submitHandler(){
        try{
            const response = await fetch('http://localhost:4000/createNewTeam', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    members:newTeamMembers,
                    teamName:newTeamName
                }),
                credentials: "include"
            });

            const result=await response.json();
            // console.log(result);
            if(result.success){
                toast.success(result.message)
                navigate('/home')
            }
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div className="w-screen bg-blue-50 h-screen flex flex-col items-center justify-center gap-y-10">
            <p className="font-bold text-2xl"> New Team Name</p>
            <input type="text"
            className="p-2 outline-none"
            value={newTeamName}
            onChange={changeHandler}
             />
{allUsers ? (
    allUsers.map((user, index) => (
        <User user={user} key={index} newTeamMembers={newTeamMembers} setnewTeamMembers={setnewTeamMembers}/>
    ))
) : (
    <p>Fetching users...</p>
)}

<button className="bg-green-500 p-2 font-bold rounded-lg" onClick={submitHandler}>Creat Team</button>

        </div>
    )
}

export default CreateTeam;