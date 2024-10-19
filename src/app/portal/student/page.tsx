"use client";

import React, { useState } from "react";
import "./student.css";
import Image from "next/image";
import BedIcon from "@mui/icons-material/Bed";
import GiteIcon from "@mui/icons-material/Gite";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeComp from "@/components/studentPortalComp/home";
import RoomComp from "@/components/studentPortalComp/room";
import HRulesComp from "@/components/studentPortalComp/hRules";
import SRulesComp from "@/components/studentPortalComp/sRules";
import OyshaComp from "@/components/studentPortalComp/oysha";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const navOpts = [
  {
    name: "Home",
    Icon: (
      <HomeOutlinedIcon
        sx={{
          color: "black",
          cursor: "pointer",
          fontSize: "25px",
        }}
      />
    ),
  },
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

  const student = {
    mail: "muftau@gmail.com",
    name: "Sanusi Adebayo",
  };

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
      <div className="navContentWrapper">
        <div className="topBarWrapper">
          <Tooltip title={`${student?.mail}`}>
            <IconButton>
              <img
                src="/mail_unread.svg"
                alt="mail icon"
                className="mail_icon"
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={`${student?.name}`}>
            <IconButton>
              <div className="profilePicCirc">
                <img
                  src="/me.jpg"
                  alt="profile picture"
                  className="profilePic"
                />
              </div>
            </IconButton>
          </Tooltip>
        </div>
        {activeOpt == 0 && <HomeComp />}
        {activeOpt == 1 && <RoomComp />}
        {activeOpt == 2 && <HRulesComp />}
        {activeOpt == 3 && <SRulesComp />}
        {activeOpt == 4 && <OyshaComp />}
      </div>
    </div>
  );
};

export default StudentPortal;
