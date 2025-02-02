import { IDMEANS_LIST, MARITALSTATUS_LIST } from "@/utils/constant";
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { useRef, useState } from "react";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { validateOyshiaForm } from "@/utils/studentFunctions";
import { submitOyshiaForm } from "@/api";
import useAuthStore from "@/store/authStore";
import HostelCard from "./hostelCard";
import "./sPortal.css";
import useSnackbarStore from "@/store/snackbarStore";

const OyshiaComp = () => {
  const studentInfo = useAuthStore((state) => state.student);

  const downloadUrl = process.env.NEXT_PUBLIC_OYSHIA_FORM;
  const fileName = "OYO STATE HEALTH INSURANCE AGENCY - Tech U";

  return (
    <>
      <div className="oyshiaComp">
        {studentInfo?.OyshiaSubmitted && (
          <div className="oyshiaCounterWrapper">
            <h4>
              Your OYSHIA Number:{" "}
              <span
                className={`${
                  !studentInfo?.OyshiaDetails?.oyshiaNumber && "notAssigned"
                }`}
              >
                {studentInfo?.OyshiaDetails?.oyshiaNumber
                  ? `${studentInfo?.OyshiaDetails?.oyshiaNumber}`
                  : "[number is only assigned to 100 level students for now]"}
              </span>
            </h4>
          </div>
        )}
        {!studentInfo?.OyshiaSubmitted ? (
          <div className="formCard">
            <Tooltip title={"Oyo State Health Insurance Agency"}>
              <IconButton>
                <h3 className="oyshiaTitle">
                  Fill Your OYSHIA Application Form
                </h3>
              </IconButton>
            </Tooltip>
            <div className="formsContainer">
              <div className="formOne">
                <FormOne studentInfo={studentInfo} />
              </div>
            </div>
          </div>
        ) : (
          <div className="oyshiaCopy_cardWrapper">
            <HostelCard
              cardTitle={"Download The Physical Copy"}
              cardText={
                "Click the button to download the physical copy of your OYSHIA form."
              }
              downloadUrl={downloadUrl}
              fileName={fileName}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default OyshiaComp;

const FormOne = ({ studentInfo }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErr, setFormErr] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [IDMeans, setIDMeans] = useState("");
  const selectOneRef = useRef(null);
  const selectTwoRef = useRef(null);

  const updateSnackbarMessage = useSnackbarStore(
    (state) => state.updateSnackbarMessage
  );
  const updateSnackbarVariant = useSnackbarStore(
    (state) => state.updateSnackbarVariant
  );
  const updateSnackbarInitiated = useSnackbarStore(
    (state) => state.updateSnackbarInitiated
  );

  const updateStudent = useAuthStore((state) => state.updateStudent);

  const handleIDMeansChange = (event) => {
    setIDMeans(event.target.value);
  };

  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

  const clearErr = () => {
    setFormErr("");
  };

  const openSnackBar = (message, variant) => {
    updateSnackbarMessage(message);
    updateSnackbarVariant(variant);
    updateSnackbarInitiated();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErr("");

    const OyshiaForm = {
      maritalStatus: selectOneRef?.current?.value,
      IDMeans: selectTwoRef?.current?.value,
    };

    for (let i = 0; i < e.target.length; i++) {
      if (i == 3 || i == 5) continue;

      if (e.target[i].name && e.target[i].value) {
        OyshiaForm[e.target[i].name] = e.target[i].value;
      }
    }

    const formValidated = validateOyshiaForm(OyshiaForm, setFormErr);

    if (!formValidated) return;

    setIsSubmitting(true);

    const submissionDetails = {
      studentMatric: studentInfo?.matric,
      sex: studentInfo?.gender,
      matricNo: studentInfo?.matric,
      emailAddress: studentInfo?.email,
      faculty: studentInfo?.faculty,
      department: studentInfo?.programme,
      ...OyshiaForm,
    };

    const submittedResult = await submitOyshiaForm(submissionDetails);

    if (submittedResult.status == 200) {
      openSnackBar("OYSHIA Form submitted successfully", "success");
      updateStudent(submittedResult?.data.updatedStudent);
    } else {
      openSnackBar(submittedResult?.error, "error");
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formInput">
        <input
          onFocus={clearErr}
          placeholder="Surname"
          required
          className="inputBox"
          name="surname"
        />
      </div>
      <div className="formInput">
        <input
          onFocus={clearErr}
          placeholder="Other names"
          required
          className="inputBox"
          name="othername"
        />
      </div>
      <div className="formInput">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Date of Birth"
              sx={{ width: "100%" }}
              name="dob"
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="formInput">
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="maritalStat-select-label">Marital Status</InputLabel>
          <Select
            labelId="maritalStat-select-label"
            id="maritalStat-select"
            value={maritalStatus}
            label="maritalStat"
            onChange={handleMaritalStatusChange}
            onFocus={clearErr}
            inputRef={selectOneRef}
          >
            {MARITALSTATUS_LIST?.map((maritalStat, index) => (
              <MenuItem key={index} value={maritalStat}>
                {maritalStat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="formInput">
        <input
          onFocus={clearErr}
          placeholder="Phone Number"
          required
          className="inputBox"
          type="number"
          name="phoneNumber"
        />
      </div>
      <div className="formInput">
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="IDMeans-select-label">
            NATIONAL MEAN OF IDENTIFICATION
          </InputLabel>
          <Select
            labelId="IDMeans-select-label"
            id="IDMeans-select"
            value={IDMeans}
            label="IDMeans"
            onChange={handleIDMeansChange}
            onFocus={clearErr}
            inputRef={selectTwoRef}
          >
            {IDMEANS_LIST?.map((means, index) => (
              <MenuItem key={index} value={means}>
                {means}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="formInput">
        <input
          onFocus={clearErr}
          placeholder="National Identification number"
          required
          className="inputBox"
          name="IDNumber"
        />
      </div>
      <div className="formInput">
        <input
          onFocus={clearErr}
          placeholder="State of Origin"
          required
          className="inputBox"
          name="stateOfOrigin"
        />
      </div>
      <div className="formInput">
        <input
          onFocus={clearErr}
          placeholder="Local Government Area"
          required
          className="inputBox"
          name="lga"
        />
      </div>
      <div className="formInput">
        <input
          onFocus={clearErr}
          placeholder="Genotype"
          required
          className="inputBox"
          name="genotype"
        />
      </div>
      <div className="formInput">
        <input
          onFocus={clearErr}
          placeholder="Blood Group"
          required
          className="inputBox"
          name="bloodGroup"
        />
      </div>
      <div className="formInput">
        <input
          onFocus={clearErr}
          placeholder="Existing Medical Conditions (if any)"
          required
          className="inputBox"
          name="medicalConditions"
        />
      </div>
      <div className="formInput">
        <input
          onFocus={clearErr}
          placeholder="Name of Next of Kin"
          required
          className="inputBox"
          name="nextOfKinName"
        />
      </div>
      <div className="formInput">
        <input
          onFocus={clearErr}
          placeholder="Phone Number of Next of Kin"
          required
          className="inputBox"
          type="number"
          name="nextOfKinNumber"
        />
      </div>
      <div className="formInput">
        <input
          onFocus={clearErr}
          placeholder="Address of Next of Kin"
          required
          className="inputBox"
          name="nextOfKinAddress"
        />
      </div>
      {formErr && <p className="selectFile">{formErr}</p>}
      <div className="formBtns">
        <button className="authBtn" type="submit">
          {isSubmitting ? (
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
