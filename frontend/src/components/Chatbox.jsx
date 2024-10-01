import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Message from "./message";
const Chatbox = ({ tasks, currUser ,settasks,showTasks}) => {
  useEffect(() => {
    // console.log(tasks);
  }, [tasks]);

  const { teamName } = useContext(AppContext);

  return (
    <div className=" mt-20 flex flex-col h-screen w-[calc(100%-300px)] bg-gray-50 overflow-y-auto shadow-lg"> {/* Adjusted width */}
    <div className={`w-full flex flex-col justify-center items-center py-5 text-3xl font-semibold rounded-md transition-all duration-300 ${teamName.length > 0 ? 'bg-green-200 text-gray-800' : 'bg-gray-200 text-gray-600'}`}>
      {teamName.length > 0 ? teamName : "No Team Selected"}
    </div>

    {tasks.length > 0 ? (
      <div className="flex flex-col gap-y-5 p-5">
        {tasks.map((task, index) => (
          <div 
            key={index} 
            className={`flex flex-col justify-center gap-y-2 ${currUser === task.name ? 'items-end' : 'items-start'}`}
          >
            <Message 
              showTasks={showTasks} 
              taskmessage={task.msg} 
              currUser={currUser} 
              taskname={task.name} 
              taskurl={task.url} 
              taskid={task.taskid} 
              settasks={settasks} 
              className={`bg-white shadow-md p-4 rounded-lg transition duration-300 transform hover:shadow-xl hover:scale-105 ${currUser === task.name ? 'bg-blue-100' : 'bg-gray-100'}`}
            />
          </div>
        ))}
      </div>
    ) : (
      <p className="font-semibold text-3xl p-5 text-center text-gray-500">Select Chat</p>
    )}
  </div>
  );
};

export default Chatbox;
