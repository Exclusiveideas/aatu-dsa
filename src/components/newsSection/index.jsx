"use client";

import "./newsSection.css";
import NewsGrid from "../newsGrid";
 
const NewsSection = ({ newsSectionRef, contentRefDistance, availableNews }) => {  
  return (
    <div ref={newsSectionRef} className="newsSection">
      <NewsGrid contentRefDistance={contentRefDistance} availableNews={availableNews} />
    </div>
  );
};

export default NewsSection;