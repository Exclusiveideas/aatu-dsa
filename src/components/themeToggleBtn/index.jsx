import { useEffect, useRef } from "react";
import "./themeToggleBtn.css";
import useAuthStore from "@/store/authStore";
import Image from "next/image";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

const ThemeToggleBtn = () => {
  const themeToggleRef = useRef(null);
  const sunIconRef = useRef(null);
  const moonIconRef = useRef(null);

  const websiteDarkTheme = useAuthStore((state) => state.websiteDarkTheme);
  const setWebsiteDarkTheme = useAuthStore(
    (state) => state.setWebsiteDarkTheme
  );

  const toggleTheme = () => {
    setWebsiteDarkTheme(websiteDarkTheme == "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const themeToggle = themeToggleRef.current;
    const sunIcon = sunIconRef.current;
    const moonIcon = moonIconRef.current;

    const duration = 0.7;

    if (websiteDarkTheme == "light") {
      const tl = gsap.timeline();
      tl.to(themeToggle, {
        y: "-2.3rem",
        duration: 0.2,
        ease: "none",
      });
      tl.to(moonIcon, {
        rotate: "0deg",
        duration: duration,
        ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1"),
      });
      tl.to(
        sunIcon,
        {
          rotate: "-720deg",
          duration: duration,
          ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1"),
        },
        "<"
      );
    } else {
      const tl = gsap.timeline();
      tl.to(themeToggle, {
        y: "0",
        duration: 0.2,
        ease: "none",
      });
      tl.to(moonIcon, {
        rotate: "180deg",
        duration: duration,
        ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1"),
      });
      tl.to(
        sunIcon,
        {
          rotate: "0deg",
          duration: duration,
          ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1"),
        },
        "<"
      );
    }
  }, [websiteDarkTheme]);

  return (
    <div onClick={toggleTheme} className="theme_toggle_btn">
      <div ref={themeToggleRef} className="theme_toggle_innerWrapper">
        <Image
          src="/imgs/sun.png"
          width={80}
          height={80}
          alt="dark mode icon"
          className="toggle_theme_icon"
          ref={sunIconRef}
        />
        <Image
          src="/imgs/moon.png"
          width={80}
          height={80}
          alt="light mode icon"
          className="toggle_theme_icon moon"
          ref={moonIconRef}
        />
      </div>
    </div>
  );
};

export default ThemeToggleBtn;
