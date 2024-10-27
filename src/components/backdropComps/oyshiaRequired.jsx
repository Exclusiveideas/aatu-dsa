import usePortalStore from "@/store/portalStore";
import { useEffect, useState } from "react";
import "../../app/portal/student/student.css";



const OyshiaRequired = ({ setActiveOpt }) => {
    const [redirecting, setRedirecting] = useState(false);
  
    const changePicModalOpen = usePortalStore(
      (state) => state.changePicModalOpen
    );
    const toggleChangePicModal = usePortalStore(
      (state) => state.toggleChangePicModal
    );
  
    useEffect(() => {
      const timeoutIds = [];
  
      if (changePicModalOpen) {
        timeoutIds.push(
          setTimeout(() => {
            setRedirecting(true);
          }, 1500)
        );
  
        timeoutIds.push(
          setTimeout(() => {
            setActiveOpt(4);
            toggleChangePicModal(false);
            setRedirecting(false);
          }, 3000)
        );
      }
  
      // Cleanup function to clear all timeouts when the component unmounts or changePicModalOpen changes
      return () => {
        timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
      };
    }, [changePicModalOpen]);
  
    return (
      <div className="oyshia_cardWrapper">
        <div className="oyshia_InfoWrapper">
          <p>
            {redirecting
              ? "Redirecting you now..."
              : "You must fill out and submit your OYSHIA form first."}
          </p>
        </div>
      </div>
    );
  };
  

  export default OyshiaRequired