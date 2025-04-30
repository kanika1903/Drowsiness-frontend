import React, { useState } from "react";
import Header from "../header/header";
import Copyright from "../right/right"; // ✅ Import copyright component
import "./faq.css";

const FAQ = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleAnswer = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const faqData = [
    { question: "What is Snap Awake?", answer: "Snap Awake is a real-time drowsiness detection system that uses computer vision to monitor user alertness." },
    { question: "How does the monitoring system work?", answer: "The system tracks eye and head movements using OpenCV and dlib to detect drowsiness signs." },
    { question: "How can I log in?", answer: "You can log in using your credentials or social media login options." },
    { question: "What happens if the system detects drowsiness?", answer: "The system triggers an alert, notifying the user to take action." },
    { question: "Is Snap Awake free to use?", answer: "Yes, Snap Awake is free to use for basic monitoring features." },
    { question: "Can I use Snap Awake on any device?", answer: "Snap Awake is compatible with devices that support a camera and run a modern web browser." },
    { question: "Does Snap Awake require an internet connection?", answer: "An internet connection is only required for login and data syncing, not for real-time monitoring." },
    { question: "How accurate is drowsiness detection?", answer: "The system’s accuracy depends on environmental factors like lighting and camera quality." },
    { question: "Can Snap Awake detect other signs of fatigue?", answer: "Yes, it can detect yawning, eye blinking, and head tilt as indicators of fatigue." },
    { question: "How can I contact support?", answer: "For support, visit our contact page or email us at support@snapawake.com." },
  ];

  return (
    <div className="faq-container">
      <Header />

      <div className="faq-heading-image">
        <img src="/faq.png" alt="FAQ Heading" className="faq-heading-img" />
      </div>
      <h2 className="faq-heading-text">Here are some common questions about Snap-Awake:</h2>

      <main className="faq-main">
        <div className="faq-content-two-column">
          <div className="faq-list">
            {faqData.map((item, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question" onClick={() => toggleAnswer(index)}>
                  <h3>{item.question}</h3>
                  <span className="faq-toggle">{expanded === index ? "-" : "+"}</span>
                </div>
                {expanded === index && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="faq-side-image">
            <img src="/faq2.png" alt="Side Visual" />
          </div>
        </div>
      </main>

      {/* ✅ Reusable Footer */}
      <Copyright />
    </div>
  );
};

export default FAQ;
