import { useState } from "react";
import { albums } from "../data/albums";
import AlbumCard from "../components/AlbumCard";

function Home() {
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredAlbums = albums
    .filter((album) => filter === "All" || album.type === filter)
    .sort((a, b) => {
      return sortOrder === "newest"
        ? Number(b.year) - Number(a.year)
        : Number(a.year) - Number(b.year);
    });

  return (
    <main className="home-page">
      <section className="hero">
        <p className="eyebrow">music / stories / color</p>
        <h1>aretoe</h1>
        <p>Interactive music experiences by R&apos;To.</p>
      </section>

      <section className="controls">
        {["All", "Album", "EP", "Single"].map((type) => (
          <button
            key={type}
            className={filter === type ? "control-active" : ""}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}

        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </section>

      <section className="album-grid">
        {filteredAlbums.map((album) => (
          <AlbumCard key={album.slug} album={album} />
        ))}
      </section>
    </main>
  );
}

export default Home;