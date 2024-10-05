import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { Film } from "../typeConstEct/interfaces"; // Assuming this is where your types are

const FilmDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get film ID from URL
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/videos/${id}`);

        if (response.ok) {
          const data = await response.json();
          setFilm(data);
        } else {
          console.error("Failed to fetch film details");
        }
      } catch (error) {
        console.error("Error fetching film details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!film || !film.Videotable) {
    return <div className="text-center">Film not found</div>;
  }

  // Extract video ID from the trailer URL if it's a YouTube link
  const getYoutubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : url; // return original URL if not YouTube
  };

  const trailerEmbedUrl = getYoutubeEmbedUrl(film.Videotable.url);

  return (
    <div
      className="container mt-5"
      style={{
        color: "#f8f9fa",
        backgroundColor: "#141414",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)",
      }}
    >
      <button className="btn btn-danger mb-4" onClick={() => navigate("/main")}>
        Back to Main
      </button>
      <div className="row">
        <div className="col-md-6">
          <div className="position-relative">
            <img
              src={
                film.Imageforvideotable?.image
                  ? `http://localhost:8000/${film.Imageforvideotable.image}`
                  : "default-poster.jpg"
              }
              alt={film.Videotable.title}
              className="img-fluid rounded shadow"
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
          </div>
          {/* Group name under the image */}
          <div
            className="text-center"
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.7)",
              color: "#fff",
              padding: "10px",
              fontSize: "1.5rem",
              fontWeight: "bold",
              borderRadius: "0 0 8px 8px",
            }}
          >
            {film.Videotable.title}
          </div>
          {/* Additional Content Below the Image */}
          <div
            className="text-center"
            style={{
              backgroundColor: "#222",
              color: "#fff",
              padding: "10px",
              fontSize: "1.3rem",
              borderRadius: "0 0 8px 8px",
            }}
          >
            <div className="mt-4">
              <p>ID: {film.Videotable.id || "N/A"}</p>
              <p>Description: {film.Videotable.description || "N/A"}</p>
              <p>Genre: {film.Videotable.group || "N/A"}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="mb-3">{film.Videotable.title}</h2>
          <p className="text-bold">{film.Videotable.description}</p>

          {/* Embed trailer */}
          <div className="my-4">
            <h4>Trailer</h4>
            <iframe
              width="100%"
              height="500" // Increased height
              src={trailerEmbedUrl}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded shadow"
            ></iframe>
          </div>
        </div>
      </div>
      <footer
        className="text-center text-light py-4 mt-auto"
        style={{ backgroundColor: "#141414" }}
      >
        <p>&copy; 2024 Your Movie App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FilmDetails;
