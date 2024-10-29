"use client";

import { useEffect, useRef, useState } from "react";
import "./auth.css";
import { handleAuthTypeTransition } from "@/utils/authFunctions";
import { useRouter } from "next/navigation";

import useAuthStore from "@/store/authStore";
import useWindowWidth from "@/utils/hooks/useWindowWidth";
import SignUpComp from "@/components/authComponents/signUpComp";
import LoginComp from "@/components/authComponents/loginComp";
import SnackbarMessage from "@/components/snackbarMessage";
import useSnackbarStore from "@/store/snackbarStore";

const AuthPage = () => {
  const [authLogin, setAuthLogin] = useState(true);
  const [signUpStep, setSignUpStep] = useState(1);
  const authImgRef = useRef(null);
  const moveableWrapRef = useRef(null);

  const smallerWindow = useWindowWidth();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  const updateSnackbarMessage = useSnackbarStore((state) => state.updateSnackbarMessage);
  const updateSnackbarVariant = useSnackbarStore((state) => state.updateSnackbarVariant);
  const updateSnackbarInitiated = useSnackbarStore((state) => state.updateSnackbarInitiated);


  useEffect(() => {
    if (!smallerWindow)
      handleAuthTypeTransition(authImgRef, moveableWrapRef, authLogin);
  }, [authLogin, smallerWindow]);

  useEffect(() => {
    if (isAuthenticated) router.push("/portal/student");
  }, [isAuthenticated]);

  
  const openSnackBar = (message, variant) => {
    updateSnackbarMessage(message)
    updateSnackbarVariant(variant)
    updateSnackbarInitiated()
  }


  return (
    <div className="authPage">
      <div className="leftAuthWrapper">
        <img
          ref={authImgRef}
          src="/auth_img.jpeg"
          alt="login image"
          className="authImage"
        />
      </div>
      <div className="rightAuthWrapper">
        <div ref={moveableWrapRef} className="moveableWrapper">
          {authLogin ? (
            <LoginComp setAuthLogin={setAuthLogin} router={router} openSnackBar={openSnackBar} />
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
