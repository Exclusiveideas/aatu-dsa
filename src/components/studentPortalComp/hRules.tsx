import React from 'react'
import './sPortal.css';
import HostelCard from './hostelCard';

const HRulesComp = () => {

  const downloadUrl = '';
  const fileName = 'Hostel Rules and Regulations'

  return (
    <div className='cardWrapper'>
      <div className="card_InfoWrapper">
        <HostelCard cardTitle={'Download The Hostel Rules'} cardText={"Click the button to download the university hostel rules and regulations."} downloadUrl={downloadUrl} fileName={fileName} />
      </div>
    </div>
  )
}

export default HRulesComp