import "./heroSection.css";
import { CTAButtonAlt } from "../ctaButton";
import { Leva } from "leva";
import dynamic from "next/dynamic";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import Blob from "../blob";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";

gsap.registerPlugin(CustomEase, ScrollToPlugin);

const ThreeDTextBulge = dynamic(() => import("@/components/3DTextBulge"), {
  ssr: false,
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
              <ThreeDText lightMode={false} />
              <ThreeDText lightMode={true} />
            </div>
            <p className={`headerCaption marginLeft`}>
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

const ThreeDText = ({ lightMode }) => {
  const websiteDarkTheme = useAuthStore((state) => state.websiteDarkTheme);
  const [invinsible, setInvinsible] = useState(false)

  useEffect(() => {
    if (lightMode) {
      const ivisible = websiteDarkTheme === 'dark' ? false : true;
      setInvinsible(ivisible)
    } else {
      const ivisible = websiteDarkTheme === 'dark' ? true : false;
      setInvinsible(ivisible)
    }
  }, [websiteDarkTheme])
  

  return (
    <div className={`threeDTxt_container ${invinsible && 'invinsible'}`}>
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
      <ThreeDTextBulge lightMode={lightMode} />
    </div>
  );
};
