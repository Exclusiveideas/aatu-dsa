"use client";

import { useLayoutEffect, useRef, useCallback } from "react";
import gsap, { Expo } from "gsap";
import CloseIcon from "@mui/icons-material/Close";

import "./jellyBlob.css";
import useHomeStore from "@/store/homeStore";

// Function for Mouse Move Scale Change
function getScale(diffX, diffY) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return Math.min(distance / 735, 0.35);
}

// Function For Mouse Movement Angle in Degrees
function getAngle(diffX, diffY) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

// Jelly Blob Function
const JellyBlob = () => {
  const menuNavRef = useHomeStore((state) => state.menuNavRef);
  const menuNavWrapperRef = useHomeStore((state) => state.menuNavWrapperRef);
  const navbarRef = useHomeStore((state) => state.navbarRef);
  const isNavbarOpen = useHomeStore((state) => state.isNavbarOpen);
  const toggleNavbar = useHomeStore((state) => state.toggleNavbar);

  const cursorOnNavbar = useRef({ value: false})

  // React Refs for Jelly Blob and Text
  const jellyRef = useRef(null);
  const textRef = useRef(null);

  // Save pos and velocity Objects
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });

  // Set GSAP quick setter Values on useLayoutEffect Update
  useLayoutEffect(() => {
    gsap.quickSetter(jellyRef.current, "x", "px");
    gsap.quickSetter(jellyRef.current, "y", "px");
    gsap.quickSetter(jellyRef.current, "rotate", "deg");
    gsap.quickSetter(jellyRef.current, "scaleX");
    gsap.quickSetter(jellyRef.current, "scaleY");
    gsap.quickSetter(jellyRef.current, "width", "px");
    gsap.quickSetter(jellyRef.current, "opacity", "");
    gsap.quickSetter(textRef.current, "rotate", "deg");
  }, []);

  // Start Animation loop
  const loop = useCallback(() => {

    const rotation = getAngle(vel.current.x, vel.current.y); // Mouse Move Angle
    const scale = getScale(vel.current.x, vel.current.y); // Blob Squeeze Amount

    if (cursorOnNavbar.current.value) {
      loopTwo();
    } else {
      gsap.set(jellyRef.current, {
        opacity: 1,
      });
    }

    // Set GSAP quick setter Values on Loop Function
    gsap.set(jellyRef.current, { x: pos.current.x, y: pos.current.y });
    gsap.set(jellyRef.current, { width: 45 + scale * 10 });
    gsap.set(jellyRef.current, { rotate: rotation });
    gsap.set(jellyRef.current, { scaleX: 1 + scale * 0.3 });
    gsap.set(jellyRef.current, { scaleY: 1 - scale * 0.3 });
    gsap.set(textRef.current, { rotate: -rotation });
  }, []);

  const loopTwo = useCallback(() => {
    // Set GSAP quick setter Values on Loop Function
    gsap.set(jellyRef.current, {
      opacity:  0,
      ease: Expo.easeOut,
      duration: .8
    });
  }, []);


  // Run on Mouse Move
  useLayoutEffect(() => {
      
    // Caluclate Everything Function
    const setFromEvent = (e) => {
      // Mouse X and Y
      const x = e.clientX;
      const y = e.clientY;

      // Animate Position and calculate Velocity with GSAP
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
    };

    window.addEventListener("mousemove", setFromEvent);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, [loop]);


  // Mouse enter and leave events for fade-in/fade-out
  useLayoutEffect(() => {
    if (typeof window == "undefined") return;

    const handleMouseLeave = () => {
      loopTwo();
    };

    const handleCursorOnNavbar = () => {
      cursorOnNavbar.current.value = true;
      loopTwo();
    }
    
    const handleCursorLeftNavbar = () => {
      cursorOnNavbar.current.value = false;
    }

    // Add event listeners for mouseenter and mouseleave on window
    window.addEventListener("mouseout", handleMouseLeave);

    if(menuNavRef) menuNavRef.addEventListener("mouseenter", handleCursorOnNavbar);
    if(menuNavRef) menuNavRef.addEventListener("mouseleave", handleCursorLeftNavbar);

    if(navbarRef) navbarRef.addEventListener("mousemove", handleCursorOnNavbar);
    if(navbarRef) navbarRef.addEventListener("mouseleave", handleCursorLeftNavbar);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("mouseout", handleMouseLeave);
      if(menuNavRef) menuNavRef.removeEventListener("mouseenter", handleMouseLeave);
      if(menuNavRef) menuNavRef.removeEventListener("mouseleave", handleCursorLeftNavbar);
      if(navbarRef) navbarRef.removeEventListener("mousemove", handleMouseLeave);
      if(navbarRef) navbarRef.removeEventListener("mouseleave", handleCursorLeftNavbar);
    };
  }, [loopTwo, menuNavRef, isNavbarOpen]);


  useLayoutEffect(() => {
    const closeMenuNavbar = () => {
      if(cursorOnNavbar.current.value && !isNavbarOpen) {
        return;
      }
      
      toggleNavbar();
    } 

    menuNavWrapperRef.addEventListener("click", closeMenuNavbar);

    // Cleanup event listeners
    return () => {
      menuNavWrapperRef.removeEventListener("click", closeMenuNavbar);
    };
  }, []);

  // Return UI
  return (
    <div className="container-div">
      <div ref={jellyRef} id="jelly-id" className="jelly-blob">
        <div ref={textRef} id="text-id" className="inside-text">
          <CloseIcon
            sx={{
              color: "black",
              cursor: "pointer",
              fontSize: "25px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default JellyBlob;
