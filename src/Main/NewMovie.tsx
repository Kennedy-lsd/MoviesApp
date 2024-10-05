import { useState, useEffect } from "react";
import { AuthError } from "../typeConstEct/interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar"; // Make sure this path is correct

export function Movie() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null); // New state for avatar
  const [error, setError] = useState<AuthError | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar"); // Remove avatar if stored
    navigate("/");
  };

  const handleCreate = async (
    title: string | null,
    url: string | null,
    description: string | null,
    group: string | null,
    image: File | null
  ) => {
    setError(null);

    try {
      if (!image) throw new Error("Please upload an image.");

      const imageData = new FormData();
      imageData.append("image", image);

      const imageResponse = await fetch("http://localhost:8000/api/images", {
        method: "POST",
        body: imageData,
      });

      if (!imageResponse.ok) {
        const data = await imageResponse.json();
        throw new Error(data.error || "Failed to upload image");
      }

      const imageResult = await imageResponse.json();
      const imageId = imageResult.id;

      const videoResponse = await fetch("http://localhost:8000/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          url,
          description,
          group,
          imageId,
        }),
      });

      if (!videoResponse.ok) {
        const data = await videoResponse.json();
        throw new Error(data.error || "Failed to create video");
      }

      const videoResult = await videoResponse.json();
      console.log("Video created successfully:", videoResult);
      navigate("/main");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const url = formData.get("url") as string;
    const description = formData.get("description") as string;
    const group = formData.get("group") as string;

    handleCreate(title, url, description, group, image);
  };

  useEffect(() => {
    localStorage.removeItem("isMain");
    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar"); // Get avatar from local storage
    setUsername(username);
    setAvatar(avatar);
  }, [setUsername, setAvatar]);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    // Check if the user is logged in
    if (!jwtToken) {
      navigate("/"); // Redirect to login if not logged in
      return;
    }
  }, [navigate]);
  return (
    <>
      {/* NavBar component with props */}
      <NavBar
        username={username || ""}
        avatar={avatar || ""}
        onLogout={handleLogout}
        onSearch={() => {}}
      />

      <div
        className="container mt-5"
        style={{
          minHeight: "86vh",
          height: "100%", // Ensure full height
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div
              className="card text-light p-4 shadow"
              style={{ backgroundColor: "#141414" }}
            >
              <h3 className="card-title text-center mb-4">Add A New Movie</h3>
              {error && (
                <div className="alert alert-danger">{error.message}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="title">Movie Title</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light"
                    id="title"
                    name="title"
                    placeholder="Enter movie title"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="url">Movie URL</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light"
                    id="url"
                    name="url"
                    placeholder="Enter movie URL"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control bg-dark text-light"
                    id="description"
                    name="description"
                    placeholder="Enter movie description"
                    rows={3}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="group">Genre</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light"
                    id="group"
                    name="group"
                    placeholder="Enter genre"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="image">Upload Image</label>
                  <input
                    type="file"
                    className="form-control bg-dark text-light"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </div>

                {imagePreview && (
                  <div className="mb-3 text-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        maxWidth: "300px",
                        maxHeight: "300px",
                        objectFit: "cover",
                      }}
                      className="img-fluid rounded"
                    />
                  </div>
                )}

                <button type="submit" className="btn btn-danger w-100">
                  Create Movie
                </button>
              </form>
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
    </>
  );
}
