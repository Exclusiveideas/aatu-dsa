"use client";

import { useEffect, useRef } from "react";
import "./newsSection.css";
import NewsGrid from "../newsGrid";
 
const NewsSection = ({ setNewsSectionRef, contentRefDistance, availableNews }) => {  
  const newsSectionRef = useRef();

  useEffect(() => {
    setNewsSectionRef(newsSectionRef)
  }, [newsSectionRef])
  
  

  return (
    <div ref={newsSectionRef} className="newsSection">
      <NewsGrid contentRefDistance={contentRefDistance} availableNews={availableNews} />
    </div>
  );
};

export default NewsSection;