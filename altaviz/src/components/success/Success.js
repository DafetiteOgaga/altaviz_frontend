// import { useLocation} from 'react';
import { useEffect, useContext } from 'react';
import './success.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/checkAuth/AuthContext';
// import { useNavigate } from 'react-router-dom';

const Success = () => {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation();
  const { currentPage, time } = location.state||{};
  useEffect(()=>{
    const delay = setTimeout(() => {
      if (currentPage) navigate(currentPage)
      else navigate(`/${authData.role}`||'/')
    }, currentPage?(time||1000):0);
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
