import { useEffect, useRef } from 'react';

import './newsGrid.css';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const gridItems = [
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
  {image: '/imgs/welcome.jpeg' },
];

const NewsGrid = ({ setNewsMaskingRef, setChildAnimationComplete, childHeight }) => {
    const contentRef = useRef();
    const newsMaskingContRef = useRef();

  useEffect(() => {
    if (!contentRef.current || !newsMaskingContRef.current) return;
    setNewsMaskingRef(newsMaskingContRef);

    // Sync child animation with ScrollTrigger
    const content = contentRef.current;

    const originalHeight = content.clientHeight;

    gsap.to(content, {
        y: -originalHeight, 
        ease: "none",
        scrollTrigger: {
          trigger: content,
          start: "top 50%",
          scrub: true,
          end: () => `+=${}`,
          markers: true,
          pinSpacing: false,
          onUpdate: (self) => {
            // Calculate the remaining visible height of the child container
            const remainingHeight = originalHeight * (1 - self.progress);
      
            // Set the height of the parent container to match the remaining height
            // if (content.parentElement) {
            console.log('remH: ', remainingHeight)
            childHeight = remainingHeight
            // }
          },
        },
      });
    // onUpdate: (self) => {
        //   // Check if the child animation has reached the end
        //   if (self.progress >= 1) {
        //     setChildAnimationComplete(true); // Mark child animation as complete
        //   }
        // },
  }, []);

  return (
    <div ref={newsMaskingContRef} className="masking-container">
    <div ref={contentRef} className="grid">
      {gridItems.map((item, i) => (
        <figure key={i} className="grid__item">
          <div className="grid__item-imgwrap">
            <div
              className="grid__item-img"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
          </div>
        </figure>
      ))}
    </div>
    </div>
  );
};

export default NewsGrid;
