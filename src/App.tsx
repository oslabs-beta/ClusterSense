// import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import MainPage from "./containers/MainPage"
import NotFound from "./components/NotFound"
import './stylesheets/index.css'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="*" element= {<NotFound />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
