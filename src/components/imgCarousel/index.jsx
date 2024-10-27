"use client";

import { useEffect, useState } from "react";
import "./imageCarousel.css";

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);
  const images = ['library.png', 'hostel_b.jpeg']; // Add paths to your images here

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="carouselWrapper">
      {images.map((image, i) => (
        <div
          key={i}
          className={`imgDiv ${i === index ? "active" : ""}`}
        >
          <img
            src={`/${image}`}
            alt={`carousel image ${i}`}
            className="carouselImage"
          />
        </div>
      ))} 
    </div>
  );
};

export default ImageCarousel;
