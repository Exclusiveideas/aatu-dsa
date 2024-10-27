"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import { switchAltLogin, setRef } from "@/utils/authFunctions";
import { resetPassword, signIn } from "@/api";

import useAuthStore from "@/store/authStore";
import { ForgotPassword, Login } from "../loginAlternates";




const LoginComp = ({ setAuthLogin, router, setSnackbarOpen, setSnackbarMessage }) => {
  const [toggleShow, settoggleShow] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [islogging, setIslogging] = useState(false);
  const [switched, setSwitched] = useState(false);
  const [resetFeedback, setResetFeedback] = useState('');
  const stepsRef = useRef([]);


  // global state
  const updateIsAuthenticated = useAuthStore((state) => state.updateIsAuthenticated);
  const updateStudent = useAuthStore((state) => state.updateStudent);
  const updateToken = useAuthStore((state) => state.updateToken);

  const handleSubmit = (e, action) => {
    setIslogging(true);

    if (action == 'login') {
      loginUser({
        matric: e.target[0].value,
        password: e.target[1].value,
      });
    } else {
      resetUserPassword(e);
    }
  };

  const loginUser = async (formData) => {
    const response  = await signIn(formData);

    if (response?.status != 200) {
      setLoginError(response?.error);
      setIslogging(false);
      return;
    }
    const fetchedStudent = response?.user.data


    // save user details
    updateIsAuthenticated(true);
    updateStudent(fetchedStudent?.result);
    updateToken(fetchedStudent?.token);
    

    setIslogging(false);
    setSnackbarOpen(true);

    router.push("/portal/student");
  };


  const resetUserPassword = async (e) => {
    const response = await resetPassword(e);
  
    if (response?.status !== 200) {
      setLoginError(response?.error);
      setIslogging(false);
      return;
    } else {
      setResetFeedback("Password reset was successful - Don't forget your new password")
      setIslogging(false);
      setSnackbarMessage("Password reset was successful - Don't forget your new password");
      setSnackbarOpen(true);
    }
  
    // Check if `window` is available before reloading the page
    if (typeof window !== 'undefined') {
      setTimeout(() => window.location.reload(), 1000);
    }
  };
  

  const gotoSignUp = () => {
    setAuthLogin(false);
  };

  const changeAltLogin = (dir) => {
    setSwitched(() => dir =='next' ? true: false)
    switchAltLogin({ dir, stepsRef});
  }


  return (
    <div className="loginComp">
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
      <h2>{!switched ? 'Login to your account': 'Reset your password'}</h2>
      <div className="formBox login">
        <div ref={(el) => setRef(el, 0, stepsRef)} className="altCont">
          <Login changeAltLogin={changeAltLogin} handleSubmit={handleSubmit} setLoginError={setLoginError} toggleShow={toggleShow} settoggleShow={settoggleShow} loginError={loginError} gotoSignUp={gotoSignUp} islogging={islogging} />
        </div>
        <div ref={(el) => setRef(el, 1, stepsRef)} className="altCont">
          <ForgotPassword changeAltLogin={changeAltLogin} handleSubmit={handleSubmit} setLoginError={setLoginError} toggleShow={toggleShow} settoggleShow={settoggleShow} loginError={loginError} islogging={islogging} resetFeedback={resetFeedback} />
        </div>      
      </div>
    </div>
  );
}







export default LoginComp