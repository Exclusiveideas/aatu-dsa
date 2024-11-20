'use client';

import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [smallerWindow, setSmallerWindow] = useState(false);
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    // Check if window is defined (meaning we're on the client)
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      
      const handleResize = () => {
        setSmallerWindow(window.innerWidth < 767);
        setWindowWidth(window.innerWidth);
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

  return { smallerWindow, windowWidth };
}

export default useWindowWidth;
