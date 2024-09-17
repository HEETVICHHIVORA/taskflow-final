import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";


const Chatbox=({tasks,currUser})=>{

    useEffect(()=>{
        console.log(tasks);
    },[tasks]);

    const {teamName}=useContext(AppContext);
    

    return <div className="w-[65%] flex-col h-screen bg-red-50">
                <div className={`w-full flex justify-center items-center py-5  text-3xl font-semibold ${teamName.length>0 ? 'bg-green-300':'bg-none'}`}>{teamName}</div>
                {tasks.length > 0 ? (
                <div className="flex flex-col gap-y-5 p-5">
                    {tasks.map((task, index) => (
                        <div key={index} className={`flex flex-col justify-center gap-y-2 ${currUser==task.name ? 'items-end' : 'items-start'}`}>
                            {currUser!=task.name && <p className="text-lg font-bold text-red-400">{task.name}</p>}
                            {task.url?.length>0 && <audio controls src={task.url}/>}
                            {task.msg?.length>0 && <p className="bg-white p-2 max-w-[50%] text-lg rounded-md break-words border-slate-300 border-2">{task.msg}</p>}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="font-semibold text-3xl p-5">Select Chat</p>
            )}
    </div>
}

export default Chatbox;