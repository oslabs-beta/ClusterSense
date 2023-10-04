import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from "./containers/MainPage"
import './stylesheets/index.css'
import WelcomePage from './containers/WelcomePage';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<WelcomePage />}/>
          <Route path="/home" element={<MainPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
