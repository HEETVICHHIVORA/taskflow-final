import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Message from "./Message";

const Chatbox = ({ tasks, currUser }) => {
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const { teamName } = useContext(AppContext);

  return (
    <div className="w-full md:w-[65%] flex-col h-screen bg-red-50 overflow-y-auto"> 
      <div className={`w-full flex justify-center items-center py-5 text-3xl font-semibold ${teamName.length > 0 ? 'bg-green-300' : 'bg-none'}`}>
        {teamName}
      </div>
      {tasks.length > 0 ? (
        <div className="flex flex-col gap-y-5 p-5">
          {tasks.map((task, index) => (
            <div key={index} className={`flex flex-col justify-center gap-y-2 ${currUser === task.name ? 'items-end' : 'items-start'}`}>
              <Message taskmessage={task.msg} currUser={currUser} taskname={task.name} taskurl={task.url} taskid={task.taskid} />
            </div>
          ))}
        </div>
      ) : (
        <p className="font-semibold text-3xl p-5">Select Chat</p>
      )}
    </div>
  );
};

export default Chatbox;
