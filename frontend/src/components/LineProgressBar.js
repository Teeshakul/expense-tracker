import React from 'react';
import './LineProgressBar.css';

const LineProgressBar = ({ label, percentage, lineColor }) => {
  return (
    <div className="line-progressbar-glass">
      <div className="label-row">
        <span className="label-text">{label}</span>
        <span className="percent-text">{percentage}%</span>
      </div>
      <div className="line-track">
        <div
          className="line-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: lineColor,
          }}
        ></div>
      </div>
    </div>
  );
};

export default LineProgressBar;
