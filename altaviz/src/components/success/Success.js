// import { useLocation} from 'react';
import { useEffect } from 'react';
import './success.css';
import { useNavigate, useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { currentPage, time } = location.state||{};
  useEffect(()=>{
    const delay = setTimeout(() => {
      if (currentPage) navigate(currentPage)
    }, time||1000);
    return () => clearTimeout(delay);
  }, [currentPage])
  console.log({location})
  return (
    <div className='success-body'>
      <div className="success-container">
        <h1>Success!</h1>
      </div>
    </div>
  );
};

export default Success;
