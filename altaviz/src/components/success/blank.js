import { useEffect, useContext } from 'react';
import './success.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/checkAuth/AuthContext';

const Blank = () => {
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
    <div style={backgroundStyle}></div>
  );
};
export default Blank;

const backgroundStyle = {
  backgroundColor: '#E5E5E5',
  borderTopLeftRadius: '1rem',
  borderTopRightRadius: '1rem',
  maxHeight: '200vh',
  height: '200vh', // Set height
  width: '100%',   // Set width
};