import "./blob.css";
import { useLayoutEffect, useRef, useCallback, useEffect } from "react";
import gsap, { Expo } from "gsap";

const Blob = () => {
  // React Refs for Jelly Blob and Text
  const jellyRef = useRef(null);
  const pos = useRef({ x: 0 });
  const setJellyX = useRef(null);

  // Throttle function to limit the frequency of mousemove events
  const throttle = (callback, limit) => {
    let waiting = false;
    return (...args) => {
      if (!waiting) {
        callback(...args);
        waiting = true;
        setTimeout(() => (waiting = false), limit);
      }
    };
  };
  

  useLayoutEffect(() => {
    setJellyX.current = gsap.quickSetter(jellyRef.current, "x", "px");
  }, []);

  const setFromEvent = useCallback(
    throttle((e) => {
      const mappedX = (e.clientX / window.innerWidth) * window.innerWidth;

      gsap.to(pos.current, {
        x: mappedX,
        duration: 10,
        ease: Expo.easeOut,
        onUpdate: () => {
          setJellyX.current(pos.current.x);
        },
      });
    }, 16), // 16ms throttle for ~60fps
    []
  );

  useLayoutEffect(() => {
    window.addEventListener("mousemove", setFromEvent);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, [setFromEvent]);

  
  useEffect(() => {
    if (jellyRef.current) {
      gsap.to(jellyRef.current, {
        opacity: .5,
        duration: 0.4,
        ease: Expo.easeIn,
      });
    }
  }, []);

  return <div ref={jellyRef} className="blob"></div>;
};

export default Blob;
