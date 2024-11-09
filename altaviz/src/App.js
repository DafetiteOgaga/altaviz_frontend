// import logo from './logo.svg';
// import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import './components/fonts.css';
// import Testfetchapi from './components/Testfetchapi';
import SideBar from './components/SideBar/sidebarCompoent/SideBar';
import Header from './components/header/Header';
import AppRoutes from './components/Routes/Routes';
import Footer from './components/footer/Footer';
import Announcements from './components/announcement/Announcements';
// import Home from './components/home/Home';

function App() {
  return (
    <div className="app-container">
      <div style={{paddingBottom: '1em'}}>
          <Header />
            <div className='body-minus-header'>
              <div className="sub-root">
                <div>
                  <SideBar className="sidebar" />
                  <Announcements />
                </div>
                <main>
                  <div className='main-background'>
                    <AppRoutes/>
                  </div>
                </main>
              </div>
            </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
