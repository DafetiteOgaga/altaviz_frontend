// import logo from './logo.svg';
// import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import './components/fonts.css';
// import Testfetchapi from './components/Testfetchapi';
import SideBar from './components/SideBar/SideBar';
import Header from './components/header/Header';
import AppRoutes from './components/Routes/Routes';
import Footer from './components/footer/Footer';
import Announcements from './components/announcement/Announcements';
// import Home from './components/home/Home';

function App() {
  return (
    <div className="app-container">
      <div style={{paddingBottom: '1em'}}>
        {/* <Router> */}
          <Header />
          {/* <div className="content-wrapper"> */}
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
          {/* </div> */}
        {/* </Router> */}
      </div>
      <Footer />
    </div>



    // <div className="app-container">
    //   <div style={{paddingBottom: '1em'}}>
    //     <Router>
    //       <Header />
    //       {/* <div className="content-wrapper"> */}
    //         <div className='body-minus-header'>
    //           <div className="sub-root">
    //             <SideBar className="sidebar" />
    //             <main>
    //               <AppRoutes/>
    //             </main>
    //           </div>
    //         </div>
    //       {/* </div> */}
    //     </Router>
    //   </div>
    //   <Footer />
    // </div>





    
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
		// 		<p>
		// 			<a
		// 				className="App-link"					
    //       	href="https://github.com/DafetiteOgaga/custom_commands"					
    //       	target="_blank"
		// 				rel="noopener noreferrer"
		// 			>
    //       	Install more custom commands
		// 			</a>
		// 		</p>
    //   </header>
    // </div>
  );
}

export default App;
