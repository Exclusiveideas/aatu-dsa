
import styles from "./page.module.css";
import HeroSection from "@/components/heroSection/index";
import NewsSection from "@/components/newsSection/index";
import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";


const DynamicFooter = dynamic(() => import('@/components/footer'), {
  loading: () => (
    <div className={styles.footerSkeleton}>
      <Skeleton variant="rounded" width={"100%"} height={"100%"} />
    </div>
  )
})


const HomePage = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.firstSection}>
          <HeroSection />
        </div>
        <NewsSection />
      </main>
      <footer className={styles.footer}>
        <DynamicFooter />
      </footer>
    </div>
  );
};

export default HomePage;
