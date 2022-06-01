import Home from './Home.js'
import Appareils from './Appareils';
import DetailIssue from './DetailIssue';
import FormDemande from './FormDemande';

// CSS
import '../assets/css/App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Connexion from './Connexion.js';
import DetailDevice from './DetailDevice.js';
import { withCookies, useCookies, CookiesProvider } from "react-cookie";

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

  return (
    <div className="App">
        <CookiesProvider>
            <BrowserRouter>
          {
              cookies.user ? (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/co" element={<Connexion />} />
                  <Route path="/Appareils" element={<Appareils />} />
                  <Route path="/DetailIssue/:id" element={<DetailIssue />} />
                  <Route path="/DetailDevice/:id" element={<DetailDevice />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/form/" element={<FormDemande />} />
                    <Route path="*" element={<Connexion />} />
                </Routes>
            )
          }
          </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default withCookies(App);
