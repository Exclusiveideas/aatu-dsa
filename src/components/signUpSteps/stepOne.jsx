import React, { useState } from "react";
import "../../app/portal/auth/auth.css";
import { FormControl } from "@mui/material";
import { validateStepOne } from "@/utils/authFunctions";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FACULTY_LIST, PROGRAMMES_LIST } from "@/utils/constant";





const StepOne = ({ nextProcess, setAuthLogin, setSignUpInfo }) => {
    const [formErr, setFormErr] = useState("");
    const [faculty, setFaculty] = React.useState('');
    const [programme, setProgramme] = React.useState('');
  
  
    const handleFacultyChange = (event) => {
      setFaculty(event.target.value);
    };
  
    const handleProgrameChange = (event) => {
      setProgramme(event.target.value);
    };
  
  
    const handleSubmit = (e) => {
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
      setSignUpInfo((prevInfo) => ({
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
              sx={{backgroundColor: '#fff'}}
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
              sx={{backgroundColor: '#fff'}}
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
  

export default StepOne