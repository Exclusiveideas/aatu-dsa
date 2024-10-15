import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/index";
import HeroSection from "@/components/heroSection/index";
import NewsSection from "@/components/newsSection/index";
import Footer from "@/components/footer";

const HomePage = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.firstSection}>
          <Navbar />
          <HeroSection />
        </div>
        <NewsSection />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
