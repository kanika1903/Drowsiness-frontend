import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import  "./signup.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 2) {
      setError("Password must be at least 2 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! Please log in.");
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      setError("Failed to connect to the server. Please try again later.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="signup-page split-layout">
      <div className="left-side">
        <h1 className="brand-title">SNAP-AWAKE</h1>
      </div>
      <div className="right-side">
        <div className="signup-box">
          <div className="avatar">
            <i className="fas fa-user-plus"></i>
          </div>
          {error && <div className="error-message">{error}</div>}
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
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="signup-btn">SIGN UP</button>
          </form>
          <div className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
