
import { useContext } from "react";
import {AppContext} from "../context/AppContext"
import { MdDelete } from "react-icons/md";


export const Team =({group,tasks,settasks,setaddbtn,setaddbtnfortext,createteam})=>{

    const {setTeamName}=useContext(AppContext);
    const {setloader}=useContext(AppContext);
   // const {role}= useContext(AppContext);
    async function deleteGroup() {
      setloader(true)
        try {
          const response = await fetch(`http://localhost:4000/deletegroup?groupid=${group._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
          });
          const result = await response.json();
          if (result.success) {
            console.log("Group deleted successfully");
            // Optionally, you could update the UI to remove the group from the list
          } else {
            console.error("Failed to delete group:", result.error);
          }
        } catch (error) {
          console.error("Error deleting group:", error);
        }
        setloader(false);
      }
    async function showTasks() {
        setTeamName(group.name);
        setaddbtn(true);
        setaddbtnfortext(true);

        setloader(true)
        setaddbtnfortext(true)
        try {
            const response = await fetch(`http://localhost:4000/getAllTasks?name=${group.name}`);
            const result = await response.json();
            console.log(result)
            if (result.success) {
                // Map through each audio record and convert it to a Blob URL
                const audioDataArray = result.audioData.map(audio => {
                    if(audio.content.length==0){
                        const audioBlob = new Blob([Uint8Array.from(atob(audio.base64Audio), c => c.charCodeAt(0))], { type: audio.mimeType });
                        const audioUrl = URL.createObjectURL(audioBlob);
                        return {
                            url: audioUrl,
                            name: audio.sender, 
                            taskid:audio.taskid// Assuming you have a name or some identifier for each audio file
                        };
                    }
                    else{
                        return {
                            name:audio.sender,
                            msg:audio.content,
                            taskid:audio.taskid
                        }
                    }
                });

                settasks(audioDataArray);
            } else {
                console.error("Failed to fetch audio:", result.error);
            }
        } catch (error) {
            console.error("Error fetching audio:", error);
        }
        setloader(false)
    }
    return <div className="w-full px-3 hover:bg-slate-100 transition duration-200 cursor-pointer group" onClick={showTasks}>
    <div className="flex p-2 border-b-2 justify-between items-center">
<div className="w-full h-full flex">
      <div className="rounded-full w-[12%] justify-center items-center mr-2 hidden lg:flex text-xl font-bold">
        <img src="../public/voice-chat.png" alt="" />
      </div>
      <div>
        <p>{group.name}</p>
        <p>this is the last chat short.</p>
      </div>
</div>
      
      {createteam && (
        <div className="group-hover:opacity-100 opacity-0 bg-red-200 rounded-full p-1 flex justify-center items-center hover:bg-red-300">
          <button onClick={deleteGroup}>
            <MdDelete className="text-red-500 text-xl" />
          </button>
        </div>
      )}
    </div>
  </div>
  
}