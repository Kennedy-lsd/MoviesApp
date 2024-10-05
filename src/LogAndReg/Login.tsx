import { useState, useEffect } from "react";
import { AuthError } from "../typeConstEct/interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<AuthError | null>(null);

  const handleLogin = async (
    email: string | null,
    username: string | null,
    password: string | null,
    avatar: string | null
  ) => {
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password, avatar }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to login");
      }

      const data = await response.json();
      const { token, username: returnedUsername, email: returnedEmail, avatar: returnedAvatar } = data;

      localStorage.setItem("jwtToken", token);
      localStorage.setItem("username", returnedUsername);
      localStorage.setItem("email", returnedEmail);
      localStorage.setItem("avatar", returnedAvatar);

      fetchProtectedData(token);
      setToken(token);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError({ message: error.message });
    }
  };

  const fetchProtectedData = async (token: string) => {
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/users/login/status", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch protected data");
      }

      const data = await response.json();
      console.log("Protected data:", data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError({ message: error.message });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const username = formData.get("username") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const avatar = 'default';

      handleLogin(email, username, password, avatar);
      console.log(username);
      console.log(password);
      console.log(email);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError({ message: error.message });
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/main");
    }
  }, [token, navigate]);

  return (
    <div className="container mt-5 pt-5">
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
              <h3 className="card-title text-center">Login</h3>
              {error && <div className="alert alert-danger">{error.message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-danger">
                    Login
                  </button>
                </div>
              </form>
              {/* Button to navigate to Register Page */}
              <div className="text-center mt-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/reg")} // Navigate to Register Page
                >
                  Go to Register Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
