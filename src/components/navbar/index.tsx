import Image from "next/image";
import React from "react";
import './navbar.css'
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbarWrapper">
      <a href="/" className="logoWrapper">
        <Image
          src={'/logo.png'} 
          width={190}
          height={80}
          alt="tech-u logo"
          className='logo'
        />
      </a>
      <div className="portalBtnWrapper">
        <Link href="/portal/auth" className="portalBtn">
            <div className="pulsatingBox"></div>
            Portal
        </Link>
        
      </div>
    </div>
  );
};

export default Navbar;
