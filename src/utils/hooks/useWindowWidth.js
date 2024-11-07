'use client';

import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [smallerWindow, setSmallerWindow] = useState(false);
  // const [windowDimensions, setWindowDimensions] = useState({
  //   width: undefined,
  //   height: undefined,
  // });

  useEffect(() => {
    // Check if window is defined (meaning we're on the client)
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setSmallerWindow(window.innerWidth < 979); 
          // setWindowDimensions({
          //   width: window.innerWidth,
          //   height: window.innerHeight,
          // });
      };

      // Initial check
      handleResize();

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return { smallerWindow };
}

export default useWindowWidth;
