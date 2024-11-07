import "./ctaBtn.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Poppins } from 'next/font/google';
import Link from "next/link";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500'], 
  display: 'swap',   
});


const CTAButton = ({ children, linkTo }) => {
  return (
    <Link href={linkTo || ''} className={`ctaBtnWrapper  ${poppins.className}`}>
      <div className="ctaBtn_innerCont">
        <p>{children}</p>
      </div>
    </Link>
  );
};

export default CTAButton;



export const CTAButtonAlt = ({ children, linkTo }) => {
  return (
    <Link href={linkTo || ''} className={`ctaBtnAltWrapper  ${poppins.className}`}>
      <p>{children}</p>
      <div className="btnRightIcon">
        <ChevronRightIcon
          sx={{
            color: "black",
            cursor: "pointer",
            fontSize: "22px",
          }}
        />
      </div>
    </Link>
  );
};
