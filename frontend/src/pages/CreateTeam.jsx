import { useEffect, useState } from "react";
import User from "../components/User";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { IoIosSearch } from "react-icons/io";


function CreateTeam(){

    const [newTeamName,setnewTeamName]=useState("");
    const [allUsers,setallUsers]=useState([]);
    const navigate=useNavigate();
    const [newTeamMembers,setnewTeamMembers]=useState([]);
    const {setloader}=useContext(AppContext);
    const [searchInput,setsearchInput]=useState("");


    async function fetchallUsers() {
        setloader(true)
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
        setloader(false)
    }

    useEffect(()=>{
        fetchallUsers();
    },[]);

    function changeHandler(e){
        setnewTeamName(e.target.value)
    }

    async function submitHandler(){
        setloader(true)
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
        setloader(false)
    }

    function changeHandler2(e){
        setsearchInput(e.target.value);
    }

    async function searchUsers() {
        
        try {
            const response = await fetch('http://localhost:4000/searchUsers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prefix: searchInput
                }),
                credentials:'include'
            });

            const result = await response.json();
            if (result.success) {
                setallUsers(result.users);
                // console.log("All teams fetched successfully",result.groups);
            } else {
                console.error("Failed to save:", result.message);
            }
        } catch (error) {
            console.error("Error saving audio:", error);
        }
        
    }

    useEffect(()=>{
        searchUsers();
    },[searchInput])

    return (
        <div className="w-screen bg-blue-50 h-screen flex flex-col items-center justify-center gap-y-10">
            <p className="font-bold text-2xl"> New Team Name</p>
            <input type="text"
            className="p-2 outline-none"
            value={newTeamName}
            onChange={changeHandler}
             />

             <p>Search User</p>
             <div className="w-[20%] mx-auto my-1  bg-slate-300 rounded-md px-2 py-1 flex gap-x-2 items-center border-r-2">
                <IoIosSearch />
                <div className="w-full">
                <input 
                className="bg-transparent outline-none text-sm w-[100%]" placeholder="search" type="text" 
                value={searchInput}
                onInput={changeHandler2}/> 
            </div>
    </div>

    <div className="h-[20%] flex flex-col gap-y-5 flex-wrap gap-x-5">
    {allUsers ? (
    allUsers.map((user, index) => (
        <User user={user} key={index} newTeamMembers={newTeamMembers} setnewTeamMembers={setnewTeamMembers}/>
    ))
) : (
    <p>Fetching users...</p>
)}
    </div>

<button className="bg-green-500 p-2 font-bold rounded-lg" onClick={submitHandler}>Creat Team</button>

        </div>
    )
}

export default CreateTeam;