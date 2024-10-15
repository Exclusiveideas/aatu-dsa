import React from "react";
import "./footer.css";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footerWrapper">
      <div className="topFooter">
        <a href="/" className="logoWrapper">
          <Image
            src={"/logo.png"}
            width={190}
            height={80}
            alt="tech-u logo"
            className="logo"
          />
        </a>
        <div className="credits">
          <p className="developer">
            Developed By:{" "}
            <a
              href="https://github.com/Exclusiveideas"
              rel="noopener noreferrer"
              target="_blank"
              className="creditsTxt"
            >
              Muftau
            </a>
          </p>
          <p className="developer">
            Designed By:{" "}
            <a
              href="https://muftau-scripts.web.app/"
              rel="noopener noreferrer"
              target="_blank"
              className="creditsTxt"
            >
              Abdul-Azeem
            </a>
          </p>
        </div>
      </div>

      <div className="copyrightInfo">
        <p>&copy; copyright {currentYear}</p>
      </div>
    </div>
  );
};

export default Footer;
