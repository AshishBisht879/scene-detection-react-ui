import React, { useEffect, useRef } from "react";
import "./VideoPlayer.css";

const VideoPlayer = ({ video, currentTime, dispatch }) => {
  const videoRef = useRef(null);
  const lastDispatchedTime = useRef(0);

  // Throttle state updates to reduce unnecessary dispatches
  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const videoCurrentTime = videoRef.current.currentTime;
      if (Math.abs(videoCurrentTime - lastDispatchedTime.current) >= 1) {
        lastDispatchedTime.current = videoCurrentTime;
        dispatch({ type: "SET_CURRENT_TIME", payload: videoCurrentTime });
      }
    }
  };

  useEffect(() => {
    // Prevent seeking if the difference between the currentTime and player's current time is small
    if (videoRef.current) {
      const playerTime = videoRef.current.currentTime;
      if (Math.abs(playerTime - currentTime) > 1) {
        videoRef.current.currentTime = currentTime;
      }
    }
  }, [currentTime]);

  return (
    <div className="video_player_container">
      <video
        ref={videoRef}
        className="video_player"
        src={video.url}
        controls
        autoPlay
        onTimeUpdate={handleVideoTimeUpdate}
        onSeeked={handleVideoTimeUpdate}
      />
    </div>
  );
};

export default VideoPlayer;
