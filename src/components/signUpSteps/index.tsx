import React, { useEffect, useState } from "react";
import "../../app/portal/auth/auth.css";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const StepOne = ({ nextProcess, setAuthLogin }: any) => {

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(e.target[0].value)
    nextProcess();
  };

  const gotoLogin = () => {
    setAuthLogin(true)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formInput">
        <input placeholder="Full Name" required className="inputBox" />
      </div>
      <div className="formInput">
        <input placeholder="Matric No./Reg No." required className="inputBox" />
      </div>
      <div className="formInput">
        <input
          placeholder="School email/Personal email"
          required
          className="inputBox"
        />
      </div>
      <div className="formInput">
        <input placeholder="Programme" required className="inputBox" />
      </div>
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

export const StepTwo = ({ nextProcess, prevProcess }: any) => {
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

    setNoSelected(false);
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

export const StepThree = ({ createUser, prevProcess }: any) => {
  const [toggleShow, settoggleShow] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(e.target[0].value)
    createUser();
  };

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
        />
      </div>
      <div className="formBtns">
        <div className="authBtn alternate" onClick={prevProcess}>
          Go Back
        </div>
        <button className="authBtn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
