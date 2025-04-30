import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./monitor.css";
import Header from "../header/header";
import Copyright from "../right/right"; // Import the new Copyright component

function Monitor() {
  const [drowsinessAlert, setDrowsinessAlert] = useState(false);
  const [yawnAlert, setYawnAlert] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [lastAlertTime, setLastAlertTime] = useState(null);
  const [showContact, setShowContact] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const pollingRef = useRef(null);
  const videoRef = useRef(null);

  const startMonitoring = async () => {
    setLoading(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);

      const response = await fetch("http://localhost:5001/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to start monitoring");

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
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to stop monitoring");

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

          if (data.drowsiness || data.yawn) setLastAlertTime(Date.now());

          if (data.status === "inactive" && isMonitoring) {
            setIsMonitoring(false);
            stopCamera();
            clearInterval(pollingRef.current);
          }
        }
      } catch (error) {
        console.error("Status polling error:", error);
      }
    }, 500);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const contactParam = params.get("contact");
    if (contactParam === "true") setShowContact(true);
  }, [location.search]);

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
      stopCamera();
    };
  }, []);

  const toggleContact = () => setShowContact((prev) => !prev);

  return (
    <div className="monitor-container">
      <Header />

      <div className="monitor-content">
        <div className="monitor-subheader">
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
        </div>

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
                drowsinessAlert ? "drowsiness-alert" :
                yawnAlert ? "yawn-alert" : ""}`}>
                {drowsinessAlert ? "DROWSINESS DETECTED!" :
                 yawnAlert ? "YAWNING DETECTED!" :
                 "Monitoring Active..."}
              </div>
            ) : (
              <div className="alert-message inactive">
                {cameraActive ? "Camera Ready" : "Monitoring Inactive"}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Contact Us Section */}
      <div className="contact-dashboard">
        <button className="contact-toggle" onClick={toggleContact}>
          {showContact ? "Hide Contact Us" : "Contact Us"}
        </button>
        {showContact && (
          <div className="contact-content">
            <h2>Contact Us</h2>
            <div className="contact-info">
              <p>Phone: (+91) 9785303234</p>
              <p>Email: support@snapawake.com</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <Copyright />
    </div>
  );
}

export default Monitor;
