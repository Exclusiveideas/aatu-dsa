"use client";

import { useEffect, useState } from "react";
import "./student.css";
import "../auth/auth.css";
import "@/components/studentPortalComp/sPortal.css";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeComp from "@/components/studentPortalComp/home";
import RoomComp from "@/components/studentPortalComp/room";
import HRulesComp from "@/components/studentPortalComp/hRules";
import SRulesComp from "@/components/studentPortalComp/sRules";
import OyshiaComp from "@/components/studentPortalComp/oyshia";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import useAuthStore from "@/store/authStore";
import { navOpts } from "@/utils/constant";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import usePortalStore from "@/store/portalStore";
import PersonIcon from "@mui/icons-material/Person";
import { Backdrop } from "@mui/material";
import { useRouter } from "next/navigation";
import { fetchStudentData } from "@/api";
import ChangeImageComp from "@/components/backdropComps/changeImage";
import OyshiaRequired from "@/components/backdropComps/oyshiaRequired";










const StudentPortal = () => {
  const [activeOpt, setActiveOpt] = useState(0);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const studentInfo = useAuthStore((state) => state.student);
  const mobileNavbarOpen = usePortalStore((state) => state.mobileNavbarOpen);
  const toggleMobileNavbar = usePortalStore(
    (state) => state.toggleMobileNavbar
  );
  const changePicModalOpen = usePortalStore(
    (state) => state.changePicModalOpen
  );
  const toggleChangePicModal = usePortalStore(
    (state) => state.toggleChangePicModal
  );
  const toggleImageSelected = usePortalStore(
    (state) => state.toggleImageSelected
  );
  const changeImageSelected = usePortalStore(
    (state) => state.changeImageSelected
  );

  const updateStudent = useAuthStore((state) => state.updateStudent);

  const router = useRouter();

  function logOutStudent() {
    logout();
  }

  useEffect(() => {
    if (!isAuthenticated) {
      const timeoutId = setTimeout(() => {
        router.push("/portal/auth");
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (mobileNavbarOpen) toggleMobileNavbar();
  }, [activeOpt]);

  const handlePicClicked = () => {
    toggleChangePicModal(true);
    toggleImageSelected(true);
  };

  // const studentInfo = useAuthStore((state) => state.student);

  useEffect(() => {
    if (!studentInfo?.matric) return;

    fetchNewDetails();
  }, [studentInfo?.matric]); // Runs on every hard reload

  const fetchNewDetails = async () => {
    const { status, student } = await fetchStudentData(
      studentInfo?.matric
    );
    if (status != 200) return;

    if(student?.data.result) updateStudent(student?.data.result);
  };

  return (
    <div className="stdPortal">
      <div className={`vertNavbar ${mobileNavbarOpen && "mobileNavbarOpen"}`}>
        <div className="vnTopSect">
          <a href="/">
            <img src={"/logo.png"} alt="tech-u logo" className="logo" />
          </a>
          <CloseIcon
            sx={{
              color: "black",
              cursor: "pointer",
            }}
            className="NavbarIcon close"
            onClick={toggleMobileNavbar}
          />
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
          <MenuIcon
            sx={{
              color: "black",
              cursor: "pointer",
            }}
            className="NavbarIcon"
            onClick={toggleMobileNavbar}
          />

          <div className="mailAndPicture">
            <Tooltip title={`${studentInfo?.email}`}>
              <IconButton>
                <img src="/mail_unread.svg" alt=" icon" className="mail_icon" />
              </IconButton>
            </Tooltip>

            <Tooltip title={`${studentInfo?.fullName}`}>
              <IconButton onClick={handlePicClicked}>
                {studentInfo?.imageLink ? (
                  <div className="profilePicCirc">
                    <img
                      src={`${studentInfo?.imageLink || "/me.jpg"}`}
                      alt="profile picture"
                      className="profilePic"
                    />
                  </div>
                ) : (
                  <div className="profilePicCirc icon">
                    <PersonIcon
                      sx={{
                        color: "grey",
                        cursor: "pointer",
                        fontSize: "25px",
                      }}
                    />
                  </div>
                )}
              </IconButton>
            </Tooltip>
          </div>
        </div>
        {activeOpt == 0 && <HomeComp />}
        {activeOpt == 1 && <RoomComp />}
        {activeOpt == 2 && <HRulesComp />}
        {activeOpt == 3 && <SRulesComp />}
        {activeOpt == 4 && <OyshiaComp />}
      </div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={changePicModalOpen}
        onClick={() => {}}
      >
        <>
          {changeImageSelected ? (
            <ChangeImageComp />
          ) : (
            <OyshiaRequired setActiveOpt={setActiveOpt} />
          )}
        </>
      </Backdrop>
    </div>
  );
};

export default StudentPortal;

