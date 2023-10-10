import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import world from "./video.mp4";

const socket = io("https://146.190.37.141:3005");

function App() {
  const videoRef = useRef(null);
  const [videoTime, setVideoTime] = useState(0);

  useEffect(() => {
    socket.on("play", () => {
      videoRef.current.play();
    });

    socket.on("pause", () => {
      videoRef.current.pause();
    });

    socket.on("timeupdate", (time) => {
      videoRef.current.currentTime = time;
    });
  }, []);

  const handlePlay = () => {
    socket.emit("play");
    socket.emit("timeupdate", videoTime);
  };

  const handlePause = () => {
    socket.emit("pause");
  };

  return (
    <div className="App">
      <video
        onTimeUpdate={(e) => setVideoTime(e.target.currentTime)}
        ref={videoRef}
        width="400"
        src={world}
        type="video/mp4"
        controls
      ></video>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
}

export default App;