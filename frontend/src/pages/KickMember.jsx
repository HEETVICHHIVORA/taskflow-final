import { useEffect, useState } from "react";
import User from "../components/User";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { IoIosSearch } from "react-icons/io";


function KickMember(){

    const navigate=useNavigate();
    const {setloader}=useContext(AppContext);
    const [searchInput,setsearchInput]=useState("");
    const {teamName}=useContext(AppContext);

    const [allUsers,setallUsers]=useState([]);
    const [showusers,setshowusers]=useState([]);
    const [removemember,setremovemember]=useState([]);


    async function fetchallUsers() {
        setloader(true)
        try{
            const response=await fetch('http://localhost:4000/getgroupmembers',{
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
                setallUsers(result.allmembers)
                setshowusers(result.allmembers);
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


    async function submitHandler(){
        setloader(true)
        try{
            const response = await fetch('http://localhost:4000/removemember', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    members:removemember,
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
            />
  </div>

  <div className="h-auto w-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto al justify-center align-middle">
    {showusers ? (
      showusers.map((user, index) => (
        <User
          user={user}
          key={index}
          newTeamMembers={removemember}
          setnewTeamMembers={setremovemember}
        />
      ))
    ) : (
      <p className="text-center">Fetching users...</p>
    )}

    {allUsers.length==0 ? <p>No users</p> :""}
  </div>

  <button
    className="mt-4 bg-red-500 text-white font-bold rounded-lg px-4 py-2 hover:bg-green-600 transition duration-200"
    onClick={submitHandler}
  >
    Kick out
  </button>
</div>

      
    )
}

export default KickMember;