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
        <div className="h-[100vh] w-[100vw] flex justify-center items-center">
            <div className="w-[50%] gap-y-10 h-fit flex flex-col justify-center items-center">
                <div className="flex justify-center items-center w-full h-full">
                    <textarea
                        value={description}
                        onInput={handleInputChange}
                        rows={1}
                        className="block w-full max-w-[50%] px-0 text-sm outline-none bg-gray-100 text-gray-800 rounded-md resize-none"
                        placeholder="Write an article....."
                        required
                    />
                </div>
                <button
                    onClick={handleTextPost}
                    type="button"
                    className="flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5"
                >
                    Post
                </button>
            </div>
            
            <div className="container">
                <h2>Speech to Text Converter</h2>
                <br />
                <p>A React hook that converts speech from the microphone to text and makes it available to your React components.</p>

                <div className="main-content" onClick={() => setTextToCopy(transcript)}>
                    {transcript}
                </div>

                <div className="btn-style">
                    <button className='border' onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    <button className='border' onClick={startListening}>Start Listening</button>
                    <button className='border' onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                    <button className='border' onClick={resetTranscript}>Reset Transcript</button>
                </div>

                <button
                    onClick={handleSpeechPost}
                    type="button"
                    className="flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5"
                >
                    Post Speech
                </button>
            </div>
        </div>
    );
};
