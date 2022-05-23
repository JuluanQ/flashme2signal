import logo from './logo.svg';
import './App.css';

import LeftMenu from "../components/LeftMenu";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <LeftMenu />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Appareil" element={<Appareil/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
