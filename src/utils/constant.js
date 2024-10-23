import BedIcon from "@mui/icons-material/Bed";
import GiteIcon from "@mui/icons-material/Gite";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";


export const registerStepDesc = [
  "Personal information",
  "Upload your passport",
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


export const PROGRAMMES_LIST = [
  "Agricultural Engineering", 
  "Biomedical Engineering", 
  "Civil Engineering", 
  "Computer Engineering", 
  "Electrical Engineering", 
  "Food Science and Technology", 
  "Industrial and Production Engineering", 
  "Mechanical Engineering", 
  "Mechatronics Engineering",
  "Petroleum Engineering", 
  "Chemical Engineering",
  "Architecture",
  "Estate Management", 
  "Urban and Regional planning",
  "Quantity Survey",
  "Survey and Geoinfomatics",
  "Building Technology", 
  "Biochemistry", 
  "Forensic Science", 
  "Industrial Chemistry",
  "Biotechnology", 
  "Microbiology", 
  "Mathematics", 
  "Statistics",
  "Computer Science", 
  "Cybersecurity",
  "Software Engineering",
  "Physics with Electronics", 
  "Science Laboratory Technology",
]

export const FACULTY_LIST = [
  "Engineering and Technology",
  "Natural and Applied Science",
  "Environmental Science",
]


export const MARITALSTATUS_LIST = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
]

export const IDMEANS_LIST = [
  "NIN",
  "VOTERS CARD",
  "DRIVERS LICENSE",
]