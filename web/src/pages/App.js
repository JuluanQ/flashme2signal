import Home from './Home.js'
import Appareils from './Appareils';
import DetailIssue from './DetailIssue';

// CSS
import '../assets/css/App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Connexion from './Connexion.js';
import DetailDevice from './DetailDevice.js';
import {UserContext} from "../context/UserContext";
import {useMemo, useState} from "react";

const App = () => {
  const [ user, setUser ] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App">
      <BrowserRouter>
          <UserContext.Provider value={value}>
          {
            user ? (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/co" element={<Connexion />} />
                  <Route path="/Appareils" element={<Appareils />} />
                  <Route path="/DetailIssue/:id" element={<DetailIssue />} />
                  <Route path="/DetailDevice/:id" element={<DetailDevice />} />
                </Routes>
            ) : (
                <Routes>
                  <Route path="*" element={<Connexion />} />
                </Routes>
            )
          }
          </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
