import Image from "next/image";
import "./navbar.css";
import CTAButton from "../ctaButton";
import useHomeStore from "@/store/homeStore";
import { useEffect, useRef, memo } from "react";
import gsap, { Expo } from "gsap";
import useAuthStore from "@/store/authStore";
import ThemeToggleBtn from "../themeToggleBtn";


const Navbar = () => {
  const navbarRef = useRef(null);
  const setNavbarRef = useHomeStore((state) => state.setNavbarRef);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarRef(navbarRef.current);
    }
  }, [navbarRef, setNavbarRef]);

  useEffect(() => {
    if (navbarRef.current) {
      gsap.to(navbarRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: Expo.easeIn,
      });
    }
  }, []);

 
  

  return (
    <div ref={navbarRef} className={`navbarWrapper`}>
      <a href="/" className="logoWrapper">
        <Image
          src="/imgs/logo.png"
          width={190}
          height={80}
          alt="tech-u logo"
          className="navbar_logo"
        />
      </a>
      <div className="rightEnd"> 
        <div className="portalBtn_wrap">
          <CTAButton linkTo="/portal/auth">Portal</CTAButton>
        </div>
        <OpenMenuIcon />
        <div className="themeToggle_wrap">
          <ThemeToggleBtn />
        </div>
      </div>
    </div>
  );
};

const OpenMenuIcon = memo(() => {
  const isNavbarOpen = useHomeStore((state) => state.isNavbarOpen);
  const toggleNavbar = useHomeStore((state) => state.toggleNavbar);
  const setMenuIconClicked = useHomeStore((state) => state.setMenuIconClicked);

  const websiteDarkTheme = useAuthStore((state) => state.websiteDarkTheme);

  const fillColor = websiteDarkTheme == 'dark' ? 'white' : 'black'

  const handleClick = () => {
    toggleNavbar();
    setMenuIconClicked(true);
  };

  return (
    <div onClick={handleClick} className="svgWrapper">
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
          fill={fillColor}
          className={`menu-bar ${isNavbarOpen ? "open-top" : ""}`}
        />
        <rect
          x="0"
          y="16"
          width="40"
          height="2"
          fill={fillColor}
          className={`menu-bar ${isNavbarOpen ? "open-bottom" : ""}`}
        />
      </svg>
    </div>
  );
});

export default Navbar;
