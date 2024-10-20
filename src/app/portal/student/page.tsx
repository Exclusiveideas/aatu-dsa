"use client";

import React, { useEffect, useState } from "react";
import "./student.css";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeComp from "@/components/studentPortalComp/home";
import RoomComp from "@/components/studentPortalComp/room";
import HRulesComp from "@/components/studentPortalComp/hRules";
import SRulesComp from "@/components/studentPortalComp/sRules";
import OyshaComp from "@/components/studentPortalComp/oysha";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { navOpts } from "@/utils/constant";



const StudentPortal = () => {
  const [activeOpt, setActiveOpt] = useState(0);
  
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const studentInfo = useAuthStore((state) => state.student);

  const router = useRouter();

  function logOutStudent() {
    logout();
  }


  useEffect(() => {
    if(!isAuthenticated) router.push("/portal/auth");
  }, [isAuthenticated])
  

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
              priority={true}
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
          <div className="vnOption" onClick={logOutStudent}>
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
          <Tooltip title={`${studentInfo?.email}`}>
            <IconButton>
              <img
                src="/mail_unread.svg"
                alt="mail icon"
                className="mail_icon"
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={`${studentInfo?.fullName}`}>
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
