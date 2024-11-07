import "./heroSection.css";
import Navbar from "../navbar";
import { Poppins } from "next/font/google";
import { CTAButtonAlt } from "../ctaButton";
import Blob from "../blob";
import useHomeStore from "@/store/homeStore";
import SlideInText from "../slideUpText";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const HeroSection = () => {
  const isNavbarOpen = useHomeStore((state) => state.isNavbarOpen);

  return (
    <div className={`heroSectWrapper ${isNavbarOpen && "disappear"}`}>
      <Navbar />
      <Blob />
      {/* <ImageCarousel /> */}
      <div className="heroInfo">
        <div className="infoBox">
          <SlideInText style={{ width: "max-content" }}>
            <h1 className="headerTxt">Your Digital Portal</h1>
          </SlideInText>
          <SlideInText>
            <h1 className="headerTxt">to Excellence</h1>
          </SlideInText>
          <SlideInText>
            <p
              className={`headerCaption  ${poppins.className}`}
              style={{ width: "78%" }}
            >
              This site is here to keep you connected and informed with
              everything you need for your hostel experience, brought to you by
              the Dean of Student Affairs.
            </p>
          </SlideInText>
          <SlideInText>
            <CTAButtonAlt linkTo={"/all-news"}>What's going on?</CTAButtonAlt>
          </SlideInText>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
