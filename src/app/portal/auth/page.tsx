"use client";

import React, { useEffect, useRef, useState } from "react";
import "./auth.css";
import { handleAuthTypeTransition, uploadNewUser } from "@/utils/authFunctions";
import { useRouter } from "next/navigation";
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';

import { LoginComp, SignUpComp } from "@/components/authComponents";
import useAuthStore from "@/store/authStore";

const AuthPage = () => {
  const [authLogin, setAuthLogin] = useState(true);
  const [signUpStep, setSignUpStep] = useState(1);
  const stepsRef = useRef([]);
  const authImgRef = useRef(null);
  const moveableWrapRef = useRef(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    handleAuthTypeTransition(authImgRef, moveableWrapRef, authLogin);
  }, [authLogin]);

  useEffect(() => {
    if (isAuthenticated) router.push("/portal/student");
  }, [isAuthenticated]);

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
            <LoginComp setAuthLogin={setAuthLogin} router={router} setSnackbarOpen={setSnackbarOpen}/>
          ) : (
            <SignUpComp
              signUpStep={signUpStep}
              setSignUpStep={setSignUpStep}
              stepsRef={stepsRef}
              setAuthLogin={setAuthLogin}
              router={router}
              setSnackbarOpen={setSnackbarOpen}
            />
          )}
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        TransitionComponent={Fade}
        message="Redirecting you now..."
        autoHideDuration={300}
      />
    </div>
  );
};

export default AuthPage;
