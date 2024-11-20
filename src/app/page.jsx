"use client";

import styles from "./page.module.css";
import useHomeStore from "@/store/homeStore";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { scaleNewsContainer } from "@/utils/homeFunctions";
import LoadingScreen from "@/components/loadingScreen";
import useWindowWidth from "@/utils/hooks/useWindowWidth";
 
gsap.registerPlugin(ScrollTrigger, CustomEase);

const HomePage = () => {

  const [noMoreNews, setNoMoreNews] = useState(false);
  const [availableNews, setAvailableNews] = useState([]);

  const [loadingIndicatorRef, isLoadInView] = useInView({
    root: null,
    threshold: 0.5,
  });

  const contentRefDistance = useRef(null);

  const isNavbarOpen = useHomeStore((state) => state.isNavbarOpen);
  const unMountLoadingScreen = useHomeStore((state) => state.unMountLoadingScreen);

  const {windowWidth} = useWindowWidth();

  
  const newsSectionRef = useRef(null);
  const heroesRef = useRef(null);
  const newsRef = useRef(null);
  const newsTitleRef = useRef(null);
  const heroDarkBgRef = useRef(null);

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
            scaleNewsContainer(newsSectionRef, true, false)
          },
          onEnterBack: () => {
            scaleNewsContainer(newsSectionRef, false, true)
          },
        },
      },
      "<"
    );

    const stInstance = ScrollTrigger.create({
      trigger: newsRef.current,
      start: "top 25%",
      scrub: true,
      end: () => `+=${contentRefDistance.current}`,

      onEnter: () => {
        gsap.to(newsTitle, {
          opacity: 1,
          duration: 0.2,
          ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1"),
        });
      },
      onEnterBack: () => {
        gsap.to(newsTitle, {
          opacity: 1,
          duration: 0.2,
          ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1"),
        });
      },
      onLeave: () => {
        gsap.to(newsTitle, {
          scale: 1,
          opacity: 0,
          duration: 0.2,
          ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1"),
        });
      },
      onLeaveBack: () => {
        gsap.to(newsTitle, {
          scale: 1,
          opacity: 0,
          duration: 0.2,
          ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1"),
        });
      },
    });

    return () => {
      tlAnimation.kill();
      stInstance.kill();
    };
  }, []);

  useEffect(() => {
    // refresh scrolltrigger when new newsitems are fetched
    ScrollTrigger.refresh();
  }, [availableNews]);


  useEffect(() => {
    if (!isLoadInView) return;

    updateFetchedNewsError('');

    fetchNews({
      lastDoc,
      fetchedNews,
      updateFetchedNews,
      updateLastDoc,
      updateFetchedNewsError,
      updateIsFetching,
      updateNoMoreNews: setNoMoreNews,
    });
  }, [isLoadInView]);

  const memoizedAvailableNews = useMemo(() => {
    return fetchedNews.length ? [...fetchedNews] : [];
  }, [fetchedNews]);

  useEffect(() => {
    if (fetchedNews[0]) {
      setAvailableNews(memoizedAvailableNews);
    } else {
      
      updateFetchedNewsError('');

      fetchNews({
        lastDoc,
        fetchedNews,
        updateFetchedNews,
        updateLastDoc,
        updateFetchedNewsError,
        updateIsFetching,
        updateNoMoreNews: setNoMoreNews,
      });
    }
  }, [memoizedAvailableNews]);

  const homeClass = `${styles.page} ${windowWidth > 550 ?
    (!unMountLoadingScreen ? styles.fixedHeight : styles.autoHeight) : styles.autoHeight
  }`;

  return (
    <SmoothScrolling>
      <div className={homeClass}>
        <Navbar />
        <div ref={heroesRef} className={`${styles.heroSection} section`}>
          <div ref={heroDarkBgRef} className={styles.hero_dark_bg}></div>
          <HeroSection targetRef={newsTitleRef} />
        </div>
        <div ref={newsRef} className={`${styles.newsSection} section`}>
          <h1 ref={newsTitleRef} className={styles.newSectionTitle}>
            Here&apos;s What&apos;s Going On!
          </h1>
          <NewsSection
            newsSectionRef={newsSectionRef}
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
                <p>You&apos;re up to date 😉</p>
              </div>
            )}
          </div>
        </div>
        <MenuNav />
        {isNavbarOpen && <JellyBlob />}
        {windowWidth > 550 && !unMountLoadingScreen && <LoadingScreen />}
      </div>
    </SmoothScrolling>
  );
};

export default HomePage;