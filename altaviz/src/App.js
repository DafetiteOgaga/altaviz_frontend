// import logo from './logo.svg';
import { useContext, useEffect, useState, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
import './App.css';
import './components/fonts.css';
// import Testfetchapi from './components/Testfetchapi';
import SideBar from './components/SideBar/sidebarCompoent/SideBar';
import Header from './components/header/Header';
import AppRoutes from './components/Routes/Routes';
import Footer from './components/footer/Footer';
import Announcements from './components/announcement/Announcements';
// import useSSENotification from './components/context/SSEContext/SSENotification';
// import Home from './components/home/Home';
import usePullNotification from './components/paginationComp/usePullNotification';
import usePullCompleteList from './components/paginationComp/usePullCompleteList';
import { AuthContext } from './components/context/checkAuth/AuthContext';
import { useWebSocketNotificationContext } from './components/context/RealTimeNotificationContext/useWebSocketNotificationContext';
import { useLocation } from 'react-router-dom';
// import Custodian from './components/SideBar/custodian/Custodian';

function App() {
  // let notificationResponse = useRef(null)
  const dept = useLocation().pathname.split('/')[1]
  const { authData } = useContext(AuthContext)
  const [forceUpdates, setForceUpdates] = useState(false)
  const { notifications } = useWebSocketNotificationContext()
  // if (notifications)
  // if (notifications==='fault created'&&authData) {isProcessed.current = true}
  console.log(
    '\nnotifications:', notifications,
    '\nauthData.role:', authData?.role,
  )
  if (notifications==='fault created'
    && authData
    // && dept!=='success'
    // && dept
    // && isProcessed.current
    // && (localStorage.getItem('allUnresolvedKey')||localStorage.getItem('allPendingRequests'))
  ) {
    console.log(
      '\n555555555555555555555555555555555555555555555555555555',
      '\n555555555555555555555555555555555555555555555555555555',
      '\n555555555555555555555555555555555555555555555555555555',
      '\n555555555555555555555555555555555555555555555555555555',
      '\n555555555555555555555555555555555555555555555555555555',
    )
    localStorage.setItem(dept, notifications)
    // isProcessed.current = true
  }
  console.log(
    '\n2222222222222222222222222222222222222222222222222222222',
    '\n2222222222222222222222222222222222222222222222222222222',
    '\n2222222222222222222222222222222222222222222222222222222',
    '\n2222222222222222222222222222222222222222222222222222222',
    '\n2222222222222222222222222222222222222222222222222222222',
  )
  console.log('\nnotifications (apps.js):', notifications)
  // setConsumedData(false)
  let getUpdates;
  if (localStorage.getItem(dept)) {getUpdates = localStorage.getItem(dept)}
  else {getUpdates = null}
  console.log(
    '\ngetUpdates:', getUpdates,
    '\ndept:', dept,
    '\nauthData.role:', authData?.role,
    '\nlocalStorage.getItem(dept):', localStorage.getItem(dept),
    // '\nisProcessed.current:', isProcessed,
  )
  useEffect(() => {
    if (getUpdates) {
      setTimeout(() => {
        setForceUpdates(true)
        // isProcessed.current = false
      }, 1500);
    }
  }, [getUpdates])
  // usePullNotification(
  //   'engineer-pending-faults', (authData?authData.id:null),
  //   'faultsKey', forceUpdates, (authData?authData.role:null)
  // )
  usePullCompleteList(
    (authData?.role==='engineer'?'engineer-unresolved-faults':null), (authData?authData.id:null),
    'allUnresolvedKey', forceUpdates, (authData?authData.role:null)
  )
  console.log('2222222222222222222')
  if (forceUpdates&&!getUpdates) {setForceUpdates(false)}
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
