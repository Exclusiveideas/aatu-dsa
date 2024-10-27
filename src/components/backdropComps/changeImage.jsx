import { updateStdPassport } from "@/api";
import useAuthStore from "@/store/authStore";
import usePortalStore from "@/store/portalStore";
import { uploadPic } from "@/utils/authFunctions";
import { useEffect, useState } from "react";
import "../../app/portal/student/student.css";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";







const ChangeImageComp = () => {
    const [file, setFile] = useState(null);
    const [noSelected, setNoSelected] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isUpdating, setIsUploading] = useState(false);
  
    const changePicModalOpen = usePortalStore(
      (state) => state.changePicModalOpen
    );
  
    const studentInfo = useAuthStore((state) => state.student);
  
    const toggleChangePicModal = usePortalStore(
      (state) => state.toggleChangePicModal
    );
    const toggleImageSelected = usePortalStore(
      (state) => state.toggleImageSelected
    );
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const handleContinue = () => {
      if (!file) {
        setNoSelected(true);
        return;
      }
  
      setIsUploading(true);
  
      // update the uploadImage content
      uploadPic(file, fileUploadSuccess, setErrorMessage, setIsUploading);
    };
  
    const fileUploadSuccess = async (downloadUrl) => {
      const updateRes = await updateStdPassport({
        matric: studentInfo?.matric,
        downloadUrl,
      });
  
      setIsUploading(false);
      if (updateRes?.status != 200) {
        return;
      }
  
      setUploadSuccess(true);
  
      setTimeout(() => {
        toggleChangePicModal(false);
        window?.location.reload();
      }, 1500);
    };
  
    useEffect(() => {
      if (file) setNoSelected(false);
    }, [file]);
  
    useEffect(() => {
      setIsUploading(false);
      setNoSelected(false);
      setFile(null);
      setErrorMessage("");
    }, [changePicModalOpen, uploadSuccess]);
  
    useEffect(() => {
      setUploadSuccess(false);
    }, [changePicModalOpen]);
  
    const closeBackDrop = () => {
      if (isUpdating) return;
  
      toggleChangePicModal(false);
      toggleImageSelected(false);
    };
  
    return (
      <div className="changeImageComp">
        <div className="topSect">
          <h3>Change Your Passport</h3>
        </div>
        <CloseIcon
          sx={{
            color: "black",
            cursor: "pointer",
          }}
          className="modalCloseBtn"
          onClick={closeBackDrop}
        />
        <div className="bottomSect">
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
            <p className="selectFile">Please upload your correct passport</p>
          )}
          {errorMessage && <p className="selectFile">{errorMessage}</p>}
          {uploadSuccess && (
            <p className="selectFile green">Passport Upload successful</p>
          )}
          <div className="formBtns">
            <div className="authBtn" onClick={handleContinue}>
              {isUpdating ? (
                <CircularProgress size="13px" className="circularProgress" />
              ) : (
                <p>Upload</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  

  export default ChangeImageComp