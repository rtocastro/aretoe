import { useState } from "react";
import { albums } from "../data/albums";
import AlbumCard from "../components/AlbumCard";
import { useNavigate } from "react-router-dom";
import rtoImage from "../assets/rtoimage.png";

function Home() {
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
        <p>

          Music, code, and creative experiments by R&apos;To.

        </p>
      </section>

      <button
        className="start-button"
        onClick={() => navigate("/albums/12-7k")}
      >
        ▶ Start with 12.7k
      </button>
      <br />
      <br />

<section className="about-section">
  <img src={rtoImage} alt="R'To artist portrait" />

  <div>
    <p className="eyebrow">about</p>
    <h2>R'To</h2>
    <p>
      R'To is a music and creative coding project blending experimental sound,
      color-driven visuals, and interactive storytelling.
    </p>
  </div>
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

      <section className="featured">
        <h2>Featured</h2>
        <AlbumCard album={albums.find(a => a.slug === "12-7k")} />
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

      <footer className="footer">
        <p>Follow / connect</p>
        <div>
          <a href="https://threads.com/@rtocastro" target="_blank">Threads</a>
          <a href="https://instagram.com/rtocastro" target="_blank">Instagram</a>
          <a href="https://open.spotify.com/artist/4lV1osNqKB7XOXaBIV0710" target="_blank">Spotify</a>
          <a href="https://www.youtube.com/channel/UC5vrZs5gw7elemOs364qGLQ" target="_blank">YouTube</a>
        </div>
      </footer>
    </main>
  );
}

export default Home;