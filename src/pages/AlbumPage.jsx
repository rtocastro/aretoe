import { useParams, Link } from "react-router-dom";
import { albums } from "../data/albums";

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
      </section>
    </main>
  );
}

export default AlbumPage;