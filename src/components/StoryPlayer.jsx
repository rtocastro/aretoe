import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function StoryPlayer({ album }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const currentTrack =
    album.tracks
      .filter((track) => elapsedTime >= track.startTime)
      .at(-1) || album.tracks[0];

    const totalDuration =
  album.totalDuration ||
  album.tracks.reduce((total, track) => total + track.duration, 0);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  function startExperience() {
    setElapsedTime(0);
    setIsPlaying(true);
  }

  function stopExperience() {
    setIsPlaying(false);
    setElapsedTime(0);
  }

  return (

    

    
    <div className="story-player">
      <button
        className="story-button"
        onClick={isPlaying ? stopExperience : startExperience}
        style={{
          borderColor: album.colors.primary,
          boxShadow: `0 0 20px ${album.colors.primary}66`,
        }}
      >
        {isPlaying ? "Stop Experience" : "▶ Start Album Experience"}
      </button>

      <div className="story-progress">
  <div
    className="story-progress-fill"
    style={{
      width: `${Math.min((elapsedTime / totalDuration) * 100, 100)}%`,
      background: album.colors.primary,
    }}
  />
</div>

      

<AnimatePresence mode="wait">
<motion.div
  key={currentTrack?.title}
  className="story-panel"
  style={{
    border: `1px solid ${album.colors.primary}`,
    boxShadow: `0 0 30px ${album.colors.primary}33`,
  }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4 }}
>
    <p className="story-time">{elapsedTime}s</p>
    <h2>{currentTrack?.title}</h2>
    <p>{currentTrack?.story}</p>
  </motion.div>
</AnimatePresence>
    </div>
  );
}

export default StoryPlayer;