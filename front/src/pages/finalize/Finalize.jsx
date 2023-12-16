import "./Finalize.css";
import Navbar from '../../components/navbar/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import BackIcon from "../../assets/BackIcon.svg";


const Finalize = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {test, site} = location.state;

  return (
    <div className='container'>
    <Navbar title={"Finalize"} style={{paddingBottom:"4px"}}/>
    <div className='resultsRow'>
      <div className='resultsTitle'>NAME</div>
      <div className='resultsInfo'>{test.name}</div>
    </div>
    <div className='resultsRow'>
    <div className='resultsTitle'>TYPE</div>
      <div className='resultsInfo'>{test.type}</div>
    </div>
    <div className='resultsRow'>
    <div className='resultsTitle'>SITE</div>
      <div className='resultsInfo'>{site}</div>
    </div>
    <div className='resultsRow'>
    <div className='resultsTitle'>STATUS</div>
      <div className='resultsInfo'>{test.status}</div>
    </div>
    <div className='bottomRow' onClick={()=>navigate('/')}>
      <img src={BackIcon} alt="BackIcon" />
      <div className='backTitle'>Back</div>
    </div>
  </div>
  )
}

export default Finalize