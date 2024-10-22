import React, { useEffect, useRef, useState } from "react";
import "../../app/portal/auth/auth.css";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress, FormControl } from "@mui/material";
import { validateStepOne, validateStepThree } from "@/utils/authFunctions";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FACULTY_LIST, PROGRAMMES_LIST } from "@/utils/constant";









// Step One component


export const StepOne = ({ nextProcess, setAuthLogin, setSignUpInfo }: any) => {
  const [formErr, setFormErr] = useState("");
  const [faculty, setFaculty] = React.useState('');
  const [programme, setProgramme] = React.useState('');


  const handleFacultyChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFaculty(event.target.value);
  };

  const handleProgrameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setProgramme(event.target.value);
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();

    const updatedInfo = {
      fullName: e?.target[0].value,
      matric: e?.target[1].value,
      email: e?.target[2].value,
      faculty: faculty,
      programme: programme,
    };

    const validated = validateStepOne(updatedInfo, setFormErr);
    if (!validated) return;

    // update the signUp details
    setSignUpInfo((prevInfo: any) => ({
      ...prevInfo,
      ...updatedInfo,
    }));

    nextProcess();
  };

  const gotoLogin = () => {
    setAuthLogin(true);
  };

  const clearErr = () => {
    setFormErr("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formInput">
        <input
          onFocus={clearErr}
          placeholder="Full Name"
          required
          className="inputBox"
        />
      </div>
      <div className="formInput">
        <input
          onFocus={clearErr}
          placeholder="Matric No. / Reg No."
          required
          className="inputBox"
        />
      </div>
      <div className="formInput">
        <input
          onFocus={clearErr}
          placeholder="School email / Personal email"
          required
          className="inputBox"
        />
      </div>
      <div className="formInput">
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="faculty-select-label">Faculty</InputLabel>
          <Select
            labelId="faculty-select-label"
            id="faculty-select"
            value={faculty}
            label="faculty"
            onChange={handleFacultyChange}
            onFocus={clearErr}
          >
            {FACULTY_LIST?.map((faculty, index) => (
              <MenuItem key={index} value={faculty}>{faculty}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="formInput">
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="programme-select-label">Programme</InputLabel>
          <Select
            labelId="programme-select-label"
            id="programme-select"
            value={programme}
            label="programme"
            onChange={handleProgrameChange}
            onFocus={clearErr}
          >
            {PROGRAMMES_LIST?.map((programme, index) => (
              <MenuItem key={index} value={programme}>{programme}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {formErr && <p className="selectFile">{formErr}</p>}
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







// Step Two component



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






// Step three component



export const StepThree = ({
  createUser,
  prevProcess,
  signUpInfo,
  setSignUpInfo,
  isRegistering,
}: any) => {
  const [toggleShow, settoggleShow] = useState(false);
  const [passErr, setPassErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [level, setLevel] = React.useState('');
  const [gender, setGender] = React.useState("");

  const passRef = useRef(null);
  const confPassRef = useRef(null);

  const handleLevelChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLevel(event.target.value);
  };

  const handleGenderChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setGender(event.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const password = passRef?.current.value;
    const confirmPassword = confPassRef?.current.value;

    if (password !== confirmPassword) {
      setPassErr('Passwords do not match');
      return
    }

    const validated = validateStepThree(
      level,
      gender,
      password,
      setPassErr
    );
    if (!validated) return;

    setIsLoading(true);

    // update the signUp details
    const updatedSignUpInfo = {
      ...signUpInfo,
      level: level,
      gender: gender,
      password: password,
    };

    setSignUpInfo(updatedSignUpInfo);

    createUser(updatedSignUpInfo);
  };

  useEffect(() => {
    if (!isRegistering) setIsLoading(false);
  }, [isRegistering]);

  return (
    <form onSubmit={handleSubmit} className="stepThree">
      <div className="formInput">
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="level-select-label">Level</InputLabel>
          <Select
            labelId="level-select-label"
            id="level-select"
            value={level}
            label="Level"
            onChange={handleLevelChange}
            onFocus={() => setPassErr("")}
          >
            <MenuItem value={'100'}>100</MenuItem>
            <MenuItem value={'200'}>200</MenuItem>
            <MenuItem value={'300'}>300</MenuItem>
            <MenuItem value={'400'}>400</MenuItem>
            <MenuItem value={'500'}>500</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="formInput">
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="gender-select-label">Gender</InputLabel>
          <Select
            labelId="gender-select-label"
            id="gender-select"
            value={gender}
            label="Gender"
            onChange={handleGenderChange}
            onFocus={() => setPassErr("")}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </Select>
        </FormControl>
      </div>
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
          onFocus={() => setPassErr("")}
        />
      </div>
      <div className="formInput thirdFormInput">
        <input
          placeholder="Confirm Password"
          type={toggleShow ? "text" : "password"}
          required
          className="inputBox"
          ref={confPassRef}
          onFocus={() => setPassErr("")}
        />
      </div>
      {passErr && <p className="selectFile">{passErr}</p>}
      <div className="formBtns">
        <div className="authBtn alternate" onClick={prevProcess}>
          Go Back
        </div>
        <button className="authBtn" type="submit">
          {isLoading ? (
            <>
              <CircularProgress size="13px" className="circularProgress" />
            </>
          ) : (
            <p>Submit</p>
          )}
        </button>
      </div>
    </form>
  );
};
