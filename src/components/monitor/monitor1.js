import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./monitor.css";

function Monitor() {
  const [drowsinessAlert, setDrowsinessAlert] = useState(false);
  const [yawnAlert, setYawnAlert] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [lastAlertTime, setLastAlertTime] = useState(null);
  const navigate = useNavigate();
  const pollingRef = useRef(null);
  const videoRef = useRef(null);

  const startMonitoring = async () => {
    setLoading(true);
    setError(null);

    try {
      // Access camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);

      // Call backend to start monitoring
      const response = await fetch("http://localhost:5001/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to start monitoring");
      }

      setIsMonitoring(true);
      setDrowsinessAlert(false);
      setYawnAlert(false);
      startPolling();

    } catch (err) {
      console.error("Monitoring start error:", err);
      setError(err.message);
      stopCamera();
    } finally {
      setLoading(false);
    }
  };

  const stopMonitoring = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/stop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to stop monitoring");
      }

      setIsMonitoring(false);
      setDrowsinessAlert(false);
      setYawnAlert(false);
      stopCamera();
      clearInterval(pollingRef.current);
    } catch (err) {
      console.error("Monitoring stop error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setCameraActive(false);
    }
  };

  const startPolling = () => {
    if (pollingRef.current) clearInterval(pollingRef.current);

    pollingRef.current = setInterval(async () => {
      try {
        const response = await fetch("http://localhost:5001/status");
        const data = await response.json();

        if (response.ok) {
          setDrowsinessAlert(data.drowsiness);
          setYawnAlert(data.yawn);
          
          if (data.drowsiness || data.yawn) {
            setLastAlertTime(Date.now());
          }

          if (data.status === "inactive" && isMonitoring) {
            setIsMonitoring(false);
            stopCamera();
            clearInterval(pollingRef.current);
          }
        }
      } catch (error) {
        console.error("Status polling error:", error);
      }
    }, 500); // Poll every 500ms for quick response
  };

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
      stopCamera();
    };
  }, []);

  const handleLogout = () => {
    stopCamera();
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleHomeClick = () => {
    setActiveMenu("Home");
    navigate("/monitor");
  };

  const handleAboutClick = () => {
    setActiveMenu("About Us");
    navigate("/aboutus");
  };

  const handleContactClick = () => {
    setActiveMenu("Contact Us");
    const contactSection = document.querySelector(".contact-dashboard");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      contactSection.classList.add("highlight");
      setTimeout(() => {
        contactSection.classList.remove("highlight");
      }, 2000);
    }
  };

  return (
    <div className="monitor">
      <div className="dashboard">
        <div className="hamburger-icon" onClick={toggleMenu}>
          &#9776;
        </div>
      </div>

      <nav className={`dashboard-nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li className={activeMenu === "Home" ? "highlighted" : ""} onClick={handleHomeClick}>Home</li>
          <li className={activeMenu === "About Us" ? "highlighted" : ""} onClick={handleAboutClick}>About Us</li>
          <li className={activeMenu === "Contact Us" ? "highlighted" : ""} onClick={handleContactClick}>Contact 📞</li>
          <li>FAQ🤔</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </nav>

      <header className="monitor-header">
        <h1>SNAPAWAKE</h1>
        <p>Stay safe on the road with our real-time drowsiness and yawn detection system!</p>

        {error && <div className="error-message">{error}</div>}

        {isMonitoring ? (
          <button onClick={stopMonitoring} disabled={loading}>
            {loading ? "Stopping..." : "Stop Monitoring"}
          </button>
        ) : (
          <button onClick={startMonitoring} disabled={loading}>
            {loading ? "Starting..." : "Start Monitoring"}
          </button>
        )}
      </header>

      <main className="monitor-main">
        {cameraActive && (
          <div className="camera-container">
            <video ref={videoRef} autoPlay playsInline muted className="camera-feed" />
            {drowsinessAlert && (
              <div className="alert-overlay drowsiness">
                <div className="alert-message active">🚨 Drowsiness Detected! 🚨</div>
              </div>
            )}
            {yawnAlert && (
              <div className="alert-overlay yawn">
                <div className="alert-message active">😴 Yawning Detected! 😴</div>
              </div>
            )}
          </div>
        )}

        <div className="status-indicator">
          {isMonitoring ? (
            <div className={`monitoring-status ${
              drowsinessAlert ? 'drowsiness-alert' : 
              yawnAlert ? 'yawn-alert' : ''
            }`}>
              {drowsinessAlert ? "DROWSINESS DETECTED!" 
               : yawnAlert ? "YAWNING DETECTED!" 
               : "Monitoring Active..."}
            </div>
          ) : (
            <div className="alert-message inactive">
              {cameraActive ? "Camera Ready" : "Monitoring Inactive"}
            </div>
          )}
        </div>
      </main>

      <div className="contact-dashboard">
        <h2>Contact Us:</h2>
        <div className="contact-info">
          <div>📞 Call us: +91-9876543210</div>
          <div className="vertical-line"></div>
          <div>📧 Mail us: support@snapawake.com</div>
        </div>
      </div>

      <footer className="monitor-footer">
        <p>Developed by GROUP 44</p>
      </footer>
    </div>
  );
}

export default Monitor;