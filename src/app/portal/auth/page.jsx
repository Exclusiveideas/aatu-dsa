"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import "./auth.css";
import { useRouter } from "next/navigation";

import useAuthStore from "@/store/authStore";
import useWindowWidth from "@/utils/hooks/useWindowWidth";
import SignUpComp from "@/components/authComponents/signUpComp";
import LoginComp from "@/components/authComponents/loginComp";
import SnackbarMessage from "@/components/snackbarMessage";
import useSnackbarStore from "@/store/snackbarStore";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Chip } from "@mui/material";
import ThemeToggleBtn from "@/components/themeToggleBtn";

const ThreeSphere = dynamic(() => import("@/components/ThreeSphere"), {
  ssr: false,
});

const AuthPage = () => {
  const [authLogin, setAuthLogin] = useState(true);
  const [signUpStep, setSignUpStep] = useState(1);
  const moveableWrapRef = useRef(null);

  const { smallerWindow } = useWindowWidth();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const updateSnackbarMessage = useSnackbarStore(
    (state) => state.updateSnackbarMessage
  );
  const updateSnackbarVariant = useSnackbarStore(
    (state) => state.updateSnackbarVariant
  );
  const updateSnackbarInitiated = useSnackbarStore(
    (state) => state.updateSnackbarInitiated
  );

  useEffect(() => {
    if (smallerWindow) return;
    // handleAuthTypeTransition(authImgRef, moveableWrapRef, authLogin); // animation to move left wrapper to right side
  }, [authLogin, smallerWindow]);

  useEffect(() => {
    if (isAuthenticated) router.push("/portal/student");
  }, [isAuthenticated]);

  const openSnackBar = (message, variant) => {
    updateSnackbarMessage(message);
    updateSnackbarVariant(variant);
    updateSnackbarInitiated();
  };

  
  const websiteDarkTheme = useAuthStore((state) => state.websiteDarkTheme);

  return (
    <div className="authPage">
      <div className="bgImage_cover"></div>
      <div className="backgroung_image">
        <Image
          src={"/imgs/library.png"}
          width={600}
          height={600}
          alt="tech-u library"
          className={`library_img ${websiteDarkTheme == 'dark' && 'darkTheme'}`}
        />
      </div>
      <div className="leftAuthWrapper">
        <div className="bgImage"></div>
        <div className="chipContainer">
          <Chip
            color="primary"
            size="small"
            sx={{
              color: "white",
              fontSize: "10px",
              padding: "1rem 0.5rem",
              backgroundColor: "#287570",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            label="Drag Me"
          />
        </div>
        <div className="loaderContainer">
          <div class="loader"></div>
        </div>
        <div className="leftAuth_content_box">
          <div className="leftAuth_contentBox_logoCont">
            <a href="/">
              <Image
                src={"/imgs/logo.png"}
                width={340}
                height={150}
                alt="tech-u logo"
                className="login_logo"
              />
            </a>
          </div>
          <div className="leftAuth_contentBox_threeDCont">
            {!smallerWindow ? (
              <Suspense fallback={<div>Loading 3D Scene...</div>}>
                <ThreeSphere />
              </Suspense>
            ) : (
              <p>Use a larger screen size to view the scene</p>
            )}
          </div>
        </div>
      </div>
      <div className="rightAuthWrapper">
        <div ref={moveableWrapRef} className="moveableWrapper">
        <div className="authTheme_toggleWrapper">
          <ThemeToggleBtn />
        </div>
          {authLogin ? (
            <LoginComp
              setAuthLogin={setAuthLogin}
              router={router}
              openSnackBar={openSnackBar}
            />
          ) : (
            <SignUpComp
              signUpStep={signUpStep}
              setSignUpStep={setSignUpStep}
              setAuthLogin={setAuthLogin}
              router={router}
              openSnackBar={openSnackBar}
            />
          )}
        </div>
      </div>
      <SnackbarMessage />
    </div>
  );
};

export default AuthPage;
