import { useEffect, useState } from "react";
import User from "../components/User";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { IoIosSearch } from "react-icons/io";


function AddMember(){

    const [allUsers,setallUsers]=useState([]);
    const navigate=useNavigate();
    const [newTeamMembers,setnewTeamMembers]=useState([]);
    const {setloader,teamName}=useContext(AppContext);
    const [searchInput,setsearchInput]=useState("");

    const [showusers,setshowusers]=useState([]);


    async function fetchallUsers() {
        setloader(true)
        try{
            const response=await fetch('http://localhost:4000/getnongroupmembers',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    teamName:teamName
                }),
                credentials: "include"
            });

            const result=await response.json();
            // console.log(result)
            
            if(result.success){
                setallUsers(result.allusers)
                setshowusers(result.allusers)
            }
            else{
                console.log(result.error)
            }
        }
        catch(e){
            console.log(e);
        }
        setloader(false)
    }

    useEffect(()=>{
        // console.log(teamName)
        fetchallUsers();
    },[]);


    async function submitHandler(){
        setloader(true)
        try{
            const response = await fetch('http://localhost:4000/addmembers', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    members:newTeamMembers,
                    teamName:teamName
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


    function searchUsers(){
        const newArray=allUsers.filter(user=> user.name.includes(searchInput));
        setshowusers(newArray);
    }

    useEffect(()=>{
        searchUsers();
    },[searchInput])

    // useEffect(()=>{
    //     console.log(newTeamMembers)
    // },[newTeamMembers])

    return (
      <div className="w-screen bg-blue-50 h-screen flex flex-col items-center justify-center gap-y-10 p-4">

  <p className="mt-4 text-2xl font-bold ">Search User</p>
  <div className="w-full max-w-md mx-auto my-2 bg-slate-300 rounded-md px-3 py-2 flex items-center border border-gray-300">
    <IoIosSearch className="text-gray-600" />
    <input
      className="bg-transparent outline-none text-sm flex-grow ml-2"
      placeholder="Search"
      type="text"
      value={searchInput}
      onInput={changeHandler2}
      autoFocus
    />
  </div>

  <div className="h-[20%] w-[20%] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 overflow-auto al justify-center align-middle"style={{ scrollbarWidth: 'none', msOverflowStyle: 'none',}}>
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
    ADD
  </button>
</div>

      
    )
}

export default AddMember;