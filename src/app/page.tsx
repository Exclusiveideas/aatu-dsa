"use client";
import MenuNav from "@/components/menuNav";
import styles from "./page.module.css";
import HeroSection from "@/components/heroSection/index";
import NewsSection from "@/components/newsSection/index";
import SmoothScrolling from "@/components/smoothScrolling";
import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import CursorCircle from "@/components/cursorCircle";
import useHomeStore from "@/store/homeStore";

const DynamicFooter = dynamic(() => import("@/components/footer"), {
  loading: () => (
    <div className={styles.footerSkeleton}>
      <Skeleton variant="rounded" width={"100%"} height={"100%"} />
    </div>
  ),
});

const HomePage = () => {
  const isNavbarOpen = useHomeStore((state) => state.isNavbarOpen);


  return (
    <SmoothScrolling>
      <div className={`${styles.page} ${isNavbarOpen ? styles.fixedHeight : styles.autoHeight}`}>
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
        {isNavbarOpen && <CursorCircle />}
      </div>
    </SmoothScrolling>
  );
};

export default HomePage;
