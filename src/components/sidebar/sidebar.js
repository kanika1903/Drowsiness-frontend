import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleHomeClick = () => {
    if (window.location.pathname === "/monitor") {
      window.location.reload(); // Already on monitor page, reload
    } else {
      navigate("/monitor"); // Navigate to monitor page
    }
  };

  return (
    <div className="sidebar-container">
      <button className="hamburger-button" onClick={toggleSidebar}>
        {isSidebarOpen ? "✖" : "☰"}
      </button>

     {isSidebarOpen && <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button onClick={handleHomeClick} className="sidebar-link">Home</button>
        <Link to="/aboutus" className="sidebar-link">About Us</Link>
        <Link to="/contact" className="sidebar-link">Contact</Link>
        <Link to="/faq" className="sidebar-link">FAQ</Link>
        <button onClick={handleLogout} className="sidebar-link">Logout</button>
      </div>}
    </div>
  );
}

export default Sidebar;
