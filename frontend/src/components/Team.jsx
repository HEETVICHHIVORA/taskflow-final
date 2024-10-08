import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { MdDelete } from "react-icons/md";

export const Team = ({ group, tasks, settasks, setaddbtn, setaddbtnfortext, createteam ,setkickbtn}) => {
    const { setTeamName,setloader} = useContext(AppContext);

    async function deleteGroup() {
        // setloader(true);
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
                
            } else {
                console.error("Failed to delete group:", result.error);
            }
        } catch (error) {
            console.error("Error deleting group:", error);
        }
        window.location.reload();
        // setloader(false);
        
    }

    async function showTasks() {
        setTeamName(group.name);
        localStorage.setItem('group',group.name);
        setaddbtn(true);
        setaddbtnfortext(true);
        if(createteam) setkickbtn(true);
        setloader(true);
        try {
            const response = await fetch(`http://localhost:4000/getAllTasks?name=${group.name}`);
            const result = await response.json();
            console.log(result);
            if (result.success) {
                const audioDataArray = result.audioData.map(audio => {
                    if (audio.content.length === 0) {
                        const audioBlob = new Blob([Uint8Array.from(atob(audio.base64Audio), c => c.charCodeAt(0))], { type: audio.mimeType });
                        const audioUrl = URL.createObjectURL(audioBlob);
                        return {
                            url: audioUrl,
                            name: audio.sender,
                            taskid: audio.taskid
                        };
                    } else {
                        return {
                            name: audio.sender,
                            msg: audio.content,
                            taskid: audio.taskid
                        };
                    }
                });

                settasks(audioDataArray);
            } else {
                console.error("Failed to fetch audio:", result.error);
            }
        } catch (error) {
            console.error("Error fetching audio:", error);
        }
        setloader(false);
    }

    return (
        <div className="w-full px-3 hover:bg-slate-100 transition duration-200 cursor-pointer group" onClick={showTasks}>
            <div className="flex p-2 border-b-2 justify-between items-center">
                <div className="w-full h-full flex gap-x-3 items-center">
                    <div className="rounded-full w-[40px] h-[40px] justify-center items-center hidden lg:flex text-xl font-bold bg-black text-white">
                        {group.name[0]}
                    </div>
                    <div>
                        <p>{group.name}</p>
                        <p>This is the last chat short.</p>
                    </div>
                </div>

                {createteam && (
                    <div className="delete-button-container group-hover:opacity-100 opacity-0 bg-red-200 rounded-full p-1 flex justify-center items-center hover:bg-red-300">
                        <button onClick={deleteGroup}>
                            <MdDelete className="text-red-500 text-xl" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
