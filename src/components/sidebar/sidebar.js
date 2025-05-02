import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [tempHighlight, setTempHighlight] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const state = location.state;
    if (location.pathname === "/monitor" && state?.from === "contact") {
      setActiveSection("contact");
      setTempHighlight(true);

      const timeout = setTimeout(() => {
        setTempHighlight(false);
      }, 2000);

      return () => clearTimeout(timeout);
    } else if (location.pathname === "/monitor") {
      setActiveSection("home");
    } else if (location.pathname === "/aboutus") {
      setActiveSection("aboutus");
    } else if (location.pathname === "/faq") {
      setActiveSection("faq");
    } else {
      setActiveSection("");
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleHomeClick = () => {
    navigate("/monitor");
    setIsSidebarOpen(false);
  };

  const handleContactClick = () => {
    navigate("/monitor", { state: { from: "contact", scrollToContact: true } });
    setIsSidebarOpen(false);
  };

  const handleAboutUsClick = () => {
    navigate("/aboutus");
    setIsSidebarOpen(false);
  };

  const handleFaqClick = () => {
    navigate("/faq");
    setIsSidebarOpen(false);
  };

  return (
    <div className="sidebar-container">
      <button className="hamburger-button" onClick={toggleSidebar}>
        {isSidebarOpen ? "✖" : "☰"}
      </button>

      {isSidebarOpen && (
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <button
            onClick={handleHomeClick}
            className={`sidebar-link ${activeSection === "home" ? "active" : ""}`}
          >
            Home
          </button>

          <button
            onClick={handleAboutUsClick}
            className={`sidebar-link ${activeSection === "aboutus" ? "active" : ""}`}
          >
            About Us
          </button>

          <button
            onClick={handleContactClick}
            className={`sidebar-link ${activeSection === "contact" ? "active" : ""}`}
          >
            Contact📱
          </button>

          <button
            onClick={handleFaqClick}
            className={`sidebar-link ${activeSection === "faq" ? "active" : ""}`}
          >
            FAQ 🤔
          </button>

          <button onClick={handleLogout} className="sidebar-link">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
