import Image from "next/image";
import "./navbar.css";
import CTAButton from "../ctaButton";
import useHomeStore from "@/store/homeStore";
import { useEffect, useRef } from "react";
import gsap, { Expo } from "gsap";

const Navbar = ({ newPage }) => {
  const navbarRef = useRef(null);
  const setNavbarRef = useHomeStore((state) => state.setNavbarRef);
  
  useEffect(() => {
    if(navbarRef.current) {
      setNavbarRef(navbarRef.current)
    }
  }, [navbarRef])

  useEffect(() => {
    gsap.to(
      navbarRef.current,
      { opacity: 1, duration: .4, ease: Expo.easeIn, } // Slide up into place
    );
  }, []);

  return (
    <div ref={navbarRef} className={`navbarWrapper ${newPage && "solid"}`}>
      <a href="/" className="logoWrapper">
        <Image
          src={"/logo.png"}
          width={190}
          height={80}
          alt="tech-u logo"
          className="navbar_logo"
          priority={true}
        />
      </a>
      <div className="rightEnd">
        <CTAButton linkTo={'/portal/auth'}>Portal</CTAButton>
        <OpenMenuIcon />
      </div>
    </div>
  );
};

export default Navbar;

const OpenMenuIcon = () => {
  const isNavbarOpen = useHomeStore((state) => state.isNavbarOpen);
  const toggleNavbar = useHomeStore((state) => state.toggleNavbar);

  return (
    <div
      onClick={toggleNavbar}
      style={{ cursor: "pointer", width: "40px", height: "24px" }}
    >
      <svg
        width="40"
        height="24"
        viewBox="0 0 40 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0"
          y="4"
          width="40"
          height="2"
          fill="white"
          style={{
            transition: "0.3s",
            transformOrigin: "center",
            transform: isNavbarOpen
              ? "rotate(45deg) translateY(10px)"
              : "rotate(0deg)",
          }}
        />
        <rect
          x="0"
          y="16"
          width="40"
          height="2"
          fill="white"
          style={{
            transition: "0.3s",
            transformOrigin: "center",
            transform: isNavbarOpen
              ? "rotate(-45deg) translateY(-10px)"
              : "rotate(0deg)",
          }}
        />
      </svg>
    </div>
  );
};
