import { useState, useEffect } from 'react';

const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    // Create observer
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    // Observe the element
    observer.observe(ref);

    // Cleanup function
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, options]);

  return [setRef, isInView];
};

export default useInView;
