import React, { useEffect, useRef, useState } from "react";
import "../../app/portal/auth/auth.css";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material";
import { validateStepOne, validateStepThree } from "@/utils/functions";



export const StepOne = ({ nextProcess, setAuthLogin, setSignUpInfo }: any) => {
  const [formErr, setFormErr] = useState('')
 
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const updatedInfo = {
      fullName: e.target[0].value,
      matric: e.target[1].value,
      email: e.target[2].value,
      programme: e.target[3].value,
      level: e.target[4].value,
    }

    const validated = validateStepOne(updatedInfo, setFormErr)
    if(!validated) return;

    // update the signUp details
    setSignUpInfo((prevInfo: any) => ({ 
      ...prevInfo, 
      ...updatedInfo
    }));


    nextProcess();
  };

  const gotoLogin = () => {
    setAuthLogin(true)
  };

  const clearErr = () => {
    setFormErr('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="formInput">
        <input onFocus={clearErr} placeholder="Full Name" required className="inputBox" />
      </div>
      <div className="formInput">
        <input onFocus={clearErr} placeholder="Matric No. / Reg No." required className="inputBox" />
      </div>
      <div className="formInput">
        <input onFocus={clearErr}
          placeholder="School email / Personal email"
          required
          className="inputBox"
        />
      </div>
      <div className="formInput">
        <input placeholder="Programme" required className="inputBox" onFocus={clearErr} />
      </div>
      <div className="formInput">
        <input placeholder="Level: 100, 200, 300, 400, 500" required className="inputBox" onFocus={clearErr} />
      </div>
      {formErr && (
        <p className="selectFile">{formErr}</p>
      )}
      <div className="formBtns">
        <div className="authBtn alternate" onClick={gotoLogin}>
          Log In
        </div>
        <button className="authBtn" type="submit">
          Continue
        </button>
      </div>
    </form>
  );
};









export const StepTwo = ({ nextProcess, prevProcess, setUploadImage }: any) => {
  const [file, setFile]: any = useState(null);
  const [noSelected, setNoSelected]: any = useState(false);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleContinue = () => {
    if (!file) {
      setNoSelected(true);
      return;
    }
        
    // update the uploadImage content
    setUploadImage(file);

    nextProcess();
  };

  useEffect(() => {
    if (file) setNoSelected(false);
  }, [file]);

  const goBack = () => {
    prevProcess();
  };

  return (
    <div className="stepTwo">
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
        <p className="tapTxt">Click to upload your picture</p>
      ) : (
        <p className="tapTxt">Selected file: {file?.name}</p>
      )}
      {noSelected && (
        <p className="selectFile">Please upload your picture to continue</p>
      )}
      <div className="formBtns">
        <div className="authBtn alternate" onClick={goBack}>
          Go Back
        </div>
        <div className="authBtn" onClick={handleContinue}>
          Continue
        </div>
      </div>
    </div>
  );
};









export const StepThree = ({ createUser, prevProcess, signUpInfo, setSignUpInfo, isRegistering }: any) => {
  const [toggleShow, settoggleShow] = useState(false);
  const [passErr, setPassErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passRef = useRef(null);
  const confPassRef = useRef(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const password = passRef?.current.value;
    const confirmPassword = confPassRef?.current.value

    const validated = validateStepThree(password, confirmPassword, setPassErr)
    if(!validated) return;

    setIsLoading(true)

    // update the signUp details
    const updatedSignUpInfo = {
      ...signUpInfo,
      password: password,
    };

    setSignUpInfo(updatedSignUpInfo);

    createUser(updatedSignUpInfo);
  };

  useEffect(() => {
    if(!isRegistering) setIsLoading(false);
  }, [isRegistering])
  


  return (
    <form onSubmit={handleSubmit}>
      <div className="formInput thirdFormInput">
        <div
          className="visibilityCont"
          onClick={() => settoggleShow((prev) => !prev)}
        >
          {!toggleShow ? (
            <RemoveRedEyeIcon
              sx={{
                color: "black",
                cursor: "pointer",
                fontSize: "20px",
              }}
            />
          ) : (
            <VisibilityOffIcon
              sx={{
                color: "black",
                cursor: "pointer",
                fontSize: "20px",
              }}
            />
          )}
        </div>
        <input
          placeholder="Password"
          type={toggleShow ? "text" : "password"}
          required
          className="inputBox"
          ref={passRef}
          onFocus={() => setPassErr('')}
        />
      </div>
      <div className="formInput thirdFormInput">
        <input
          placeholder="Confirm Password"
          type={toggleShow ? "text" : "password"}
          required
          className="inputBox"
          ref={confPassRef}
          onFocus={() => setPassErr('')}
        />
      </div>
      {passErr && (
        <p className="selectFile">{passErr}</p>
      )}
      <div className="formBtns">
        <div className="authBtn alternate" onClick={prevProcess}>
          Go Back
        </div>
        <button className="authBtn" type="submit">
        { isLoading ? <><CircularProgress size="13px" className="circularProgress" /></> : <p>Submit</p>}
        </button>
      </div>
    </form>
  );
};
