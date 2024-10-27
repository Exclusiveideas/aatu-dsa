"use client";

import { useEffect, useRef, useState } from "react";
import "./auth.css";
import { handleAuthTypeTransition } from "@/utils/authFunctions";
import { useRouter } from "next/navigation";
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';

import { LoginComp, SignUpComp } from "@/components/authComponents";
import useAuthStore from "@/store/authStore";
import useWindowWidth from "@/utils/hooks/useWindowWidth";

const AuthPage = () => {
  const [authLogin, setAuthLogin] = useState(true);
  const [signUpStep, setSignUpStep] = useState(1);
  const authImgRef = useRef(null);
  const moveableWrapRef = useRef(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackBarMessage, setSnackbarMessage] = useState('Redirecting you now...');

  const smallerWindow = useWindowWidth();

  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if(!smallerWindow) handleAuthTypeTransition(authImgRef, moveableWrapRef, authLogin);
  }, [authLogin, smallerWindow]);


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
            <LoginComp setAuthLogin={setAuthLogin} router={router} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage}/>
          ) : (
            <SignUpComp
              signUpStep={signUpStep}
              setSignUpStep={setSignUpStep}
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
        message={snackBarMessage}
        autoHideDuration={300}
      />
    </div>
  );
};

export default AuthPage;
