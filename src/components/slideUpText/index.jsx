import { useEffect, useRef } from "react";
import gsap from "gsap";
import './slideInText.css';

const SlideInText = ({ children, style }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      // Set initial position
      gsap.set(textRef.current, { y: "100%" });

      // Animate text sliding in
      gsap.to(textRef.current, {
        y: "0%",
        duration: .7,
        ease: "power4.out",
      });
    }, textRef);

    // Cleanup on unmount
    return () => context.revert();
  }, []);

  return (
    <div className="text-wrapper" style={style}>
      <div ref={textRef} className="animated-text">
        {children}
      </div>
    </div>
  );
};

export default SlideInText;
