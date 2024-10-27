import { useEffect, useState } from "react";
import "../../app/portal/auth/auth.css";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";






const StepTwo = ({ nextProcess, prevProcess, setUploadImage }) => {
    const [file, setFile] = useState(null);
    const [noSelected, setNoSelected] = useState(false);
  
    const handleFileChange = (event) => {
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
          <p className="tapTxt">Click to upload your passport</p>
        ) : (
          <p className="tapTxt">Selected file: {file?.name}</p>
        )}
        {noSelected && (
          <p className="selectFile">Please upload your correct passport to continue</p>
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
  
  
  export default StepTwo