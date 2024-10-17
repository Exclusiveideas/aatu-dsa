"use client";

import React, { useEffect, useRef, useState } from "react";
import "./auth.css";
import {
  handleAuthTypeTransition,
  uploadNewUser,
} from "@/utils/functions";
import { useRouter } from "next/navigation";

import { LoginComp, SignUpComp } from "@/components/authComponents";



const AuthPage = () => {
  const [authLogin, setAuthLogin] = useState(true);
  const [signUpStep, setSignUpStep] = useState(1);
  const stepsRef = useRef([]);
  const authImgRef = useRef(null);
  const moveableWrapRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    handleAuthTypeTransition(authImgRef, moveableWrapRef, authLogin);
  }, [authLogin]);



  const createUser = () => {
    uploadNewUser();

    // router.push('/portal/student')
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
            <LoginComp setAuthLogin={setAuthLogin} router={router} />
          ) : (
            <SignUpComp
              signUpStep={signUpStep}
              setSignUpStep={setSignUpStep}
              stepsRef={stepsRef}
              setAuthLogin={setAuthLogin}
              createUser={createUser}
              router={router}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;


