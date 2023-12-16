import React from 'react';
import './Test.css';
import RectangleRed from '../../assets/RectangleRed.svg';
import RectangleBlue from '../../assets/RectangleBlue.svg';
import RectangleLightBlue from '../../assets/RectangleLightBlue.svg';
import { Link } from 'react-router-dom';

const Test = (props) => {
  
  return (
    <tr className='test'>
      <td className='testImg'>
        {props.img}
        {props.test.siteId === 1 ? <img src={RectangleRed} alt="RectangleRed"/>
        : props.test.siteId === 2 ? <img src={RectangleLightBlue} alt="RectangleLightBlue" />
        : <img src={RectangleBlue} alt="RectangleBlue" />}
      </td>
      <td className='testBodyName'>{props.test.name}</td>
      <td className='testBodyType'>{props.test.type}</td>
      <td 
        className={props.test.status === 'Online' ? 'testBodyStatus greenStatus'
        : props.test.status === 'Draft' ? 'testBodyStatus grayStatus'
        : props.test.status === 'Paused' ? 'testBodyStatus orangeStatus'
        : 'testBodyStatus redStatus'
        }
      >
        {props.test.status}
      </td>
      <td className='testBodySite'> {props.getSiteUrl(props.test.siteId)}</td>
      <td className='testActions'>
        {props.test.status !== "Draft" ?
          <Link 
            to={`/results/${props.test.id}`} 
            state={{ 
              test: props.test,
              site: props.getSiteUrl(props.test.siteId)
            }}
            style={{textDecoration:"none"}}
          >
            <button className='testButtonGreen'>Results</button>
          </Link>
          : 
          <Link
            to={`/finalize/${props.test.id}`}
            state={{
              test: props.test,
              site: props.getSiteUrl(props.test.siteId)
            }}
            style={{textDecoration:"none"}}
          >
            <button className='testButtonGray'>Finalize</button>
          </Link>
        }
      </td>
    </tr>
  )
}

export default Test;