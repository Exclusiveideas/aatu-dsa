"use client";
import styles from "./page.module.css";
import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import useHomeStore from "@/store/homeStore";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/heroSection";
import NewsSection from "@/components/newsSection";
import JellyBlob from "@/components/cursorCircle";
import MenuNav from "@/components/menuNav";
import SmoothScrolling from "@/components/smoothScrolling";

gsap.registerPlugin(ScrollTrigger);

const DynamicFooter = dynamic(() => import("@/components/footer"), {
  loading: () => (
    <div className={styles.footerSkeleton}>
      <Skeleton variant="rounded" width={"100%"} height={"100%"} />
    </div>
  ),
});

const HomePage = () => {
  const isNavbarOpen = useHomeStore((state) => state.isNavbarOpen);
  const loadingScreen = useHomeStore((state) => state.loadingScreen);
  const [newsMaskingContRef, setNewsMaskingRef] = useState(null)
  const [childAnimationComplete, setChildAnimationComplete ] = useState(false)
  let childHeight = 0

  const heroesRef = useRef(null);
  const newsRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    if (!newsMaskingContRef?.current || !newsRef.current) return;
  
    // Dynamically calculate the height of the child component
    // const childHeight = newsMaskingContRef.current.scrollHeight;

    console.log('childHeight: ', childHeight)
  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroesRef.current,
        start: "top top",
        // endTrigger: newsRef.current,
        // end: `bottom 60%`,
        scrub: 1,
        pin: true,
        pinSpacing: false,
      },
    });
  
    tl.to(heroesRef.current, {
      opacity: 0.2,
      filter: "blur(15px)",
      duration: 1,
    });
    tl.to(
      newsRef.current,
      {
        scrollTrigger: {
          trigger: newsRef.current,
          start: "top top",
          end: `bottom bottom`,
          scrub: 1,
          pin: true,
          pinSpacing: false,
          onUpdate: (self) => {
            if (childAnimationComplete) {
              // Calculate new height based on scroll progress
              // const progress = self.progress; // Progress is from 0 (start) to 1 (end)
              // const initialHeight = newsRef.current.clientHeight;
              // const newHeight = initialHeight - ; // Decrease height based on progress
              newsRef.current.style.height = childHeight + 100;
            }
          },
        },
      },
      "<"
    );
    
  }, [newsMaskingContRef?.current, newsRef?.current?.clientHeight, childAnimationComplete, childHeight]);


  const homeClass = `${styles.page} ${
    loadingScreen ? styles.fixedHeight : styles.autoHeight
  }`;

  return (
    <SmoothScrolling>
      <div  className={homeClass}>
        <Navbar />
        <div ref={heroesRef} className={`${styles.heroSection} section`}>
          <HeroSection />
        </div>
        <div ref={newsRef} className={`${styles.newsSection} section`}>
          <NewsSection childHeight={childHeight} setNewsMaskingRef={setNewsMaskingRef} setChildAnimationComplete={setChildAnimationComplete} />
          <div className="newsSectDiv"></div>
        </div>
        <footer className={`${styles.footer}`}>
          <DynamicFooter />
        </footer>
        <MenuNav />
        {isNavbarOpen && <JellyBlob />}
        {/* <LoadingScreen /> */}
      </div>
    </SmoothScrolling>
  );
};

export default HomePage;
