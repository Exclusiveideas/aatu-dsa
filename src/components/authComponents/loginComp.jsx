"use client";

import { useEffect, useRef, useState } from "react";

import { switchAltLogin, setRef } from "@/utils/authFunctions";
import { resetPassword, signIn } from "@/api";

import useAuthStore from "@/store/authStore";
import { ForgotPassword, Login } from "../loginAlternates";

import './authComponent.css';


const LoginComp = ({ setAuthLogin, router, openSnackBar }) => {
  const [toggleShow, settoggleShow] = useState(false);
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
    setResetFeedback('')
    

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
      openSnackBar(response?.error, 'error')
      setIslogging(false);
      return;
    }

    const fetchedStudent = response?.user.data
    
    openSnackBar('Login sucessful', 'success')


    // save user details
    updateIsAuthenticated(true);
    updateStudent(fetchedStudent?.result);
    updateToken(fetchedStudent?.token);
    

    setIslogging(false);

    router.push("/portal/student");
  };


  const resetUserPassword = async (e) => {
    const response = await resetPassword(e);
  
    setIslogging(false);

    if (response?.status !== 200) {
      openSnackBar(response?.error, 'error')
      return;
    } 
    
    openSnackBar("Password reset was successful - Don't forget your new password", 'success')
    
  
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

  useEffect(() => {
  // clears the message when unmounting
    return () => {
      openSnackBar('', 'success')
    }
  }, [])
  


  return (
    <div className="loginComp">
      <h2 className="authTitle">{!switched ? 'Login to your account': 'Reset your password'}</h2>
      <div className="formBox login">
        <div ref={(el) => setRef(el, 0, stepsRef)} className="altCont">
          <Login changeAltLogin={changeAltLogin} handleSubmit={handleSubmit} toggleShow={toggleShow} settoggleShow={settoggleShow} gotoSignUp={gotoSignUp} islogging={islogging} />
        </div>
        <div ref={(el) => setRef(el, 1, stepsRef)} className="altCont">
          <ForgotPassword changeAltLogin={changeAltLogin} handleSubmit={handleSubmit} toggleShow={toggleShow} settoggleShow={settoggleShow} islogging={islogging} resetFeedback={resetFeedback} />
        </div>      
      </div>
    </div>
  );
}







export default LoginComp