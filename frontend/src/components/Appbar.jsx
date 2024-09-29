import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export const Appbar=({addbtn,createTeam,addbtnfortext,kickbtn})=>{

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

    return   <div className="bg-gray-50 text-gray-800 border-b border-gray-300 flex justify-between items-center px-6 md:px-10 py-4 shadow-md">
    <div className="text-2xl font-bold tracking-wide font-poppins">
      TaskFlo
    </div>

    <div className="flex items-center space-x-4">
      {addbtn && (
        <button
          onClick={() => { navigate('/createvoice') }}
          className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 shadow-md"
        >
          ADD TASK-AUDIO
        </button>
      )}
      {createTeam && (
        <button
          onClick={() => { navigate('/createteam') }}
          className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 shadow-md"
        >
          CREATE TEAM
        </button>
      )}
      {addbtnfortext && (
        <button
          onClick={() => { navigate('/createtext') }}
          className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 shadow-md"
        >
          ADD TASK-TEXT
        </button>
      )}
      {kickbtn && (
        <button
          onClick={() => { navigate('/removemember') }}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 shadow-md"
        >
          KICK MEMBERS
        </button>
      )}
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 shadow-md"
      >
        Log out
      </button>
    </div>
  </div>
}