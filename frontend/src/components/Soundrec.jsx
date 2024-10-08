import { useRef, useState, useEffect } from "react";

function SoundRecorder() {
  const audio = useRef();
  const [recordings, setRecordings] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  async function startRec() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      setIsRecording(true);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audio.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audio.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordings((prev) => [...prev, audioUrl]);
        audio.current = []; // Clear the recorded data
        setIsRecording(false);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    } catch (e) {
      console.error(e);
    }
  }

  function stopRec() {
    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    } else {
      console.error('MediaRecorder reference not available');
    }
  }

  useEffect(() => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder) {
      return () => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
        mediaRecorderRef.current = null;
      };
    }
    return undefined;
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <button className="border-gray-800 p-2 bg-slate-300 m-3" onClick={startRec}>START</button>
        <button className="border-gray-800 p-2 bg-slate-300 m-3" onClick={stopRec}>STOP</button>
      </div>
      {isRecording && <div className="blinking-recording-button text-white bg-red-500 p-2 m-3 rounded font-bold">Recording...</div>}

      <div>
        {recordings.map((recUrl, index) => (
          <div key={index}>
            <audio controls src={recUrl} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SoundRecorder;
