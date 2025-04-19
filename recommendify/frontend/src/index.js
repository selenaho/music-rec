import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Features from './pages/Features';
import AboutUs from './pages/AboutUs';
import App from './pages/App';
import Data from './pages/Data';
import Similar from './pages/Similar';
import 'bootstrap/dist/css/bootstrap.css';
import Recommend from './pages/Recommend';

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/features" element={<Features />}/>
        <Route path="/about-us" element={<AboutUs />}/>
        <Route path="/spotify-data" element={<Data />}/>
        <Route path='/similar-artists' element={<Similar />}/>
        <Route path='/recommendations' element={<Recommend />}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
