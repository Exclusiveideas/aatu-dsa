import './sPortal.css';
import HostelCard from './hostelCard';

const SRulesComp = () => {

  const downloadUrl = process.env.NEXT_PUBLIC_SCHOOL_RULES_URL;
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