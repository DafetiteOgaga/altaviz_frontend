import React from 'react';
import useWindowSize from './useWindowSize';
import styles from './SingleItemButton.module.css';

function SingleItemButton({
  loading,
  handleClick,
  item,
  loadingText,
  buttonText,
}) {
  const { deviceType } = useWindowSize();

  const getContainerClassName = () => {
    switch(deviceType) {
      case 'mobile':
        return styles.mobileContainer;
      case 'tablet':
        return styles.tabletContainer;
      case 'desktop':
      default:
        return styles.desktopContainer;
    }
  };

  const getTextClassName = () => {
    switch(deviceType) {
      case 'mobile':
        return styles.mobileText;
      case 'tablet':
        return styles.tabletText;
      case 'desktop':
      default:
        return styles.desktopText;
    }
  };

  return (
    <div
      className={`${styles.customButton} ${getContainerClassName()} ${loading ? styles.disabledButton : ''}`}
      onClick={(e) => !loading && handleClick(e, item.id)}
    >
      <h5 className={`${styles.buttonText} ${getTextClassName()}`}>
        {loading ? loadingText : buttonText}
      </h5>
    </div>
  );
}

export default SingleItemButton;