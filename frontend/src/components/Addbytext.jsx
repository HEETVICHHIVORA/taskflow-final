
import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"
import {AppContext} from "../context/AppContext"
import {toast} from "react-hot-toast";

export const Addbytext =()=>{
    const {teamName}=useContext(AppContext);
    const navigate=useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="w-[50%] gap-y-10 h-fit flex flex-col justify-center items-center">
      <Texteditor onChange={(e) => setDescription(e.target.value)} />
      <button
        onClick={async () => {
          const textData = {
            filename:'text.txt',
            contentofpost:description,
            groupName:teamName,
            reqtype:'text'
          }
          try{
            const response = await fetch('http://localhost:4000/sendToGroup',{
              method:'POST',
              headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(textData),
            credentials:'include'
            });
            const result = await response.json();
            console.log(result);
            if (result.success) {
                // console.log("Audio saved successfully:", result.audioDoc);
             //   toast.success(result.error);
                navigate('/home');
            } else {
                console.error("Failed to save text:", result.error);
            }

          }
          catch(error){
            console.error("Error saving audio:", error);
          }
        }}
        type="button"
        className="flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5"
      >
        Post
      </button>
      </div>

  
</div>
}
function Texteditor({ onChange }) {
  return (

      <div className="flex justify-center items-center w-full h-full">
               <textarea
                onChange={onChange}
                id="editor"
                rows={8}
                className="block w-[50%] px-0 text-sm outline-none bg-gray-100 text-gray-800 rounded-md resize-none"
                placeholder="Write an article....."
                required
              ></textarea>
      </div>

  );
}