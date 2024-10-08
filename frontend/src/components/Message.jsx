import React, { useContext } from 'react';
import { toast } from "react-hot-toast";
import { AppContext } from '../context/AppContext';
import { MdDelete } from 'react-icons/md';

const Message = ({ currUser, taskname, taskurl, taskmessage, taskid,showTasks }) => {
  const { teamName,setloader } = useContext(AppContext);

  async function deletechat() {
    try {
      const response = await fetch('http://localhost:4000/deletechat', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          taskid: taskid,
          groupname: teamName,
        }),
        credentials: "include"
      });
      const res = await response.json();
      if (res.success) {
        toast.success(res.message);
        showTasks();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error(error);
    }
  }


 

  return (
    <div className='w-[90%] max-w-[50%] flex flex-col gap-y-2 group'>
      <div>
        {currUser !== taskname ? <p className="text-lg font-bold text-blue-500">{taskname}</p>:<p className="text-end text-lg font-bold text-blue-500">You</p>}
      </div>
      <div className={`flex items-center gap-x-2 ${currUser===taskname && 'flex-row-reverse'}`}>
        <div className='w-fit '> 
          {taskurl?.length > 0 && <audio controls src={taskurl} />}
          {taskmessage?.length > 0 && (
            <p className="bg-white p-2  text-lg rounded-md break-words border-slate-300 border-2">
              {taskmessage}
            </p>
          )}
        </div>
        {currUser === taskname && (
          <div className='opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-red-100 p-1 cursor-pointer hover:bg-red-200'>
            <MdDelete onClick={deletechat} className="text-red-500 text-xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
