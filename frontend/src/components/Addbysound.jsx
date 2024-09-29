import { useRef, useState, useEffect, useContext } from "react";
import {AppContext} from "../context/AppContext"
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";



export function Addbysound() {
  const audio = useRef([]);
  const [recordings, setRecordings] = useState([]);
  const mediaRecorderRef = useRef(null);
  const [audioblobcopy,setcopy]=useState();
  const {setloader}=useContext(AppContext);

  const navigate=useNavigate();

  const {teamName}=useContext(AppContext);

  async function startRec(){
      try{
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const mediaRecorder = new MediaRecorder(stream);

          mediaRecorder.ondataavailable = (e) => {
              if(e.data.size > 0){
                  audio.current.push(e.data);
              }
          }

          mediaRecorder.onstop = async () => {
              const audioBlob = new Blob(audio.current, { type: 'audio/wav' });
              const audioUrl = URL.createObjectURL(audioBlob);
              setcopy(audioBlob);

              setRecordings((prev) => [audioUrl]);

              // Convert Blob to Base64
          };

          mediaRecorderRef.current = mediaRecorder;
          mediaRecorder.start();
      } catch (e) {
          console.log(e);
      }
  }

  function stopRec() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
    }
}

  async function send(){
    setloader(true)
    const reader = new FileReader();
            reader.readAsDataURL(audioblobcopy);
            reader.onloadend = async () => {
                const base64data = reader.result.split(',')[1]; // Remove the data URL prefix

                // Prepare JSON data to send to the server
                const audioData = {
                    audioBlob: base64data,
                    filename: 'recording.wav',
                    mimeType: 'audio/wav',
                    groupName:teamName,
                    reqtype:'audio'
                };

                // Post the data to the server
                try {
                    const response = await fetch('http://localhost:4000/sendToGroup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(audioData),
                        credentials:'include'
                    });

                    const result = await response.json();
                    if (result.success) {
                        // console.log("Audio saved successfully:", result.audioDoc);
                        toast.success(result.message);
                        navigate('/home');
                    } else {
                        console.error("Failed to save audio:", result.error);
                    }
                } catch (error) {
                    console.error("Error saving audio:", error);
                }
                setloader(false)
            };
   }
  return (
    <div className="flex justify-center items-center h-screen gap-x-10 font-bold">
    <button onClick={startRec}>START</button><br /><br />
    <button onClick={stopRec}>STOP</button> <br /><br />
    <button onClick={send}>SEND</button>
    {
        recordings.map((recUrl, index) => {
            return (
                <div key={index}> 
                    <audio controls src={recUrl}/>
                </div>
            )
        })
    }
    
</div>
  );
}
