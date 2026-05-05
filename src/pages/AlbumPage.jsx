import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { albums } from "../data/albums";
import StoryPlayer from "../components/StoryPlayer";
import { motion } from "framer-motion";

function AlbumPage() {
    const { slug } = useParams();
    const album = albums.find((item) => item.slug === slug);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [externalTime, setExternalTime] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(null);

    useEffect(() => {
        function handleMouseMove(event) {
            setMousePosition({
                x: event.clientX,
                y: event.clientY,
            });
        }

        window.addEventListener("mousemove", handleMouseMove);

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    if (!album) {
        return (
            <main className="album-page">

                <h1>Album not found</h1>
                <Link to="/">Back home</Link>
            </main>
        );
    }

    return (
        <motion.main
            className={`album-page animated-album-bg ${currentTrack?.visual || ""}`}
            style={{
                "--album-primary": album.colors.primary,
                "--album-secondary": album.colors.secondary,
                "--album-background": album.colors.background,
                "--intensity": externalTime / (album.totalDuration || 1),
                "--track-shift": currentTrack
                    ? album.tracks.indexOf(currentTrack) * 0.1
                    : 0,
            }}

            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
        >
            <div
                className="cursor-glow"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    background: album.colors.primary,
                }}
            />
            <div className="album-theme">
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
                                src={album.spotifyEmbed}
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allowFullScreen
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                title={`${album.title} Spotify player`}
                            ></iframe>
                        )}

                        <StoryPlayer
                            album={album}
                            onTimeUpdate={setExternalTime}
                            onTrackChange={setCurrentTrack}
                        />
                    </section>
                </section>
            </div>
        </motion.main>
    );
}

export default AlbumPage;