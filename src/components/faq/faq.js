import React, { useState } from "react";
import "./faq.css"; // Import your custom styles

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
      {/* Header Section */}
      <header className="faq-header">
        <div className="navbar">
          <span id="faq-logo">SNAP-AWAKE</span>
        </div>
      </header>

      {/* Sub-heading */}
      <div className="faq-heading">
        <h1>FAQ's</h1>
        <h2>Frequently Asked Questions</h2>
        <h2>Here are some common questions about Snap-Awake</h2>
      </div>

      {/* Main FAQ Content */}
      <main className="faq-main">
        <div className="faq-content">
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
        </div>
      </main>

      {/* Fat Image Section */}
      <div className="faq-image-section">
        <img src="/faq.jpeg" alt="Fat Banner" className="faq-image" />
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="copyright">© 2025 SnapAwake. All Rights Reserved.</div>
      </footer>
    </div>
  );
};

export default FAQ;
