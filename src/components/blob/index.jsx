import './blob.css';
import { useLayoutEffect, useRef, useCallback } from "react";
import gsap, { Expo } from "gsap";

const Blob = () => {
  // React Refs for Jelly Blob and Text
  const jellyRef = useRef(null);

  // Save pos object
  const pos = useRef({ x: 0 });

  // Mapping function
  const mapRange = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  // Set GSAP quick setter Values on useLayoutEffect Update
  useLayoutEffect(() => {
    gsap.quickSetter(jellyRef.current, "x", "px");
  }, []);

  // Start Animation loop
  const loop = useCallback(() => {
    // Set GSAP quick setter Values on Loop Function
    gsap.set(jellyRef.current, { x: pos.current.x });
  }, []);

  // Run on Mouse Move
  useLayoutEffect(() => {
    const setFromEvent = (e) => {
      // Map x position of mouse to the range of 0 to 100vw
      const mappedX = mapRange(e.clientX, 0, window.innerWidth, 0, window.innerWidth);

      // Animate Position with GSAP
      gsap.to(pos.current, {
        x: mappedX,
        duration: 15,
        ease: Expo.easeOut,
      });

      loop();
    };

    window.addEventListener("mousemove", setFromEvent);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, [loop]);

  return (
    <div ref={jellyRef} className="blob">
      Blob
    </div>
  );
};

export default Blob;
