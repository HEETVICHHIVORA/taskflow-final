import { useRef, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function Addbysound() {
  const audio = useRef([]);
  const [recordings, setRecordings] = useState([]);
  const mediaRecorderRef = useRef(null);
  const [audioblobcopy,setcopy]=useState();
  const {setloader}=useContext(AppContext)
  const [isListening,setIsListening]=useState(false);
  const navigate=useNavigate();

  const {teamName}=useContext(AppContext);

  async function startRec() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audio.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audio.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setcopy(audioBlob);
        setRecordings((prev) => [audioUrl]);
        setIsListening(false); // Stop listening when recording stops
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsListening(true); // Start listening when recording starts
    } catch (e) {
      console.log(e);
    }
  }

  function stopRec() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }

  async function send() {
    setloader(true);
    const reader = new FileReader();
    reader.readAsDataURL(audioblobcopy);
    reader.onloadend = async () => {
      const base64data = reader.result.split(',')[1]; // Remove the data URL prefix

      // Prepare JSON data to send to the server
      const audioData = {
        audioBlob: base64data,
        filename: 'recording.wav',
        mimeType: 'audio/wav',
        groupName: teamName,
        reqtype: 'audio'
      };

      // Post the data to the server
      try {
        const response = await fetch('http://localhost:4000/sendToGroup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(audioData),
          credentials: 'include'
        });

        const result = await response.json();
        if (result.success) {
          toast.success(result.message);
          navigate('/home');
        } else {
          console.error("Failed to save audio:", result.error);
        }
      } catch (error) {
        console.error("Error saving audio:", error);
      }
      setloader(false);
    };
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-10 font-semibold">
      {isListening && (
        <p className="text-lg text-green-600 mb-4">Listening...</p> // Added Listening text
      )}
      <div className="flex space-x-4"> {/* Reduced space between buttons */}
        <button 
          onClick={startRec} 
          className="bg-teal-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 transform hover:scale-105"
        >
          START
        </button>
        <button 
          onClick={stopRec} 
          className="bg-red-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
        >
          STOP
        </button>
        <button 
          onClick={send} 
          className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
        >
          SEND
        </button>
      </div>

      <div className="flex flex-col items-center space-y-6 mt-6"> {/* Adjusted spacing and margin */}
        {
          recordings.map((recUrl, index) => (
            <div key={index} className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-md"> {/* Set max width for audio controls */}
              <audio controls src={recUrl} className="w-full rounded-md" />
             
            </div>
          ))
        }
      </div>
    </div>
  );
}
