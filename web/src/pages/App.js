import Home from './Home.js'
import Appareils from './Appareils';
import DetailIssue from './DetailIssue';

// CSS
import '../assets/css/App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Connexion from './Connexion.js';
import DetailDevice from './DetailDevice.js';
import {UserProvider} from "../context/UserContext";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/co" element={<Connexion />} />
            <Route path="/Appareils" element={<Appareils />} />
            <Route path="/DetailIssue/:id" element={<DetailIssue />} />
            <Route path="/DetailDevice/:id" element={<DetailDevice />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
