import Home from './Home.js'
import Appareils from './Appareils';
import Detail from './DetailIssue';

// CSS
import '../assets/css/App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Connexion from './Connexion.js';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/co" element={<Connexion />}></Route>
          <Route path="/Appareils" element={<Appareils />} />
          <Route path="/Detail/:id/:device" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
