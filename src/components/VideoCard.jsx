function VideoCard({ video }) {
  return (
    <article className="video-card">
      <div className="video-frame">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      <div className="video-info">
        <span>{video.type}</span>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </div>
    </article>
  );
}

export default VideoCard;