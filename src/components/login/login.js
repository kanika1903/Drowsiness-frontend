import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token || "dummyToken");
        alert("Login successful!");
        navigate("/monitor");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-page split-layout">
      <div className="left-side">
        <h1 id="brand-title">SNAP-AWAKE </h1>
      </div>
      <div className="right-side">
        <div className="login-box">
          <div className="avatar">
            <i className="fas fa-user"></i>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
            </div>
            <button type="submit" className="login-btn">LOGIN</button>
          </form>
          <div className="signup-link">
            Don’t have an account? <Link to="/signup">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
