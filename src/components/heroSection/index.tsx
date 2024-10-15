import React from "react";
import "./heroSection.css";
import ImageCarousel from "../imgCarousel";
import Navbar from "../navbar";

const HeroSection = () => {
  return (
    <div className="heroSectWrapper">
      <Navbar />
      <ImageCarousel />
      <div className="heroInfo">
        <div className="infoBox">
          <h1>Welcome to the Student Hostel Portal!</h1>
          <p>
            This website has been designed for the Dean of Student Affairs
            department to keep you informed and updated with all essential
            information regarding your hostel experience.
          </p>
        </div>
        <div className="arrowContainer">
            <img src="/down.svg" alt="scroll down arrow" className="arrow" />
            <img src="/down.svg" alt="scroll down arrow" className="arrow" />
            <img src="/down.svg" alt="scroll down arrow" className="arrow" />
          </div>
      </div>
    </div>
  );
};

export default HeroSection;
