import "./heroSection.css";
import { Poppins } from "next/font/google";
import Navbar from "../navbar";
import SlideInText from "../slideUpText";
import { CTAButtonAlt } from "../ctaButton";
import { Leva } from "leva";
import dynamic from "next/dynamic";
import Blob from "../blob";

const ThreeDTextBulge = dynamic(() => import("@/components/3DTextBulge"), {
  ssr: false,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const HeroSection = () => {

  return (
    <div className='heroSectWrapper'>
      <div className="heroSectBody">
        <Navbar />
        <Blob />
        <div className="heroInfo">
          <div className="infoBox">
            <div className="threeDTxtWrapper">
              <ThreeDText />
            </div>
            <SlideInText>
              <p
                className={`headerCaption  ${poppins.className} marginLeft`}
              >
                This site is here to keep you connected and informed with
                everything you need for your hostel experience, brought to you
                by the Dean of Student Affairs.
              </p>
            </SlideInText>
            <SlideInText>
              <CTAButtonAlt customStyles={{marginLeft: '5rem' }} linkTo={"/all-news"}>What's going on?</CTAButtonAlt>
            </SlideInText>
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
