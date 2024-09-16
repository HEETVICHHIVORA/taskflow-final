
import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"
import {AppContext} from "../context/AppContext"
import {toast} from "react-hot-toast";

export const Addbytext =()=>{
    const {teamName}=useContext(AppContext);
    const navigate=useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return    <div>
    <div>
    <div className="flex justify-center w-full pt-8">
      <div className="max-w-screen-lg w-full">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="w-full px-6 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          placeholder="Title"
        />
      </div>
    </div>
    <Texteditor onChange={(e) => setDescription(e.target.value)} />
    <div className="max-w-screen-lg w-full flex justify-center">
      {/* Uncomment and adjust the following button logic as needed */}
      <button
        onClick={async () => {
          const textData = {
            filename:'text.txt',
            contentofpost:description,
            groupName:teamName
          }
          try{
            const response = await fetch('http://localhost:4000/sendToGroupPlaintext',{
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
        className="flex justify-center mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Post
      </button>
    </div>
  </div>
</div>
}
function Texteditor({ onChange }) {
  return (
    <form action="">
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full rounded-lg">
          <div className="flex items-center justify-between px-3 py-2 border rounded-lg">
            <div className="px-4 py-2 bg-white rounded-b-lg w-full">
              <label className="sr-only">Publish post</label>
              <textarea
                onChange={onChange}
                id="editor"
                rows={8}
                className="block w-full px-0 text-sm text-gray-800 bg-white border-0"
                placeholder="Write an article....."
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}