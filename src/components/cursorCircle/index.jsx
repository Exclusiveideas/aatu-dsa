"use client";

import { useLayoutEffect, useRef, useCallback } from "react";
import gsap, { Expo } from "gsap";
import CloseIcon from "@mui/icons-material/Close";

import "./jellyBlob.css";
import useHomeStore from "@/store/homeStore";
import { getAngle, getScale } from "@/utils/jellyBlob";


const JellyBlob = () => {
  const menuNavRef = useHomeStore((state) => state.menuNavRef);
  const menuNavWrapperRef = useHomeStore((state) => state.menuNavWrapperRef);
  const navbarRef = useHomeStore((state) => state.navbarRef);
  const isNavbarOpen = useHomeStore((state) => state.isNavbarOpen);
  const toggleNavbar = useHomeStore((state) => state.toggleNavbar);

  const cursorOnNavbar = useRef({ value: false})

  const jellyRef = useRef(null);

  // Save pos and velocity Objects
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });


  const setJellyX = useRef(null);
  const setJellyY = useRef(null);
  const setJellyRotate = useRef(null);
  const setJellyScaleX = useRef(null);
  const setJellyScaleY = useRef(null);
  const setJellyWidth = useRef(null);
  const setJellyOpacity = useRef(null);

 
  useLayoutEffect(() => {
    setJellyX.current = gsap.quickSetter(jellyRef.current, "x", "px");
    setJellyY.current = gsap.quickSetter(jellyRef.current, "y", "px");
    setJellyRotate.current = gsap.quickSetter(jellyRef.current, "rotate", "deg");
    setJellyScaleX.current = gsap.quickSetter(jellyRef.current, "scaleX");
    setJellyScaleY.current = gsap.quickSetter(jellyRef.current, "scaleY");
    setJellyWidth.current = gsap.quickSetter(jellyRef.current, "width", "px");
    setJellyOpacity.current = gsap.quickSetter(jellyRef.current, "opacity");
  }, []);

  // Start Animation loop
  const loop = useCallback(() => {

    const rotation = getAngle(vel.current.x, vel.current.y); // Mouse Move Angle
    const scale = getScale(vel.current.x, vel.current.y); // Blob Squeeze Amount

    if (cursorOnNavbar.current.value) {
      gsap.set(jellyRef.current, {
        opacity: 0,
        ease: Expo.easeOut,
        duration: 0.8,
      });
    } else {
      setJellyOpacity.current(1);
    }

    setJellyX.current(pos.current.x);
    setJellyY.current(pos.current.y);
    setJellyWidth.current(45 + scale * 10);
    setJellyRotate.current(rotation);
    setJellyScaleX.current(1 + scale * 0.3);
    setJellyScaleY.current(1 - scale * 0.3);
  }, []);

  // Run on Mouse Move
  useLayoutEffect(() => {
    let animationFrameId;

    
    const setFromEvent = (e) => {
      // Mouse X and Y
      const x = e.clientX;
      const y = e.clientY;

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        gsap.to(pos.current, {
          x: x,
          y: y,
          duration: 1.5,
          ease: Expo.easeOut,
          onUpdate: () => {
            vel.current.x = x - pos.current.x;
            vel.current.y = y - pos.current.y;
          },
        });
        loop();
      });
    };

    window.addEventListener("mousemove", setFromEvent);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loop]);


  // Mouse enter and leave events for fade-in/fade-out
  useLayoutEffect(() => {
    if (typeof window == "undefined") return;

    
    const handleMouseLeave = () => {
      gsap.set(jellyRef.current, {
        opacity: 0,
        ease: Expo.easeOut,
        duration: 0.8,
      });
    };

    const handleCursorOnNavbar = () => {
      cursorOnNavbar.current.value = true;
    };

    const handleCursorLeftNavbar = () => {
      cursorOnNavbar.current.value = false;
    };

    // Add event listeners for mouseenter and mouseleave on window
    window.addEventListener("mouseout", handleMouseLeave);

    if (menuNavRef) {
      menuNavRef.addEventListener("mouseenter", handleCursorOnNavbar);
      menuNavRef.addEventListener("mouseleave", handleCursorLeftNavbar);
    }

    if (navbarRef) {
      navbarRef.addEventListener("mousemove", handleCursorOnNavbar);
      navbarRef.addEventListener("mouseleave", handleCursorLeftNavbar);
    }

    

    // Cleanup event listeners
    return () => {
      window.removeEventListener("mouseout", handleMouseLeave);
      if (menuNavRef) {
        menuNavRef.removeEventListener("mouseenter", handleCursorOnNavbar);
        menuNavRef.removeEventListener("mouseleave", handleCursorLeftNavbar);
      }
      if (navbarRef) {
        navbarRef.removeEventListener("mousemove", handleCursorOnNavbar);
        navbarRef.removeEventListener("mouseleave", handleCursorLeftNavbar);
      }
    };
  }, [menuNavRef, isNavbarOpen]);


  useLayoutEffect(() => {
    const closeMenuNavbar = () => {
      if(cursorOnNavbar.current.value && !isNavbarOpen) {
        return;
      }
      
      toggleNavbar();
    } 

    if (menuNavWrapperRef) {
      menuNavWrapperRef.addEventListener("click", closeMenuNavbar);
    }

    return () => {
      if (menuNavWrapperRef) {
        menuNavWrapperRef.removeEventListener("click", closeMenuNavbar);
      }
    };
  }, [menuNavWrapperRef, isNavbarOpen, toggleNavbar]);

  

  return (
    <div className="container-div">
      <div ref={jellyRef} id="jelly-id" className="jelly-blob">
        <div id="text-id" className="inside-text">
          <CloseIcon
            sx={{
              color: "black",
              fontSize: "25px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default JellyBlob;
