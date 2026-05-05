import { albums } from "../data/albums";
import AlbumCard from "../components/AlbumCard";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <p className="eyebrow">music / stories / color</p>
        <h1>aretoe</h1>
        
        <p>Interactive music experiences by R&apos;To.</p>
      </section>

      <section className="album-grid">
        {albums.map((album) => (
          <AlbumCard key={album.slug} album={album} />
        ))}
      </section>
    </main>
  );
}

export default Home;