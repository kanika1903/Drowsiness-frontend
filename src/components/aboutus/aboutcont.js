import React from "react";

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

export default AboutCont;
