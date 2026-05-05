import { Link } from "react-router-dom";

function AlbumCard({ album }) {
    return (
        <Link
            to={`/albums/${album.slug}`}
            className="album-card"
            style={{
                borderColor: album.colors.primary,
                boxShadow: `
    0 0 10px ${album.colors.primary},
    0 0 20px ${album.colors.primary}66,
    0 0 40px ${album.colors.primary}33
  `,
            }}
        >
            <h2 style={{ color: album.colors.primary }}>
                {album.title}
            </h2>
            <p>{album.artist}</p>
            <span>{album.year}</span>
        </Link>
    );
}

export default AlbumCard;