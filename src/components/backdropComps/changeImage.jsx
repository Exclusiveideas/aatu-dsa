'use client'


import { updateStdPassport } from "@/api";
import useAuthStore from "@/store/authStore";
import usePortalStore from "@/store/portalStore";
import { uploadPic } from "@/utils/authFunctions";
import { useEffect, useState } from "react";
import "../../app/portal/student/student.css";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";







const ChangeImageComp = ({ openSnackBar }) => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
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
        openSnackBar('Please upload your picture', 'error')
        return;
      }
  
      setIsUploading(true);
  
      // update the uploadImage content
      uploadPic(file, fileUploadSuccess, uploadFailFunction, setIsUploading);
    };

    const uploadFailFunction = (failMssg) => {
      openSnackBar(failMssg, 'error')
    }
  
    const fileUploadSuccess = async (downloadUrl) => {
      const updateRes = await updateStdPassport({
        matric: studentInfo?.matric,
        downloadUrl,
      });
  
      setIsUploading(false);
      if (updateRes?.status != 200) {
        openSnackBar(updateRes?.error, 'error')
        return;
      }
  
      openSnackBar('Passport Upload successful', 'success')
  
      setTimeout(() => {
        toggleChangePicModal(false);
        window?.location.reload();
      }, 1000);
    };
  
    useEffect(() => {      
      if (!file) return;

      const imageUrl = URL.createObjectURL(file);
      setFileUrl(imageUrl);
    }, [file]);
  
    useEffect(() => {
      setIsUploading(false);
      setFile(null);
      setFileUrl('');
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
            {!fileUrl ? (
              <PersonAddAlt1Icon
                sx={{
                  color: "white",
                  cursor: "pointer",
                  fontSize: "250%",
                }}
              />
            ) : (
              <img
                src={fileUrl}
                alt="Selected image"
                className="imagePreview"
              />
            )}
          </label>
          {!file ? (
            <p className="tapTxt">Click to upload your passport</p>
          ) : (
            <p className="tapTxt">Selected file: {file?.name}</p>
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