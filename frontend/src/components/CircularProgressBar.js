import React, { useEffect, useState } from 'react';
import './CircularProgressBar.css';

const CircularProgressBar = ({ percentage, color }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((100 - percentage) / 100) * circumference;

  const [animatedOffset, setAnimatedOffset] = useState(circumference);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedOffset(strokeDashoffset);
    }, 100); // slight delay to trigger animation
    return () => clearTimeout(timeout);
  }, [strokeDashoffset]);

  return (
    <div className="circular-progressbar-glass">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle
          className="circle-bg"
          r={radius}
          cx="50"
          cy="50"
          stroke={color}
          strokeOpacity="0.15"
          strokeWidth="10"
          fill="none"
        />
        <circle
          className="circle-progress"
          r={radius}
          cx="50"
          cy="50"
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset}
        />
      </svg>
      <div className="progress-text">{percentage}%</div>
    </div>
  );
};

export default CircularProgressBar;
