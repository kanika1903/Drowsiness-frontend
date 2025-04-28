import React from "react";
import { useNavigate } from "react-router-dom";
import "./about.css";
import Sidebar from "../sidebar/sidebar";

const About = () => {
  const navigate = useNavigate();

  const AboutCont = () => {
    return (
      <div className="about-text">
        <h1>ABOUT US</h1>
        <p>
          Snap Awake is a real-time drowsiness detection system designed to improve road safety by keeping
          drivers alert and responsive. Utilizing advanced computer vision techniques, the system monitors
          signs of fatigue such as frequent blinking, prolonged eye closure, and head nodding. When drowsiness
          is detected, an immediate audio and visual alert is triggered to prevent potential accidents.
          <br /><br />
          Our goal is to reduce road mishaps caused by microsleep and inattentiveness. Snap Awake is optimized
          to run in real-time with minimal system resources, making it ideal for both personal and commercial vehicle
          monitoring. Whether you're a daily commuter, a logistics driver, or part of a fleet management system,
          Snap Awake provides a reliable safety net by acting before it's too late.
        </p>
      </div>
    );
  };

  return (
    <div className="about-page">
        <header className="about-header">
          <div id="about-us-page" className="navbar">
            <span id="about-logo">SNAP-AWAKE</span>
          </div>
         </header>

      <main className="about-main">
        <div className="about-content">
          <AboutCont />
          <div className="about-illustration">
            <img src="/abtp.jpg" alt="drowsiness detection" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
