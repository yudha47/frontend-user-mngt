import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MasterUser from './pages/MasterUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login/>}></Route>
        <Route path="/dashboard" exact element={<Dashboard/>}></Route>
        <Route path="/master-pengguna" exact element={<MasterUser/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
