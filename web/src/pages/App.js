import '../assets/css/App.css';

import Home from './Home.js'
import Appareil from './Appareil';
import LeftMenu from "../components/LeftMenu";

import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Appareil" element={<Appareil />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
