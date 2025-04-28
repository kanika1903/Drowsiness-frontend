import React, { useState } from "react";
import "./faq.css"; // Import your custom styles

const FAQ = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleAnswer = (index) => {
    setExpanded(expanded === index ? null : index); // Toggle between open and closed
  };

  const faqData = [
    { question: "What is Snap Awake?", answer: "Snap Awake is a real-time drowsiness detection system..." },
    { question: "How does the monitoring system work?", answer: "The system uses OpenCV and dlib to monitor eye movements..." },
    { question: "How can I log in?", answer: "You can log in using your credentials or via social media login..." },
    { question: "What happens if the system detects drowsiness?", answer: "The system triggers an alert to warn the user..." },
    // Add more FAQ items as needed
  ];

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <h2>{item.question}</h2>
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
  );
};

export default FAQ;
