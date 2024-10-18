import Image from "next/image";
import React from "react";
import './navbar.css'
import Link from "next/link";


const Navbar = ({ newPage }: any) => {
  return (
    <div className={`navbarWrapper ${newPage && 'solid'}`}>
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
