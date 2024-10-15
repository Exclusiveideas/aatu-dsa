import Image from "next/image";
import styles from "./page.module.css";
import Navbar from '@/components/navbar/index'
import HeroSection from '@/components/heroSection/index'
import NewsSection from '@/components/newsSection/index'

const HomePage = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Navbar />
        <HeroSection />
        <NewsSection />
      </main>
      <footer className={styles.footer}>
        Hi Home footer Content here
      </footer>
    </div>
  );
}

export default HomePage