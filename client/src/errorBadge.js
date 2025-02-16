import React from 'react';

const ErrorBadge = ({ message }) => {
  return (
    <div className="error-badge">
      <span className="error-icon">!</span>
      <span className="error-message">{message}</span>
    </div>
  );
};

export default ErrorBadge;