import "./heroSection.css";
import ImageCarousel from "../imgCarousel";
import Navbar from "../navbar";
import Link from "next/link";

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
            to keep you informed and updated with all essential
            information regarding your hostel experience.
          </p>
          <div className="heroBtn">
          <Link href="/portal/auth" className="portalBtn">
            <div className="pulsatingBox"></div>
            Portal
        </Link>
          </div>
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
