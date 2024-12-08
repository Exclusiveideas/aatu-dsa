import "./ctaBtn.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";


const CTAButton = ({ children, linkTo }) => {
  return (
    <Link href={linkTo || ''} className={`ctaBtnWrapper`}>
      <div className="ctaBtn_innerCont">
        <p>{children}</p>
      </div>
    </Link>
  );
};

export default CTAButton;



export const CTAButtonAlt = ({ children, customStyles, onClick }) => {
  const nullClick = () => {}
  
  return (
    <div onClick={onClick || nullClick} style={customStyles ? customStyles : {}} className={`ctaBtnAltWrapper`}>
      <p>{children}</p>
      <div className="btnRightIcon">
        <ChevronRightIcon
          sx={{
            color: "black",
            fontSize: "22px",
          }}
        />
      </div>
    </div>
  );
};
