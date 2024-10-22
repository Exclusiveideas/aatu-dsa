'use client'

import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [smallerWindow, setSmallerWindow] = useState(window.innerWidth < 979);

  useEffect(() => {
    const handleResize = () => {
      setSmallerWindow(window.innerWidth < 979);
    };

    // Add event listener to window resize
    window.addEventListener('resize', handleResize);

    // Call handleResize initially to check window size on load
    handleResize();

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return smallerWindow;
}

export default useWindowWidth;