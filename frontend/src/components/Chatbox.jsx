import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";


const Chatbox=({tasks})=>{

    const {teamName}=useContext(AppContext);
    

    return <div className="w-[65%] flex-col h-screen bg-red-50">
                <div className="w-full flex justify-center items-center py-5 bg-green-200 text-3xl font-semibold">{teamName}</div>
                {tasks.length > 0 ? (
                <div className="flex flex-col gap-y-5 p-5">
                    {tasks.map((task, index) => (
                        <div key={index} className="flex items-center gap-x-2">
                            <p className="text-xl">{task.name} : </p>
                            <audio controls src={task.url}/>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="font-semibold text-3xl p-5">Select Chat</p>
            )}
    </div>
}

export default Chatbox;