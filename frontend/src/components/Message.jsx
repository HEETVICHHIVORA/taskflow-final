import React, { useContext } from 'react';
import { toast } from "react-hot-toast";
import { AppContext } from '../context/AppContext';
import { MdDelete } from 'react-icons/md';

const Message = ({ currUser, taskname, taskurl, taskmessage, taskid }) => {
  const { teamName } = useContext(AppContext);

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
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error(error);
    }
  }

  return (
    <div className='flex flex-col justify-center gap-y-2 group'>
      <div>
        {currUser !== taskname && <p className="text-lg font-bold text-red-400">{taskname}</p>}
      </div>
      <div className='flex items-center gap-x-2 flex-row-reverse'>
        <div className='max-w-[60%]'> 
          {taskurl?.length > 0 && <audio controls src={taskurl} />}
          {taskmessage?.length > 0 && (
            <p className="bg-white p-2 text-lg rounded-md break-words border-slate-300 border-2">
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
