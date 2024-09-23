import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const Addbytext = () => {
    const { teamName } = useContext(AppContext);
    const navigate = useNavigate();
    const [description, setDescription] = useState("");

    const handleInputChange = (e) => {
        const target = e.target;
      
        target.style.height = 'auto'; 
        target.style.height = `${target.scrollHeight}px`; 
        setDescription(target.value); // Update state
    };

    const handlePost = async () => {
        const textData = {
            filename: 'text.txt',
            contentofpost: description,
            groupName: teamName,
            reqtype: 'text'
        };

        try {
            const response = await fetch('http://localhost:4000/sendToGroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(textData),
                credentials: 'include'
            });

            const result = await response.json();
            if (result.success) {
                navigate('/home');
            } else {
                console.error("Failed to save text:", result.error);
            }
        } catch (error) {
            console.error("Error saving text:", error);
        }
    };

    return (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center">
            <div className="w-[50%] gap-y-10 h-fit flex flex-col justify-center items-center">
                <div className="flex justify-center items-center w-full h-full">
                    <textarea
                        onInput={handleInputChange} 
                        rows={1} 
                        className="block w-full max-w-[50%] px-0 text-sm outline-none bg-gray-100 text-gray-800 rounded-md resize-none"
                        placeholder="Write an article....."
                        required
                    />
                </div>
                <button
                    onClick={handlePost}
                    type="button"
                    className="flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5"
                >
                    Post
                </button>
            </div>
        </div>
    );
};
