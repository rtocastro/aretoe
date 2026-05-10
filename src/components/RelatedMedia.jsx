function RelatedMedia({ media }) {
  return (
    <section className="related-media">
      {media.map((item) => {
        if (item.type === "youtube") {
          return (
            <article
              key={item.youtubeId}
              className="related-media-card"
            >
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>

              <h3>{item.title}</h3>
            </article>
          );
        }

        return null;
      })}
    </section>
  );
}

export default RelatedMedia;