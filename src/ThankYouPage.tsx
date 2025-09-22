import React from 'react';
import './ThankYou.css';

export const ThankYouPage: React.FC = () => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        <img src="/medal.png" alt="Medal" className="thank-you-medal" />
        
        <h1 className="thank-you-title">
          Vielen Dank! / Thank You!
        </h1>
        
        <h2 className="thank-you-subtitle">
          Danke für Ihre Teilnahme am Tag der offenen Tür!<br />
          Thank you for participating in our Open Day!
        </h2>
        
        <div className="thank-you-message">
          <p>
            🧠 <strong>Max Planck Institute for Neurobiology</strong><br />
            Exploring the brain with cutting-edge AI technology
          </p>
          
          <p>
            🤖 Sie haben gerade KI-basierte Pose-Erkennung erlebt!<br />
            You just experienced AI-powered pose detection!
          </p>
          
          <p>
            🎯 Powered by TensorFlow.js & MoveNet<br />
            Real-time machine learning in your browser
          </p>
        </div>

        <div className="thank-you-credits">
            <p>
                Made by <strong>Aditya Iyer</strong> and <strong>Peter Christ</strong>.<br />
                With assistance from ChatGPT 4.1 &amp; Gemini.<br />
                Images from Freepik.
            </p>
        </div>

        <div className="thank-you-stats">
          <div className="stat-item">
            <img src="/happy.png" alt="Happy" className="stat-icon" />
            <span>Interactive Games Completed</span>
          </div>
          <div className="stat-item">
            <img src="/superman.png" alt="Poses" className="stat-icon" />
            <span>AI Poses Detected</span>
          </div>
          <div className="stat-item">
            <img src="/wow.png" alt="Science" className="stat-icon" />
            <span>Science & Fun Combined</span>
          </div>
        </div>

        <div className="thank-you-footer">
          <p>
            Besuchen Sie uns online / Visit us online:<br />
            <strong>www.mpinb.mpg.de</strong>
          </p>
        </div>
      </div>
    </div>
  );
};