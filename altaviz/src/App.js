// import logo from './logo.svg';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
// import Testfetchapi from './components/Testfetchapi';
import SideBar from './components/SideBar/SideBar';
import Header from './components/header/Header';
import AppRoutes from './components/Routes/Routes';
// import Home from './components/home/Home';

function App() {
  return (
    <>
      <div>
        <Router>
          <Header />
            <div className="sub-root">
              <SideBar />
              <main>
                <AppRoutes/>
              </main>
            </div>
        </Router>
      </div>
      <footer>footer</footer>
    </>





    
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
