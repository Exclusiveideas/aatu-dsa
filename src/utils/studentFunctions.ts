import axios from "axios";
import download from "downloadjs";

export const handleDownloadFile = async (
  downloadUrl: string,
  fileName: string
) => {
  if (!downloadUrl) {
    console.log("no file to download");
    return;
  }

  const filename = fileName;
  const res = await axios.get(downloadUrl, {
    responseType: "blob",
  });
  const data = res.data as Blob;
  download(data, filename);
};





export const validateOyshiaForm = (form: any, setFormErr: any) => {
  const {
    surname,
    othername,
    dob,
    maritalStatus,
    phoneNumber,
    IDMeans,
    IDNumber,
    stateOfOrigin,
    nextOfKinName,
    nextOfKinNumber,
    nextOfKinAddress,
  } = form;

  // Full Name validation
  if (surname.length < 3 || othername.length < 3) {
    setFormErr("Please enter your surname and othernames.");
    return false;
  }

  // Date of Birth validation
  if (!dob) {
    setFormErr("Date of Birth is required");
    return false;
  }

  // marital status validation
  if (!maritalStatus) {
    setFormErr("Your marital status is required");
    return false;
  }

  // phone number validation
  if (phoneNumber.length < 10) {
    setFormErr("Please enter your correct phone number.");
    return false;
  }

  // ID type validation
  if (!IDMeans) {
    setFormErr("Select a means of Identification");
    return false;
  }

  // ID number validation
  if (IDNumber.length < 5) {
    setFormErr(
      "Please enter the correct ID number for your selected means of Identification."
    );
    return false;
  }

  // state of origin validation
  if (stateOfOrigin.length < 3) {
    setFormErr("Please enter your correct state of origin.");
    return false;
  }

  // next of kin name validation
  if (nextOfKinName.length < 5) {
    setFormErr("Please enter the full name of your next of kin.");
    return false;
  }

  // next of kin number validation
  if (nextOfKinNumber.length < 10) {
    setFormErr("Please enter the correct phone number of your next of kin.");
    return false;
  }

  // next of kin address validation
  if (nextOfKinAddress.length < 5) {
    setFormErr("Please enter the full address of your next of kin.");
    return false;
  }

  
  // If all checks pass
  return true
};
