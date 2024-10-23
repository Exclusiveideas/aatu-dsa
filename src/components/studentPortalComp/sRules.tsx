import React from 'react'
import './sPortal.css';
import HostelCard from './hostelCard';

const SRulesComp = () => {

  const downloadUrl = "https://firebasestorage.googleapis.com/v0/b/techu-dsa.appspot.com/o/files%2FsRules.pdf?alt=media";
  const fileName = 'University Rules and Regulations'

  return (
    <div className='cardWrapper'>
      <div className="card_InfoWrapper">
        <HostelCard cardTitle={'Download The School Rules'} cardText={"Click the button to download the university's rules and regulations."} downloadUrl={downloadUrl} fileName={fileName} />
      </div>
    </div>
  )
}

export default SRulesComp