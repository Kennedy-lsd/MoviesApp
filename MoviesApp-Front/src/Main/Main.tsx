import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Film } from "../typeConstEct/interfaces";
import { Link } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: "", avatar: "" });
  const [films, setFilms] = useState<Film[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // To store search query

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("isMain", "true");

    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      navigate("/");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/users/login/status",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData({ username: data.username, avatar: data.avatar });
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const fetchFilms = async (query: string = "") => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/videos?group=${query}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        const films: Film[] = data.map((item: Film) => ({
          Videotable: {
            id: item.Videotable.id,
            title: item.Videotable.title,
            url: item.Videotable.url,
            description: item.Videotable.description,
            group: item.Videotable.group,
            imageId: item.Videotable.imageId,
          },
          Imageforvideotable: {
            image: item.Imageforvideotable.image,
          },
        }));

        setFilms(films);
      } else {
        console.error("Failed to fetch films");
      }
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  useEffect(() => {
    fetchFilms(searchQuery);
  }, [searchQuery]);

  const showAllFilms = () => {
    setSearchQuery("");
  };

  return (
    <div
      className="text-light"
      style={{
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#141414",
      }}
    >
      <NavBar
        username={userData.username}
        avatar={userData.avatar}
        onLogout={handleLogout}
        onSearch={setSearchQuery}
      />
      <div className="container mt-4 flex-grow-1">
        <h2 className="mb-4 text-center">Trending Now</h2>
        <div className="text-center mb-4">
          <button
            className="btn btn-danger"
            onClick={showAllFilms}
          >
            Show All
          </button>
        </div>
        <div className="row">
          {films.map((film) => (
            <div key={film.Videotable.id} className="col-md-4 mb-4">
              <div className="card text-white border-0 shadow" style={{backgroundColor: "#1a1a1a"}}>
                <img
                  src={
                    film.Imageforvideotable.image
                      ? `http://localhost:8000/${film.Imageforvideotable.image}`
                      : "default-poster.jpg"
                  }
                  alt={film.Videotable.title}
                  className="card-img-top"
                  style={{ height: "300px", width: "100%", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{film.Videotable.title}</h5>
                  <p className="card-text">{film.Videotable.description}</p>
                  <p
                    className="card-text"
                    style={{ fontSize: "20px", color: "#E52B50" }}
                  >
                    {film.Videotable.group}
                  </p>
                  <Link
                    to={`/film/${film.Videotable.id}`}
                    className="btn btn-danger" //pizdez kakoi danger 
                  >
                    Watch Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
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

export default Main;
