import React, { useState } from "react";

const Speach = () => {
  const [recognizedText, setRecognizedText] = useState("");
  const handleVoiceRecognition = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setRecognizedText(transcript);
    };
    recognition.start();
  };

  return (
    <div className="bg-red-400 mt-10">
      <button onClick={handleVoiceRecognition}>Start Voice Recognition</button>
      <p>Recognized Text: {recognizedText}</p>
    </div>
  );
};

export default Speach;
