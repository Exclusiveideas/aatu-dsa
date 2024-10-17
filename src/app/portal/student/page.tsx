"use client";

import React, { useState } from "react";
import "./student.css";
import Image from "next/image";
import BedIcon from "@mui/icons-material/Bed";
import GiteIcon from "@mui/icons-material/Gite";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LogoutIcon from "@mui/icons-material/Logout";

const navOpts = [
  {
    name: "My Room",
    Icon: (
      <BedIcon
        sx={{
          color: "black",
          cursor: "pointer",
          fontSize: "25px",
        }}
      />
    ),
  },
  {
    name: "Hostel Rules & Reg",
    Icon: (
      <GiteIcon
        sx={{
          color: "black",
          cursor: "pointer",
          fontSize: "25px",
        }}
      />
    ),
  },
  {
    name: "School Rules & Reg",
    Icon: (
      <SchoolOutlinedIcon
        sx={{
          color: "black",
          cursor: "pointer",
          fontSize: "25px",
        }}
      />
    ),
  },
  {
    name: "OYSHIA",
    Icon: (
      <HealthAndSafetyIcon
        sx={{
          color: "black",
          cursor: "pointer",
          fontSize: "25px",
        }}
      />
    ),
  },
];

const StudentPortal = () => {
  const [activeOpt, setActiveOpt] = useState(0);

  function Logout() {
    console.log("logging out...");
    return;
  }

  return (
    <div className="stdPortal">
      <div className="vertNavbar">
        <div className="vnTopSect">
          <a href="/">
            <Image
              src={"/logo.png"}
              width={340}
              height={150}
              alt="tech-u logo"
              className="logo"
            />
          </a>
        </div>
        <div className="vnMidSect">
          {navOpts?.map((navOpt, i) => (
            <div
              key={i}
              className={`vnOption ${activeOpt == i && "selectedOpt"} `}
              onClick={() => setActiveOpt(i)}
            >
              {navOpt.Icon}
              <p>{navOpt.name}</p>
            </div>
          ))}
        </div>
        <div className="vnBottomSect">
          <div className="vnOption" onClick={Logout}>
            <LogoutIcon
              sx={{
                color: "black",
                cursor: "pointer",
                fontSize: "25px",
              }}
            />
            <p>Log out</p>
          </div>
        </div>
      </div>
      <div className="navContentWrapper">content</div>
    </div>
  );
};

export default StudentPortal;
