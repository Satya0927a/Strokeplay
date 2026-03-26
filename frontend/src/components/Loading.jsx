import React from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');

  .loading-box {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 28px 36px;
    background: #0f0f0f;
    border: 1px solid #2a2a2a;
    border-radius: 12px;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.04) inset,
      0 8px 32px rgba(0,0,0,0.5);
    font-family: 'DM Mono', monospace;
    min-width: 140px;
  }

  .loading-spinner {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #2a2a2a;
    border-top-color: #e8e8e8;
    animation: spin 0.75s linear infinite;
  }

  .loading-text {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #666;
    white-space: nowrap;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }
`;

export default function Loading({ text = "Loading..." }) {
  return (
    <>
      <style>{styles}</style>
      <div className="loading-box" role="status" aria-label={text}>
        <div className="loading-spinner" aria-hidden="true" />
        <span className="loading-text">{text}</span>
      </div>
    </>
  );
}