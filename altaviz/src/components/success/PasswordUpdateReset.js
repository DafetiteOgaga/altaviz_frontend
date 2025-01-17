import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
      <styles>{globalStyles}</styles>
      <div style={styles.body}>
        <div style={styles.container}>
          <h1 style={styles.head1}>Success!</h1>
          <h2 style={styles.head1}>{text}</h2>
        </div>
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    padding: '1rem 8rem',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    animation: 'fadeInSuccess 1.7s ease-in-out',
  },
  head1: {
    // fontSize: '2.5rem',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.575)',
    marginBottom: '20px',
    animation: 'slideInSucces 0.5s ease-out',
  }
}

const globalStyles = () =>`
  @keyframes fadeInSuccess {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInSucces {
    from {
      transform: translateY(-50px);
    }
    to {
      transform: translateY(0);
    }
  }
`;
