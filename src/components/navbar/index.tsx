import Image from "next/image";
import React from "react";
import logo from '@/app/assets/logo.png';
import './navbar.css'

const Navbar = () => {
  return (
    <div className="navbarWrapper">
      <div className="logoWrapper">
        <Image
          src={logo}
          width={190}
          height={80}
          alt="Background logo"
          className='logo'
        />
      </div>
      <div className="portalBtnWrapper">
        <div className="portalBtn">
            <div className="pulsatingBox"></div>
            Portal
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
