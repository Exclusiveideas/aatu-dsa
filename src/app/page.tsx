"use client";
import styles from "./page.module.css";
import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import useHomeStore from "@/store/homeStore";
import SmoothScrolling from "@/components/smoothScrolling";
import HeroSection from "@/components/heroSection";
import NewsSection from "@/components/newsSection";
import MenuNav from "@/components/menuNav";
import JellyBlob from "@/components/cursorCircle";
import LoadingScreen from "@/components/loadingScreen";

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

  const homeClass = `${styles.page} ${isNavbarOpen || loadingScreen ? styles.fixedHeight : styles.autoHeight}`

  return (
      <SmoothScrolling>
        <div
          className={homeClass}
        >
          <main className={styles.main}>
            <div className={styles.firstSection}>
              <HeroSection />
            </div>
            <NewsSection />
          </main>
          <footer className={styles.footer}>
            <DynamicFooter />
          </footer>
          <MenuNav />
          {isNavbarOpen && <JellyBlob />}
          <LoadingScreen />
        </div>
      </SmoothScrolling>
  );
};

export default HomePage;



