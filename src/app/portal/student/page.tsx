"use client";

import React, { useEffect, useState } from "react";
import "./student.css";
import '../auth/auth.css'
import '@/components/studentPortalComp/sPortal.css';
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
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
import { Backdrop, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { uploadPic } from "@/utils/authFunctions";
import { updateStdPassport } from "@/api";

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
    toggleChangePicModal()
    toggleImageSelected()
  }


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
                <img
                  src="/mail_unread.svg"
                  alt="mail icon"
                  className="mail_icon"
                />
              </IconButton>
            </Tooltip>
            <Tooltip title={`${studentInfo?.fullName}`}>
              <IconButton onClick={handlePicClicked}>
                <div className="profilePicCirc">
                  <img
                    src={`${studentInfo?.imageLink || '/me.jpg'}`}
                    alt="profile picture"
                    className="profilePic"
                  />
                </div>
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
        {changeImageSelected ? <ChangeImageComp /> : <OyshiaRequired setActiveOpt={setActiveOpt} />}
        </>
      </Backdrop>
    </div>
  );
};

export default StudentPortal;







const OyshiaRequired = ({setActiveOpt}: any) => {
  const [redirecting, setRedirecting] = useState(false);

  const changePicModalOpen = usePortalStore(
    (state) => state.changePicModalOpen
  );
  const toggleChangePicModal = usePortalStore(
    (state) => state.toggleChangePicModal
  );

  useEffect(() => {
    const timeoutIds: any = [];
  
    if (changePicModalOpen) {
      timeoutIds.push(
        setTimeout(() => {
          setRedirecting(true);
        }, 1500)
      );
  
      timeoutIds.push(
        setTimeout(() => {
          setActiveOpt(4);
          toggleChangePicModal();
          setRedirecting(false);
        }, 3000)
      );
    }
  
    // Cleanup function to clear all timeouts when the component unmounts or changePicModalOpen changes
    return () => {
      timeoutIds.forEach((timeoutId: any) => clearTimeout(timeoutId));
    };
  }, [changePicModalOpen]);

  return (
    <div className="oyshia_cardWrapper">
      <div className="oyshia_InfoWrapper">
        <p>{redirecting ? "Redirecting you now..." : "You must fill out and submit your OYSHIA form first."}</p>
      </div>
    </div>
  );
};







const ChangeImageComp = () => {
  const [file, setFile]: any = useState(null);
  const [noSelected, setNoSelected]: any = useState(false);
  const [errorMessage, setErrorMessage]: any = useState('');
  const [uploadSuccess, setUploadSuccess]: any = useState(false);
  const [isUpdating, setIsUploading]: any = useState(false);

  const changePicModalOpen = usePortalStore(
    (state) => state.changePicModalOpen
  );
  
  const logout = useAuthStore((state) => state.logout);
  
  const studentInfo = useAuthStore<any>((state) => state.student);

  const toggleChangePicModal = usePortalStore(
    (state) => state.toggleChangePicModal
  );
  const toggleImageSelected = usePortalStore(
    (state) => state.toggleImageSelected
  );

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleContinue = () => {
    if (!file) {
      setNoSelected(true);
      return;
    }
    
    setIsUploading(true);

    // update the uploadImage content
    uploadPic(file, fileUploadSuccess, setErrorMessage, setIsUploading);

  };

  const fileUploadSuccess = async (downloadUrl:any) => {
    
    console.log('downloadUrl: ', downloadUrl)

    
    const updateRes: any = await updateStdPassport({matric: studentInfo?.matric, downloadUrl});

    setIsUploading(false);
    if(updateRes?.status != 200) {
      return
    }

    setUploadSuccess(true);
    setTimeout(() => logout(), 1500)
  }

  useEffect(() => {
    if (file) setNoSelected(false);
  }, [file]);


  useEffect(() => {
    setIsUploading(false)
    setNoSelected(false)
    setFile(null)
    setErrorMessage('')
  }, [changePicModalOpen, uploadSuccess]);

  useEffect(() => {
    setUploadSuccess(false)
  }, [changePicModalOpen]);

  const closeBackDrop = () => {
    if(isUpdating) return;

    toggleChangePicModal();
    toggleImageSelected();
  }

  

  return (
    <div className="changeImageComp">
      <div className="topSect">
        <h3>Change Your Passport</h3>
      </div>
      <CloseIcon
        sx={{
          color: "black",
          cursor: "pointer",
        }}
        className="modalCloseBtn"
        onClick={closeBackDrop}
      />
      <div className="bottomSect">
        <input
          type="file"
          id="file"
          accept="image/*"
          className="file-input"
          onChange={handleFileChange}
        />
        <label htmlFor="file" className="addImgCirc">
          <div className="pulsatingBox"></div>
          <div className="pulsatingBox"></div>
          <PersonAddAlt1Icon
            sx={{
              color: "white",
              cursor: "pointer",
              fontSize: "250%",
            }}
          />
        </label>
        {!file ? (
          <p className="tapTxt">Click to upload your passport</p>
        ) : (
          <p className="tapTxt">Selected file: {file?.name}</p>
        )}
        {noSelected && (
          <p className="selectFile">Please upload your correct passport</p>
        )}
        {errorMessage && <p className="selectFile">{errorMessage}</p>}
        {uploadSuccess && (
          <p className="selectFile green">Passport Upload successful</p>
        )}
        <div className="formBtns">
          <div className="authBtn" onClick={handleContinue}>
            {isUpdating ? (
              <CircularProgress size="13px" className="circularProgress" />
            ) : (
              <p>Upload</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
