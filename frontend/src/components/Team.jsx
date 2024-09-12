
import { useContext } from "react";
import {AppContext} from "../context/AppContext"

export const Team =({group,tasks,settasks,setaddbtn})=>{

    const {setTeamName}=useContext(AppContext);
    const {setloader}=useContext(AppContext);

    async function showTasks() {
        setTeamName(group.name);
        setaddbtn(true);
        setloader(true)
        try {
            const response = await fetch(`http://localhost:4000/getAllTasks?name=${group.name}`);
            const result = await response.json();
            console.log(result)
            if (result.success) {
                // Map through each audio record and convert it to a Blob URL
                const audioDataArray = result.audioData.map(audio => {
                    const audioBlob = new Blob([Uint8Array.from(atob(audio.base64Audio), c => c.charCodeAt(0))], { type: audio.mimeType });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    return {
                        url: audioUrl,
                        name: audio.sender, // Assuming you have a name or some identifier for each audio file
                    };
                });

                settasks(audioDataArray);
            } else {
                console.error("Failed to fetch audio:", result.message);
            }
        } catch (error) {
            console.error("Error fetching audio:", error);
        }
        setloader(false)
    }
    return <div className="w-full  px-3 hover:bg-slate-100 transition duration-200 cursor-pointer" onClick={showTasks}>
         <div className="flex p-2 border-b-2">
            <div className="bg-blue-200 rounded-full w-[12%] justify-center items-center mr-2 hidden lg:flex">
                   
            </div>
            <div>
                <p className="">
                    {group.name}
                </p>
                <p>
                    this is the last chat short . 
                </p>
            </div>
         </div>
    </div>
}