import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    deviceType: undefined,
  });

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      let deviceType;
      if (width <= 480) {
        deviceType = 'mobile';
      } else if (width <= 768) {
        deviceType = 'tablet';
      } else {
        deviceType = 'desktop';
      }

      setWindowSize({
        width: width,
        height: window.innerHeight,
        deviceType: deviceType,
      });
    }
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;