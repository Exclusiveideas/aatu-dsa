import { useEffect, useRef } from "react";
import gsap from "gsap";
import './slideInText.css';

const SlideInText = ({ children, style }) => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { y: "100%" }, // Start below the view
      { y: "0%", duration: 1, ease: "power4.out" } // Slide up into place
    );
  }, []);

  return (
    <div className="text-wrapper" style={style}>
      <div ref={textRef} style={style} className="animated-text">
        {children}
      </div>
    </div>
  );
};

export default SlideInText;
