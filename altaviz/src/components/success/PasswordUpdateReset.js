import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeInSuccess = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const slideInSucces = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  padding: 1rem 8rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeInSuccess} 1.7s ease-in-out;
`
const Head1 = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  animation: ${slideInSucces} 0.5s ease-out;
  `
const PasswordUpdateReset = () => {
  // const { authData } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation();
  const { type, text, url } = location.state||{};
  useEffect(()=>{
    const delay = setTimeout(() => {
      if (url) navigate(url)
      // else navigate(`/${authData.role}`||'/')
    }, 3000);
    return () => clearTimeout(delay);
  }, [url])
  console.log({location})
  return (
    <>
      {/* <styles>{globalStyles}</styles> */}
      <div style={styles.body}>
        <Container>
          <Head1 style={{color: (type==='error')?'red':'rgba(0, 0, 0, 0.575)',}}>{(type==='error')?'Oopsy':'Success'}!</Head1>
          <h2 style={styles.head1}>{text}</h2>
        </Container>
      </div>
    </>
  );
};
export default PasswordUpdateReset;

const styles = {
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '8rem',
  },
  head1: {
    textAlign: 'center',
    marginBottom: '20px',
    animation: 'slideInSucces 0.5s ease-out',
  }
}
