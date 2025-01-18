import React, { useState } from 'react';

const FlashComponent = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false); // Hide the component when the user dismisses it
  };

  if (!isVisible) return null; // Don't render if dismissed

  return (
    <div style={styles.overlay}>
      <div style={styles.flashBox}>
        <h2 style={styles.heading}>Welcome to Our Website!</h2>
        <p style={styles.message}>
          Discover amazing features and offers. Click below to explore!
        </p>
        <button style={styles.ctaButton}>Learn More</button>
        <button style={styles.closeButton} onClick={handleClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark translucent background
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  flashBox: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
    animation: 'fadeIn 1s ease', // Keyframe animation for entry
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    position: 'relative',
  },
  heading: {
    fontSize: '1.5rem',
    color: '#ff5733',
    marginBottom: '10px',
  },
  message: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '20px',
  },
  ctaButton: {
    backgroundColor: '#ff5733',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginBottom: '10px',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    color: '#999',
    cursor: 'pointer',
  },
};

export default FlashComponent;
