import { useParams, Link } from "react-router-dom";
import { albums } from "../data/albums";
import StoryPlayer from "../components/StoryPlayer";

function AlbumPage() {
  const { slug } = useParams();
  const album = albums.find((item) => item.slug === slug);

  if (!album) {
    return (
      <main className="album-page">
        <h1>Album not found</h1>
        <Link to="/">Back home</Link>
      </main>
    );
  }

  return (
    <main
      className="album-page"
      style={{
        background: `linear-gradient(135deg, ${album.colors.background}, ${album.colors.primary}33, ${album.colors.secondary}22)`,
      }}
    >
      <Link to="/" className="back-link">
        ← Back to aretoe
      </Link>

      <section className="album-hero">
        <p className="eyebrow">{album.artist}</p>
        <h1 style={{ color: album.colors.primary }}>{album.title}</h1>
        <p>{album.year}</p>
        <p className="album-story">{album.story}</p>
        <section className="album-player-section">
  {album.spotifyEmbed && (
<iframe
  data-testid="embed-iframe"
  style={{ borderRadius: "12px" }}
  src="https://open.spotify.com/embed/album/0QZtA1BIm7CxoH0g5ghzPw?utm_source=generator&theme=0"
  width="100%"
  height="352"
  frameBorder="0"
  allowFullScreen
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
  title={`${album.title} Spotify player`}
></iframe>
  )}

  <StoryPlayer album={album} />
</section>
      </section>
    </main>
  );
}

export default AlbumPage;