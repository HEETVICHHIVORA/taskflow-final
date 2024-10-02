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

    const [showusers,setshowusers]=useState([]);


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
                setshowusers(result.allusers)
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
            else{
                toast.error(result.message)
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

    // async function searchUsers() {
        
    //     try {
    //         const response = await fetch('http://localhost:4000/searchUsers', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 prefix: searchInput
    //             }),
    //             credentials:'include'
    //         });

    //         const result = await response.json();
    //         if (result.success) {
    //             setallUsers(result.users);
    //             // console.log("All teams fetched successfully",result.groups);
    //         } else {
    //             console.error("Failed to save:", result.message);
    //         }
    //     } catch (error) {
    //         console.error("Error saving audio:", error);
    //     }
        
    // }

    function searchUsers(){
        const newArray=allUsers.filter(user=> user.name.includes(searchInput));
        setshowusers(newArray);
    }

    useEffect(()=>{
        searchUsers();
    },[searchInput])

    return (
      <div className="w-screen bg-blue-50 h-screen flex flex-col items-center justify-center gap-y-10 p-4">
  <h1 className="font-bold text-2xl text-center">New Team Name</h1>
  <input
    type="text"
    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={newTeamName}
    onChange={changeHandler}
    placeholder="Enter team name"
  />

  <p className="mt-4 text-2xl font-bold ">Search User</p>
  <div className="w-full max-w-md mx-auto my-2 bg-slate-300 rounded-md px-3 py-2 flex items-center border border-gray-300">
    <IoIosSearch className="text-gray-600" />
    <input
      className="bg-transparent outline-none text-sm flex-grow ml-2"
      placeholder="Search"
      type="text"
      value={searchInput}
      onInput={changeHandler2}
    />
  </div>

  <div 
  className="h-[20%] w-[20%] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 overflow-auto al justify-center align-middle"style={{ scrollbarWidth: 'none', msOverflowStyle: 'none',}}>
  {showusers ? (
    showusers.map((user, index) => (
      <div>
         <User
        user={user}
        key={index}
        newTeamMembers={newTeamMembers}
        setnewTeamMembers={setnewTeamMembers}
      />
      </div>
     
    ))
  ) : (
    <p className="text-center">Fetching users...</p>
  )}
</div>


  <button
    className="mt-4 bg-green-500 text-white font-bold rounded-lg px-4 py-2 hover:bg-green-600 transition duration-200"
    onClick={submitHandler}
  >
    Create Team
  </button>
</div>

      
    )
}

export default CreateTeam;