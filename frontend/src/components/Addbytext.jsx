import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";

export const Addbytext = () => {
    const { teamName } = useContext(AppContext);
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [textToCopy, setTextToCopy] = useState("");
    const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 1000 });

    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <p>Your browser doesn't support speech recognition.</p>;
    }

    const handleInputChange = (e) => {
        const target = e.target;
        target.style.height = 'auto'; 
        target.style.height = `${target.scrollHeight}px`; 
        setDescription(target.value);
    };

    const handlePost = async (content) => {
        const textData = {
            filename: 'text.txt',
            contentofpost: content,
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

    const handleTextPost = () => {
        handlePost(description);
    };

    const handleSpeechPost = () => {
        handlePost(transcript); 
    };

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-blue-50">
          <div className="w-full max-w-2xl flex flex-col gap-y-10 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col mb-4">
              <textarea
                value={description}
                onChange={handleInputChange} // Changed from onInput to onChange
                rows={3}
                className="block w-full p-3 text-sm outline-none bg-gray-200 text-gray-800 rounded-md resize-none shadow-md transition duration-300 focus:bg-white focus:ring-2 focus:ring-teal-500"
                placeholder="Write an article..."
                required
              />
              <button
                onClick={handleTextPost}
                type="button"
                className="mt-4 flex justify-center items-center text-white bg-teal-600 hover:bg-blue-700 font-medium rounded-full text-sm px-5 py-2.5 transition duration-300"
              >
                Post
              </button>
            </div>
      
            <div className="container mx-auto p-5 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2 text-black pb-4">Prefer Speaking? Use This!</h2>
      
              <div
                className="main-content border border-gray-300 p-4 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer mb-4 "
                onClick={() => setTextToCopy(transcript)}
              >
                {transcript || "Start speaking..."}
              </div>
      
              <div className="btn-style flex flex-wrap gap-6 mb-4 justify-center">
                <button
                  className="border border-gray-400 px-2 py-1 rounded-md bg-yellow-300 hover:bg-yellow-400 transition duration-200 text-m font-semibold"
                  onClick={setCopied}
                >
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  className="border border-gray-400 px-2 py-1 rounded-md bg-green-300 hover:bg-green-400 transition duration-200 text-m font-semibold"
                  onClick={startListening}
                >
                  Start
                </button>
                <button
                  className="border border-gray-400 px-2 py-1 rounded-md bg-red-300 hover:bg-red-400 transition duration-200 text-m font-semibold"
                  onClick={SpeechRecognition.stopListening}
                >
                  Stop
                </button>
                <button
                  className="border border-gray-400 px-2 py-1 rounded-md bg-purple-300 hover:bg-purple-400 transition duration-200 text-m font-semibold"
                  onClick={resetTranscript}
                >
                  Reset
                </button>
              </div>
      
              <button
                onClick={handleSpeechPost}
                type="button"
                className="flex justify-center items-center w-full text-white bg-teal-600 hover:bg-blue-700 font-medium rounded-full text-sm px-5 py-2.5 transition duration-300"
              >
                Post    
              </button>
            </div>
          </div>
        </div>
      );
    }