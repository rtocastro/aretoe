import { useState } from "react";
import { albums } from "../data/albums";
import AlbumCard from "../components/AlbumCard";

function Home() {
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [search, setSearch] = useState("");

  const filteredAlbums = albums
    .filter((album) => {
      const matchesType = filter === "All" || album.type === filter;

      const searchLower = search.toLowerCase();

      const matchesSearch =
        album.title.toLowerCase().includes(searchLower) ||
        album.tracks.some((track) =>
          track.title.toLowerCase().includes(searchLower)
        );

      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      return sortOrder === "newest"
        ? Number(b.year) - Number(a.year)
        : Number(a.year) - Number(b.year);
    });


  return (
    <main className="home-page">
      <section className="hero">
        <p className="eyebrow">music / stories / color</p>
        <h1>R'To</h1>
        <h2>/ärtō/</h2>
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
        <input
          type="text"
          placeholder="Search albums or tracks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <br />
      </section>

      <section className="album-grid">
        {filteredAlbums.length > 0 ? (
          filteredAlbums.map((album) => (
            <AlbumCard key={album.slug} album={album} />
          ))
        ) : (
          <p className="no-results">No results found.</p>
        )}
      </section>
    </main>
  );
}

export default Home;