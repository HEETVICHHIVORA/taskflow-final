import React from 'react'


const Message = ({
    currUser, taskname, taskurl, taskmessage
}) => {
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
            <button className="bg-slate-400  text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none m-2 ">
                Delete
            </button>
            </div>
          
        </div>
    
    </div>
   
    

  )
}

export default Message;