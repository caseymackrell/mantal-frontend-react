import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import LoginPageConfirm from './components/pages/LoginPageConfirm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element = {<LoginPage />}/>
        <Route path='/login/confirm' element = {<LoginPageConfirm />}/>
        <Route path='/' element = {<HomePage />}/>
      </Routes>
    </Router>
    
  );
}

export default App;
