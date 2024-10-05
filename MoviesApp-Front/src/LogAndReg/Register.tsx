import { useState } from "react";
import { AuthError } from "../typeConstEct/interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<AuthError | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleRegister = async (
    email: string | null,
    username: string | null,
    password: string | null,
    avatar: File | null
  ) => {
    setError(null);

    try {
      const formData = new FormData();
      formData.append("email", email || "");
      formData.append("username", username || "");
      formData.append("password", password || "");
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        body: formData, // Using FormData for file upload
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to register");
      }

      navigate("/"); // Redirect on success
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError({ message: error.message });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    handleRegister(email, username, password, avatarFile);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  return (
    <div className="container mt-5  text-light" style={{backgroundColor: "#141414"}}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center mb-4">
            {/* Netflix Logo */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
              alt="Netflix Logo"
              style={{ width: "150px", marginBottom: "20px" }} // Increased logo size
            />
          </div>
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Register</h3>
              {error && <div className="alert alert-danger">{error.message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="avatar">Avatar</label>
                  <input
                    type="file"
                    className="form-control"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange} // Handle avatar file change
                  />
                </div>
                {avatarPreview && (
                  <div className="container row mb-3 justify-content-center">
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="img-thumbnail"
                      style={{ maxWidth: "150px", maxHeight: "150px" }}
                    />
                  </div>
                )}
                <button type="submit" className="btn btn-danger w-100 mb-3">
                  Register
                </button>
              </form>
              {/* Button to navigate to Login Page */}
              <div className="text-center">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/")}
                >
                  Go to Login Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
