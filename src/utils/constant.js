import BedIcon from "@mui/icons-material/Bed";
import GiteIcon from "@mui/icons-material/Gite";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";


export const registerStepDesc = [
  "Personal information",
  "Upload your picture",
  "Secure your account",
];


export const navOpts = [
  {
    name: "Home",
    Icon: (
      <HomeOutlinedIcon
        sx={{
          color: "black",
          cursor: "pointer",
          fontSize: "25px",
        }}
      />
    ),
  },
  {
    name: "My Room",
    Icon: (
      <BedIcon
        sx={{
          color: "black",
          cursor: "pointer",
          fontSize: "25px",
        }}
      />
    ),
  },
  {
    name: "Hostel Rules & Reg",
    Icon: (
      <GiteIcon
        sx={{
          color: "black",
          cursor: "pointer",
          fontSize: "25px",
        }}
      />
    ),
  },
  {
    name: "School Rules & Reg",
    Icon: (
      <SchoolOutlinedIcon
        sx={{
          color: "black",
          cursor: "pointer",
          fontSize: "25px",
        }}
      />
    ),
  },
  {
    name: "OYSHIA",
    Icon: (
      <HealthAndSafetyIcon
        sx={{
          color: "black",
          cursor: "pointer",
          fontSize: "25px",
        }}
      />
    ),
  },
];