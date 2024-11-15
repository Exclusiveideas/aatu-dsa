import "./heroSection.css";
import { Poppins } from "next/font/google";
import { CTAButtonAlt } from "../ctaButton";
import { Leva } from "leva";
import dynamic from "next/dynamic";
import Blob from "../blob";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(CustomEase, ScrollToPlugin);

const ThreeDTextBulge = dynamic(() => import("@/components/3DTextBulge"), {
  ssr: false,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const HeroSection = ({ targetRef }) => {
  const handleScrollToElement = () => {
    if (!targetRef.current && !window) return;

    gsap.to(window, {
      scrollTo: targetRef.current,
      duration: 1,
      ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1 "),
    });
  };

  return (
    <div className="heroSectWrapper">
      <div className="heroSectBody">
        <Blob />
        <div className="heroInfo">
          <div className="infoBox">
            <div className="threeDTxtWrapper">
              <ThreeDText />
            </div>
            <p className={`headerCaption  ${poppins.className} marginLeft`}>
              This site is here to keep you connected and informed with
              everything you need for your hostel experience, brought to you by
              the Dean of Student Affairs.
            </p>
            <CTAButtonAlt
              customStyles={{ marginLeft: "5rem" }}
              onClick={handleScrollToElement}
            >
              What's going on?
            </CTAButtonAlt>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

const ThreeDText = () => {
  return (
    <>
      <Leva
        collapsed={false}
        flat={true}
        hidden
        theme={{
          sizes: {
            titleBarHeight: "28px",
          },
          fontSizes: {
            root: "10px",
          },
        }}
      />
      <ThreeDTextBulge />
    </>
  );
};
