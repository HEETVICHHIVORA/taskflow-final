import React, { useContext } from 'react'

import {toast} from "react-hot-toast";
import { AppContext } from '../context/AppContext';


const Message = ({
    currUser, taskname, taskurl, taskmessage ,taskid
}) => {
  const {teamName} = useContext(AppContext);
  async function  deletechat(){
    try {
      const response = await fetch('http://localhost:4000/deletechat', {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              taskid:taskid,
              groupname : teamName,
          }),
          credentials: "include"
      });
      const res=await response.json();
      console.log(res);
      if (res.success) {
          //navigate("/", { state: { id: email } });
          toast.success(res.message);
      } else{
          toast.error(res.message);
      }
  } catch (error) {
      alert("An error occurred. Please try again.");
      console.error(error);
  }
  }
  return (
    <div className=' flex flex-col justify-center gap-y-2 group'>
        <div>
           {currUser !== taskname && <p className="text-lg font-bold text-red-400">{taskname}</p>}
        </div>
        <div>
            <div>
            {taskurl?.length > 0 && <audio controls src={taskurl} />}
            {taskmessage?.length > 0 && <p className="bg-white p-2 max-w-[50%] text-lg rounded-md break-words border-slate-300 border-2">{taskmessage}</p>}
            </div>
            <div className=' opacity-0 group-hover:opacity-100 transition-opacity'>
            <button onClick={deletechat} className="bg-slate-400  text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none m-2 ">
                Delete
            </button>
            </div>
          
        </div>
    
    </div>
   
    

  )
}

export default Message;