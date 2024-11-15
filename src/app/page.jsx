"use client";

import styles from "./page.module.css";
import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import useHomeStore from "@/store/homeStore";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/heroSection";
import NewsSection from "@/components/newsSection";
import JellyBlob from "@/components/cursorCircle";
import MenuNav from "@/components/menuNav";
import FadeLoader from "react-spinners/FadeLoader";
import SmoothScrolling from "@/components/smoothScrolling";
import { CustomEase } from "gsap/CustomEase";
import useInView from "@/utils/hooks/useInView";
import { fetchNews } from "@/utils/newsFunctions";
import useNewsStore from "@/store/newsStore";

gsap.registerPlugin(ScrollTrigger, CustomEase);

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

  const [newsSectionRef, setNewsSectionRef] = useState(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [animationReversing, setAnimationReversing] = useState(false);
  const [noMoreNews, setNoMoreNews] = useState(false);
  const [availableNews, setAvailableNews] = useState([]);

  const [loadingIndicatorRef, isLoadInView] = useInView({
    root: null,
    threshold: 0.5,
  });

  const contentRefDistance = useRef(null);

  const heroesRef = useRef(null);
  const newsRef = useRef(null);
  const newsTitleRef = useRef(null);

  const fetchedNews = useNewsStore((state) => state.fetchedNews);
  const lastDoc = useNewsStore((state) => state.lastDoc);
  const fetchNewsError = useNewsStore((state) => state.fetchNewsError);
  const updateFetchedNews = useNewsStore((state) => state.updateFetchedNews);
  const updateLastDoc = useNewsStore((state) => state.updateLastDoc);
  const updateFetchedNewsError = useNewsStore(
    (state) => state.updateFetchedNewsError
  );
  const updateIsFetching = useNewsStore((state) => state.updateIsFetching);

  useEffect(() => {
    if (!newsSectionRef?.current || !newsRef.current || !newsTitleRef.current)
      return;
    const tlAnimation = gsap.timeline();
    const newsTitle = newsTitleRef.current;

    tlAnimation.to(heroesRef.current, {
      opacity: 0.2,
      filter: "blur(15px)",
      duration: 1,
      scrollTrigger: {
        trigger: heroesRef.current,
        start: "top top",
        endTrigger: newsRef.current,
        end: `bottom top`,
        scrub: 1,
        pin: true,
        pinSpacing: false,
      },
    });
    tlAnimation.to(
      newsRef.current,
      {
        scrollTrigger: {
          trigger: newsRef.current,
          start: "top 25%",
          end: () => `+=${contentRefDistance.current}`,
          scrub: 1,
          pin: true,
          onLeave: () => {
            setAnimationCompleted(true);
            setAnimationReversing(false);
          },
          onEnterBack: () => {
            setAnimationCompleted(false);
            setAnimationReversing(true);
          },
        },
      },
      "<"
    );

    ScrollTrigger.create({
      trigger: newsRef.current,
      start: "top 25%",
      scrub: true,
      end: () => `+=${contentRefDistance.current}`,

      onEnter: () => {
        gsap.to(newsTitle, {
          scale: 1.3,
          opacity: 1,
          duration: 0.2,
          ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1"),
        });
      },
      onEnterBack: () => {
        gsap.to(newsTitle, {
          scale: 1.3,
          opacity: 1,
          duration: 0.2,
          ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1"),
        });
      },
      onLeave: () => {
        gsap.to(newsTitle, {
          scale: 1,
          opacity: 0.7,
          duration: 0.2,
          ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1"),
        });
      },
      onLeaveBack: () => {
        gsap.to(newsTitle, {
          scale: 1,
          opacity: 0.7,
          duration: 0.2,
          ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1"),
        });
      },
    });
  }, [newsSectionRef?.current, newsRef?.current, newsTitleRef?.current]);

  useEffect(() => {
    // refresh scrolltrigger when new newsitems are fetched
    ScrollTrigger.refresh();
  }, [availableNews]);

  useEffect(() => {
    const tl1 = gsap.timeline();
    const tl2 = gsap.timeline();

    if (animationCompleted & !animationReversing) {
      tl2.kill();
      tl1.to(newsSectionRef?.current, {
        scale: 1,
        ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1 "),
        duration: 0.4,
      });
    } else if (animationReversing && !animationCompleted) {
      tl1.kill();
      tl2.to(newsSectionRef?.current, {
        scale: 0.9,
        ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1 "),
        duration: 0.4,
      });
    }

    return () => {
      if (tl1) tl1.kill();
      if (tl2) tl2.kill();
    };
  }, [animationCompleted, animationReversing]);

  useEffect(() => {
    if (!isLoadInView) return;

    fetchNews({
      lastDoc,
      updateFetchedNews,
      updateLastDoc,
      updateFetchedNewsError,
      updateIsFetching,
      updateNoMoreNews: setNoMoreNews,
    });
  }, [isLoadInView]);

  useLayoutEffect(() => {
    if (fetchedNews[0]) {
      setAvailableNews([...fetchedNews]);
    } else {
      fetchNews({
        lastDoc,
        updateFetchedNews,
        updateLastDoc,
        updateFetchedNewsError,
        updateIsFetching,
        updateNoMoreNews: setNoMoreNews,
      });
    }
  }, [fetchedNews]);

  const homeClass = `${styles.page} ${
    loadingScreen ? styles.fixedHeight : styles.autoHeight
  }`;

  useEffect(() => {
    console.log("noMoreNews: ", noMoreNews);
  }, []);

  return (
    <SmoothScrolling>
      <div className={homeClass}>
        <Navbar />
        <div ref={heroesRef} className={`${styles.heroSection} section`}>
          <HeroSection targetRef={newsTitleRef} />
        </div>
        <div ref={newsRef} className={`${styles.newsSection} section`}>
          <h1 ref={newsTitleRef} className={styles.newSectionTitle}>
            What's Going On!
          </h1>
          <NewsSection
            setNewsSectionRef={setNewsSectionRef}
            contentRefDistance={contentRefDistance}
            availableNews={availableNews}
          />
          <div ref={loadingIndicatorRef} className={styles.loadingIndicator}>
            {fetchNewsError ? (
              <div className={`${styles.uptoDateCont} ${styles.error}`}>
                <p>{fetchNewsError}</p>
              </div>
            ) : !noMoreNews ? (
              <FadeLoader
                color={"#3E958F"}
                cssOverride={{ transform: "scale(0.7)" }}
              />
            ) : (
              <div className={styles.uptoDateCont}>
                <p>You're up to date 😉</p>
              </div>
            )}
          </div>
        </div>
        <MenuNav />
        {isNavbarOpen && <JellyBlob />}
        {/* <LoadingScreen /> */}
      </div>
    </SmoothScrolling>
  );
};

export default HomePage;
