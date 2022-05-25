import Home from './Home.js'
import Appareils from './Appareils';
import DetailIssue from './DetailIssue';

// CSS
import '../assets/css/App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Connexion from './Connexion.js';
import DetailDevice from './DetailDevice.js';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/co" element={<Connexion />}></Route>
          <Route path="/Appareils" element={<Appareils />} />
          <Route path="/DetailIssue/:id" element={<DetailIssue />} />
          <Route path="/DetailDevice/:id" element={<DetailDevice />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
