import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function StoryPlayer({ album, onTimeUpdate, onTrackChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const currentTrack =
    album.tracks
      .filter((track) => elapsedTime >= track.startTime)
      .at(-1) || album.tracks[0];

  const currentTrackElapsed = elapsedTime - currentTrack.startTime;

  function createAutoMoments(story = "", duration = 60) {
    const sentences = story
      .split(/(?<=[.!?])\s+/)
      .filter(Boolean);

    if (sentences.length === 0) return [];

    const spacing = Math.max(8, Math.floor(duration / sentences.length));

    return sentences.map((text, index) => ({
      start: index * spacing,
      text,
    }));
  }

  const storyMoments =
    currentTrack?.storyMoments?.length > 0
      ? currentTrack.storyMoments
      : createAutoMoments(currentTrack?.story, currentTrack?.duration);

  const currentStoryMoment =
    storyMoments
      .filter((moment) => currentTrackElapsed >= moment.start)
      .at(-1) || null;

  const totalDuration =
    album.totalDuration ||
    album.tracks.reduce((total, track) => total + track.duration, 0);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setElapsedTime((prev) => {
        const next = prev + 1;

        if (next >= totalDuration) {
          setIsPlaying(false);
          return totalDuration;
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, totalDuration]);


  // Use effects to notify parent component of time and track changes

  useEffect(() => {
    if (onTimeUpdate) {
      onTimeUpdate(elapsedTime);
    }
  }, [elapsedTime, onTimeUpdate]);

  useEffect(() => {
    if (onTrackChange && currentTrack) {
      onTrackChange(currentTrack);
    }
  }, [currentTrack, onTrackChange]);

  function startExperience() {
    setElapsedTime(0);
    if (onTimeUpdate) onTimeUpdate(0);
    setIsPlaying(true);
  }

  function stopExperience() {
    setIsPlaying(false);
    setElapsedTime(0);
    if (onTimeUpdate) onTimeUpdate(0);
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
          <p className="signal-label">
            SIGNAL FRAGMENT
          </p>
          <p className="story-moment">
            {currentStoryMoment ? currentStoryMoment.text : currentTrack?.story}
          </p>
        </motion.div>

        \
      </AnimatePresence>

      <div className="track-indicator">
        {album.tracks.map((track, index) => {
          const isActive = currentTrack?.title === track.title;

          return (
            <div
              key={track.title}
              className={`track-pill ${isActive ? "active" : ""}`}
              style={{
                borderColor: isActive ? album.colors.primary : "rgba(255,255,255,0.2)",
                boxShadow: isActive ? `0 0 18px ${album.colors.primary}66` : "none",
              }}
            >
              <span>{index + 1}</span>
              <p>{track.title}</p>
            </div>
          );
        })}
      </div>

    </div>


  );
}

export default StoryPlayer;