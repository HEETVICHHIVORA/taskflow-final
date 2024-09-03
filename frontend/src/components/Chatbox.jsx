import { useState } from "react";

const Chatbox=({tasks})=>{


    

    return <div className="w-[65%] h-screen bg-red-50 flex justify-center items-center">
                    {tasks.length > 0 ? (
                <div>
                    {tasks.map((task, index) => (
                        <div key={index}>
                            <audio controls src={task.url} />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="font-semibold text-3xl">Select Chat</p>
            )}
    </div>
}

export default Chatbox;