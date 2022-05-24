import Home from './Home.js'
import Appareil from './Appareil';
import LeftMenu from '../components/LeftMenu';

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
          <Route path="/Appareil" element={<Appareil />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
