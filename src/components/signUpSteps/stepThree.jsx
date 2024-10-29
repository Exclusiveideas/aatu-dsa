import React, { useEffect, useRef, useState } from "react";
import "../../app/portal/auth/auth.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress, FormControl } from "@mui/material";
import { validateStepThree } from "@/utils/authFunctions";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";



const StepThree = ({
  createUser,
  prevProcess,
  signUpInfo,
  setSignUpInfo,
  isRegistering,
}) => {
  const [toggleShow, settoggleShow] = useState(false);
  const [passErr, setPassErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [level, setLevel] = React.useState('');
  const [gender, setGender] = React.useState("");

  const passRef = useRef(null);
  const confPassRef = useRef(null);

  const handleLevelChange = (event) => { 
    setLevel(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (e) => {
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
            <MenuItem value={'spillover'}>Spillover</MenuItem>
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

export default StepThree